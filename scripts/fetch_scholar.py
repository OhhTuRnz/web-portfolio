#!/usr/bin/env python3
"""
Fetch Google Scholar data entirely via SerpAPI.
- 1 call  : author profile + publications list
- N calls : one per publication to get abstract + PDF + DOI

Credits used: 1 + N per run (N = number of publications).
Triggered weekly → well within the 250 free credits/month.

Requirements:
  pip install requests
  env var: SERPAPI_KEY
"""

import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
except ImportError:
    print("Missing dependency. Run: pip install requests", file=sys.stderr)
    sys.exit(1)

SCHOLAR_ID  = "6KamS70AAAAJ"
OUTPUT_PATH = Path(__file__).parent.parent / "src" / "data" / "scholar-cache.json"
BASE_URL    = "https://serpapi.com/search"


def serpapi(params: dict, api_key: str) -> dict:
    r = requests.get(BASE_URL, params={**params, "api_key": api_key}, timeout=30)
    r.raise_for_status()
    data = r.json()
    if "error" in data:
        raise RuntimeError(f"SerpAPI error: {data['error']}")
    return data


# ── Step 1: Author profile ────────────────────────────────────────────────────

def fetch_profile(api_key: str) -> dict:
    print(f"Fetching author profile (id={SCHOLAR_ID})...")
    data = serpapi({
        "engine":    "google_scholar_author",
        "author_id": SCHOLAR_ID,
        "num":       100,
        "sort":      "pubdate",
    }, api_key)

    author   = data.get("author", {})
    table    = data.get("cited_by", {}).get("table", [])

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
        citation_id = article.get("citation_id", "")
        publications.append({
            "scholar_id":   citation_id,
            "title":        article.get("title", ""),
            "authors":      [a.strip() for a in article.get("authors", "").split(",") if a.strip()],
            "venue":        article.get("publication", ""),
            "year":         int(article.get("year") or 0),
            "citations":    article.get("cited_by", {}).get("value", 0) or 0,
            "scholar_url":  article.get("link", ""),
            "eprint_url":   "",
            "abstract":     "",
            "pdf_url":      "",
            "doi":          "",
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


# ── Step 2: Per-paper details ─────────────────────────────────────────────────

def fetch_citation_detail(citation_id: str, api_key: str) -> dict:
    """Fetch abstract, PDF URL, and DOI for a single paper."""
    data = serpapi({
        "engine":              "google_scholar_author",
        "view_op":             "view_citation",
        "citation_for_view":   citation_id,
    }, api_key)

    citation = data.get("citation", {})
    links    = data.get("links", [])

    pdf_url = ""
    for link in links:
        if "pdf" in link.get("name", "").lower() or "pdf" in link.get("link", "").lower():
            pdf_url = link.get("link", "")
            break

    doi = citation.get("doi", "")
    if doi and not doi.startswith("http"):
        doi = f"https://doi.org/{doi}"

    # eprint (arXiv) link
    eprint_url = ""
    for link in links:
        if "arxiv" in link.get("link", "").lower():
            eprint_url = link.get("link", "")
            break

    return {
        "abstract":    citation.get("abstract", ""),
        "pdf_url":     pdf_url,
        "doi":         doi,
        "eprint_url":  eprint_url,
    }


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    api_key = os.environ.get("SERPAPI_KEY", "")
    if not api_key:
        print("ERROR: SERPAPI_KEY env var not set.", file=sys.stderr)
        sys.exit(1)

    data = fetch_profile(api_key)

    print(f"\nFetching details for {len(data['publications'])} publications...")
    for pub in data["publications"]:
        time.sleep(1)
        try:
            details = fetch_citation_detail(pub["scholar_id"], api_key)
            pub["abstract"]   = details["abstract"]
            pub["pdf_url"]    = details["pdf_url"]
            pub["doi"]        = details["doi"]
            if details["eprint_url"]:
                pub["eprint_url"] = details["eprint_url"]
            abstract_len = len(pub["abstract"])
            print(f"  ✓ {pub['title'][:55]} ({abstract_len} chars abstract)")
        except Exception as e:
            print(f"  ✗ {pub['title'][:55]} — {e}", file=sys.stderr)

    OUTPUT_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"\nWrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
