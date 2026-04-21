#!/usr/bin/env python3
"""
Fetch Google Scholar data via SerpAPI + arXiv API.
- SerpAPI : author profile + citation counts  (1 credit/week)
- arXiv   : abstracts + PDF URLs              (free, unlimited)

Credits used: 1 per run. Triggered weekly → ~4 credits/month.

Requirements:
  pip install requests
  env var: SERPAPI_KEY
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
MIN_PUBLICATIONS = int(os.environ.get("SCHOLAR_MIN_PUBLICATIONS", "1"))
MIN_TOTAL_CITATIONS = int(os.environ.get("SCHOLAR_MIN_TOTAL_CITATIONS", "1"))
ARXIV_NS    = {
    "atom":  "http://www.w3.org/2005/Atom",
    "arxiv": "http://arxiv.org/schemas/atom",
}

# Add new arXiv IDs here when you publish a new paper
ARXIV_ID_TABLE = {
    "language models are spacecraft operators":                          "2404.00413",
    "fine-tuning llms for autonomous spacecraft control":                "2408.08676",
    "visual language models as operator agents in the space domain":     "2501.07802",
    "large language models as autonomous spacecraft operators in kerbal": "2505.19896",
    "beavr":                                                             "2508.09606",
}


# ── SerpAPI: author profile + citation counts ─────────────────────────────────

def fetch_profile(api_key: str) -> dict:
    print(f"Fetching Scholar profile via SerpAPI (id={SCHOLAR_ID})...")
    r = requests.get("https://serpapi.com/search", params={
        "engine":    "google_scholar_author",
        "author_id": SCHOLAR_ID,
        "num":       100,
        "sort":      "pubdate",
        "api_key":   api_key,
    }, timeout=30)
    r.raise_for_status()
    data = r.json()
    if "error" in data:
        raise RuntimeError(f"SerpAPI error: {data['error']}")

    author = data.get("author", {})
    table  = data.get("cited_by", {}).get("table", [])

    def stat(idx):
        try:
            return list(table[idx].values())[0].get("all", 0)
        except (IndexError, AttributeError):
            return 0

    total_citations = stat(0)
    h_index         = stat(1)
    i10_index       = stat(2)
    print(f"  {author.get('name','?')} | citations={total_citations} h={h_index} i10={i10_index}")

    publications = []
    for article in data.get("articles", []):
        publications.append({
            "scholar_id":  article.get("citation_id", ""),
            "title":       article.get("title", ""),
            "authors":     [a.strip() for a in article.get("authors", "").split(",") if a.strip()],
            "venue":       article.get("publication", ""),
            "year":        int(article.get("year") or 0),
            "citations":   article.get("cited_by", {}).get("value", 0) or 0,
            "scholar_url": article.get("link", ""),
            "eprint_url":  "",
            "abstract":    "",
            "pdf_url":     "",
            "doi":         "",
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


def validate_profile(data: dict) -> None:
    """Reject empty/degraded Scholar payloads before they can reach a deploy."""
    publications = data.get("publications") or []
    errors = []

    if len(publications) < MIN_PUBLICATIONS:
        errors.append(f"expected at least {MIN_PUBLICATIONS} publications, got {len(publications)}")

    total_citations = data.get("total_citations") or 0
    if total_citations < MIN_TOTAL_CITATIONS:
        errors.append(f"expected at least {MIN_TOTAL_CITATIONS} total citations, got {total_citations}")

    if not data.get("profile_url") or SCHOLAR_ID not in data.get("profile_url", ""):
        errors.append("profile URL is missing or does not match the configured Scholar ID")

    if any(not pub.get("title") for pub in publications):
        errors.append("one or more publications are missing titles")

    if errors:
        raise RuntimeError("Refusing to write invalid Scholar data: " + "; ".join(errors))


# ── arXiv: abstracts + PDF URLs ───────────────────────────────────────────────

def get_arxiv_id(title: str) -> str | None:
    key = title.lower().strip()
    for fragment, arxiv_id in ARXIV_ID_TABLE.items():
        if fragment in key:
            return arxiv_id
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
        id_el      = entry.find("atom:id", ARXIV_NS)
        summary_el = entry.find("atom:summary", ARXIV_NS)
        if id_el is None:
            continue
        arxiv_id = re.sub(r"v\d+$", "", id_el.text.split("/abs/")[-1])
        abstract  = re.sub(r"\s+", " ", summary_el.text).strip() if summary_el is not None else ""

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

    data = fetch_profile(api_key)
    validate_profile(data)

    # Match publications to arXiv IDs
    arxiv_ids = []
    seen = set()
    for pub in data["publications"]:
        arxiv_id = get_arxiv_id(pub["title"])
        if arxiv_id and arxiv_id not in seen:
            seen.add(arxiv_id)
            arxiv_ids.append(arxiv_id)
            pub["eprint_url"] = f"https://arxiv.org/abs/{arxiv_id}"
            print(f"  [{arxiv_id}] {pub['title'][:60]}")
        else:
            print(f"  [no arXiv] {pub['title'][:60]}")

    # Enrich with arXiv metadata
    existing_arxiv = {}
    if OUTPUT_PATH.exists():
        try:
            existing_arxiv = json.loads(OUTPUT_PATH.read_text()).get("arxiv_cache", {})
        except Exception:
            pass

    try:
        arxiv_data = fetch_arxiv_metadata(arxiv_ids)
        data["arxiv_cache"] = {**existing_arxiv, **arxiv_data}
        # Copy abstract/pdf_url onto each publication
        for pub in data["publications"]:
            arxiv_id = get_arxiv_id(pub["title"])
            if arxiv_id and arxiv_id in data["arxiv_cache"]:
                ax = data["arxiv_cache"][arxiv_id]
                pub["abstract"] = ax.get("abstract", "")
                pub["pdf_url"]  = ax.get("pdf_url", "")
                pub["doi"]      = pub["doi"] or ax.get("doi", "")
    except Exception as e:
        print(f"Warning (arXiv): {e}", file=sys.stderr)
        data["arxiv_cache"] = existing_arxiv

    OUTPUT_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"\nWrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
