#!/usr/bin/env python3
"""
Fetch Google Scholar profile data, then auto-discover arXiv IDs by visiting
each paper's Scholar citation detail page, and finally enrich those papers
with full metadata from the official arXiv Atom API.

No scholarly library — uses requests + beautifulsoup4 + stdlib xml only.

Usage:
  pip install requests beautifulsoup4
  python scripts/fetch_scholar.py

Failure modes:
  - Scholar bot detection → exits with code 1 (GH Action keeps stale cache)
  - Individual citation page failures → skipped silently (no arXiv enrichment)
  - arXiv API failure → preserves existing cached arXiv data
"""

import json
import re
import sys
import time
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Missing dependencies. Run: pip install requests beautifulsoup4", file=sys.stderr)
    sys.exit(1)

SCHOLAR_ID      = "6KamS70AAAAJ"
OUTPUT_PATH     = Path(__file__).parent.parent / "src" / "data" / "scholar-cache.json"
CITATION_DELAY  = 1.5   # seconds between Scholar citation-page requests (be polite)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Referer": "https://www.google.com/",
}

ARXIV_NS = {
    "atom":  "http://www.w3.org/2005/Atom",
    "arxiv": "http://arxiv.org/schemas/atom",
}


# ── Helpers ───────────────────────────────────────────────────────────────────

def parse_int(text: str) -> int:
    try:
        return int(re.sub(r"[^\d]", "", text or ""))
    except (ValueError, TypeError):
        return 0


def get_soup(url: str) -> BeautifulSoup:
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    if "unusual traffic" in r.text.lower() or "captcha" in r.text.lower():
        raise RuntimeError("Google Scholar bot detection triggered — try again later")
    return BeautifulSoup(r.text, "html.parser")


def extract_arxiv_id(text: str) -> str | None:
    """Return a bare arXiv ID (e.g. '2508.09606') found anywhere in text."""
    m = re.search(r"arxiv\.org/(?:abs|pdf)/(\d{4}\.\d{4,5})", text)
    return m.group(1) if m else None


# ── Scholar: profile listing ──────────────────────────────────────────────────

def fetch_profile() -> dict:
    base = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"
    url  = base + "&sortby=pubdate&pagesize=100"

    print(f"Fetching Scholar listing: {url}")
    soup = get_soup(url)

    name_el = soup.select_one("#gsc_prf_in")
    aff_el  = soup.select_one(".gsc_prf_il")

    stats = soup.select(".gsc_rsb_std")
    total_citations = parse_int(stats[0].text) if len(stats) > 0 else 0
    h_index         = parse_int(stats[2].text) if len(stats) > 2 else 0
    i10_index       = parse_int(stats[4].text) if len(stats) > 4 else 0

    print(f"  {name_el.get_text(strip=True) if name_el else '?'} "
          f"| citations={total_citations} h={h_index} i10={i10_index}")

    publications = []
    for row in soup.select(".gsc_a_tr"):
        title_el = row.select_one(".gsc_a_at")
        if not title_el:
            continue

        title = title_el.get_text(strip=True)
        href  = title_el.get("href", "")
        scholar_url = f"https://scholar.google.com{href}" if href else ""
        pub_id = href.split("citation_for_view=")[-1] if "citation_for_view=" in href else ""

        gray = row.select(".gs_gray")
        authors_text = gray[0].get_text(strip=True) if len(gray) > 0 else ""
        venue_text   = gray[1].get_text(strip=True) if len(gray) > 1 else ""

        year_el  = row.select_one(".gsc_a_y span")
        year     = parse_int(year_el.text) if year_el else 0
        cites_el = row.select_one(".gsc_a_c a")
        cites    = parse_int(cites_el.text) if cites_el else 0
        authors  = [a.strip() for a in authors_text.split(",") if a.strip()]

        publications.append({
            "scholar_id":  pub_id,
            "title":       title,
            "authors":     authors,
            "venue":       venue_text,
            "year":        year,
            "citations":   cites,
            "scholar_url": scholar_url,
            "eprint_url":  "",
        })

    publications.sort(key=lambda p: p["year"], reverse=True)
    print(f"  Found {len(publications)} publications")

    return {
        "fetched_at":      datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "scholar_id":      SCHOLAR_ID,
        "profile_url":     base,
        "name":            name_el.get_text(strip=True) if name_el else "Alejandro Carrasco",
        "affiliation":     aff_el.get_text(strip=True)  if aff_el  else "MIT ARC Lab",
        "h_index":         h_index,
        "i10_index":       i10_index,
        "total_citations": total_citations,
        "publications":    publications,
    }


# ── Scholar: per-citation arXiv discovery ────────────────────────────────────

def discover_arxiv_ids(publications: list) -> list[str]:
    """
    Visit each paper's Scholar citation detail page and extract arXiv IDs.
    Returns a deduplicated list of discovered arXiv IDs.
    Uses CITATION_DELAY between requests to avoid triggering rate limits.
    """
    found = []
    seen  = set()

    for pub in publications:
        url = pub.get("scholar_url", "")
        if not url:
            continue

        time.sleep(CITATION_DELAY)
        try:
            soup = get_soup(url)

            # Check every <a href> and the full page text for arxiv.org references
            arxiv_id = None
            for link in soup.find_all("a", href=True):
                arxiv_id = extract_arxiv_id(link["href"])
                if arxiv_id:
                    break
            if not arxiv_id:
                arxiv_id = extract_arxiv_id(soup.get_text())

            if arxiv_id and arxiv_id not in seen:
                seen.add(arxiv_id)
                found.append(arxiv_id)
                pub["eprint_url"] = f"https://arxiv.org/abs/{arxiv_id}"
                print(f"  [{arxiv_id}] {pub['title'][:60]}")
            else:
                print(f"  [no arXiv] {pub['title'][:60]}")

        except Exception as e:
            print(f"  Warning: could not fetch {url}: {e}", file=sys.stderr)

    print(f"  Discovered {len(found)} unique arXiv IDs")
    return found


# ── arXiv API ─────────────────────────────────────────────────────────────────

def fetch_arxiv_metadata(arxiv_ids: list) -> dict:
    """
    Query the official arXiv Atom API for abstract, DOI, and PDF URL.
    Returns a dict keyed by arXiv ID (version-stripped, e.g. '2508.09606').
    Non-fatal — returns {} on any error.
    """
    if not arxiv_ids:
        return {}

    id_list = ",".join(arxiv_ids)
    url = f"https://export.arxiv.org/api/query?id_list={id_list}&max_results={len(arxiv_ids)}"
    print(f"Fetching arXiv metadata for {len(arxiv_ids)} papers...")

    r = requests.get(url, timeout=30)
    r.raise_for_status()

    root   = ET.fromstring(r.text)
    result = {}

    for entry in root.findall("atom:entry", ARXIV_NS):
        id_el = entry.find("atom:id", ARXIV_NS)
        if id_el is None:
            continue
        arxiv_id = re.sub(r"v\d+$", "", id_el.text.split("/abs/")[-1])

        summary_el = entry.find("atom:summary", ARXIV_NS)
        abstract   = re.sub(r"\s+", " ", summary_el.text).strip() if summary_el is not None else ""

        pdf_url = ""
        for link in entry.findall("atom:link", ARXIV_NS):
            if link.get("title") == "pdf":
                pdf_url = link.get("href", "")
                break

        doi_el = entry.find("arxiv:doi", ARXIV_NS)
        doi    = f"https://doi.org/{doi_el.text.strip()}" if doi_el is not None else ""

        result[arxiv_id] = {"abstract": abstract, "pdf_url": pdf_url, "doi": doi}
        print(f"  [{arxiv_id}] doi={doi or 'none'} abstract={len(abstract)} chars")

    print(f"  arXiv: got metadata for {len(result)}/{len(arxiv_ids)} papers")
    return result


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    # Step 1: Scholar profile + publications list (fatal on failure)
    try:
        data = fetch_profile()
    except Exception as e:
        print(f"ERROR (Scholar profile): {e}", file=sys.stderr)
        sys.exit(1)

    # Step 2: Auto-discover arXiv IDs from citation detail pages (non-fatal per paper)
    print(f"\nDiscovering arXiv IDs from {len(data['publications'])} citation pages...")
    try:
        arxiv_ids = discover_arxiv_ids(data["publications"])
    except Exception as e:
        print(f"Warning (arXiv discovery): {e}", file=sys.stderr)
        arxiv_ids = []

    # Step 3: Fetch arXiv metadata (non-fatal — merge with existing cache on failure)
    existing_arxiv = {}
    if OUTPUT_PATH.exists():
        try:
            existing_arxiv = json.loads(OUTPUT_PATH.read_text()).get("arxiv_cache", {})
        except Exception:
            pass

    print()
    try:
        arxiv_data = fetch_arxiv_metadata(arxiv_ids)
        data["arxiv_cache"] = {**existing_arxiv, **arxiv_data}
    except Exception as e:
        print(f"Warning (arXiv API): {e} — keeping existing cache", file=sys.stderr)
        data["arxiv_cache"] = existing_arxiv

    OUTPUT_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"\nWrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
