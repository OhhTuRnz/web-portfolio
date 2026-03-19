#!/usr/bin/env python3
"""
Fetch Google Scholar data via SerpAPI (no bot detection issues).
Enriches papers with arXiv metadata via the official arXiv Atom API.

Requirements:
  pip install requests
  env var: SERPAPI_KEY

Usage:
  SERPAPI_KEY=your_key python scripts/fetch_scholar.py
"""

import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
except ImportError:
    print("Missing dependency. Run: pip install requests", file=sys.stderr)
    sys.exit(1)

SCHOLAR_ID  = "6KamS70AAAAJ"
OUTPUT_PATH = Path(__file__).parent.parent / "src" / "data" / "scholar-cache.json"
ARXIV_NS    = {
    "atom":  "http://www.w3.org/2005/Atom",
    "arxiv": "http://arxiv.org/schemas/atom",
}


# ── SerpAPI ───────────────────────────────────────────────────────────────────

def fetch_profile(api_key: str) -> dict:
    url = "https://serpapi.com/search"
    params = {
        "engine":    "google_scholar_author",
        "author_id": SCHOLAR_ID,
        "api_key":   api_key,
        "num":       100,
        "sort":      "pubdate",
    }

    print(f"Fetching Scholar profile via SerpAPI (id={SCHOLAR_ID})...")
    r = requests.get(url, params=params, timeout=30)
    r.raise_for_status()
    data = r.json()

    if "error" in data:
        raise RuntimeError(f"SerpAPI error: {data['error']}")

    author   = data.get("author", {})
    cited_by = data.get("cited_by", {})
    table    = cited_by.get("table", [])

    def stat(idx):
        try:
            return list(table[idx].values())[0].get("all", 0)
        except (IndexError, AttributeError):
            return 0

    total_citations = stat(0)
    h_index         = stat(1)
    i10_index       = stat(2)

    print(f"  {author.get('name', '?')} | citations={total_citations} h={h_index} i10={i10_index}")

    publications = []
    for article in data.get("articles", []):
        title      = article.get("title", "")
        link       = article.get("link", "")
        pub_id     = article.get("citation_id", "")
        authors_str = article.get("authors", "")
        authors    = [a.strip() for a in authors_str.split(",") if a.strip()]
        venue      = article.get("publication", "")
        year       = int(article.get("year") or 0)
        citations  = article.get("cited_by", {}).get("value", 0) or 0

        publications.append({
            "scholar_id":  pub_id,
            "title":       title,
            "authors":     authors,
            "venue":       venue,
            "year":        year,
            "citations":   citations,
            "scholar_url": link,
            "eprint_url":  "",
        })

    publications.sort(key=lambda p: p["year"], reverse=True)
    print(f"  Found {len(publications)} publications")

    return {
        "fetched_at":      datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "scholar_id":      SCHOLAR_ID,
        "profile_url":     f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en",
        "name":            author.get("name", "Alejandro Carrasco"),
        "affiliation":     author.get("affiliations", "MIT ARC Lab"),
        "h_index":         h_index,
        "i10_index":       i10_index,
        "total_citations": total_citations,
        "publications":    publications,
    }


# ── arXiv enrichment (unchanged, no bot issues) ───────────────────────────────

def extract_arxiv_id(text: str):
    m = re.search(r"arxiv\.org/(?:abs|pdf)/(\d{4}\.\d{4,5})", text or "")
    return m.group(1) if m else None


def search_arxiv_by_title(title: str):
    """Search arXiv by title and return the arXiv ID if found."""
    try:
        query = re.sub(r"[^\w\s]", " ", title).strip()
        url = f"https://export.arxiv.org/api/query?search_query=ti:{requests.utils.quote(query)}&max_results=1"
        r = requests.get(url, timeout=15)
        r.raise_for_status()
        root = ET.fromstring(r.text)
        entry = root.find("atom:entry", ARXIV_NS)
        if entry is None:
            return None
        id_el = entry.find("atom:id", ARXIV_NS)
        if id_el is None:
            return None
        return re.sub(r"v\d+$", "", id_el.text.split("/abs/")[-1])
    except Exception:
        return None


def fetch_arxiv_metadata(arxiv_ids: list) -> dict:
    if not arxiv_ids:
        return {}

    url = f"https://export.arxiv.org/api/query?id_list={','.join(arxiv_ids)}&max_results={len(arxiv_ids)}"
    print(f"Fetching arXiv metadata for {len(arxiv_ids)} papers...")

    r = requests.get(url, timeout=30)
    r.raise_for_status()

    result = {}
    for entry in ET.fromstring(r.text).findall("atom:entry", ARXIV_NS):
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
        print(f"  [{arxiv_id}] {len(abstract)} chars abstract")

    return result


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    api_key = os.environ.get("SERPAPI_KEY", "")
    if not api_key:
        print("ERROR: SERPAPI_KEY env var not set.", file=sys.stderr)
        sys.exit(1)

    try:
        data = fetch_profile(api_key)
    except Exception as e:
        print(f"ERROR (SerpAPI): {e}", file=sys.stderr)
        sys.exit(1)

    # Discover arXiv IDs by searching arXiv by title (free, no rate limiting)
    import time
    arxiv_ids = []
    seen = set()
    for pub in data["publications"]:
        time.sleep(0.5)
        arxiv_id = search_arxiv_by_title(pub["title"])
        if arxiv_id and arxiv_id not in seen:
            seen.add(arxiv_id)
            arxiv_ids.append(arxiv_id)
            pub["eprint_url"] = f"https://arxiv.org/abs/{arxiv_id}"
            print(f"  [{arxiv_id}] {pub['title'][:60]}")
        else:
            print(f"  [no arXiv] {pub['title'][:60]}")

    existing_arxiv = {}
    if OUTPUT_PATH.exists():
        try:
            existing_arxiv = json.loads(OUTPUT_PATH.read_text()).get("arxiv_cache", {})
        except Exception:
            pass

    try:
        arxiv_data = fetch_arxiv_metadata(arxiv_ids)
        data["arxiv_cache"] = {**existing_arxiv, **arxiv_data}
    except Exception as e:
        print(f"Warning (arXiv): {e} — keeping existing cache", file=sys.stderr)
        data["arxiv_cache"] = existing_arxiv

    OUTPUT_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"\nWrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
