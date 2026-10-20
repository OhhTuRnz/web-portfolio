"""Regression checks for Scholar publication dates without network access."""

import unittest
from unittest.mock import Mock, patch

from scripts.fetch_scholar import (
    fetch_profile,
    parse_publication_year,
    validate_profile,
)


class PublicationYearTests(unittest.TestCase):
    def test_valid_years(self):
        for value in (2025, "2025", " 2025 "):
            with self.subTest(value=value):
                self.assertEqual(parse_publication_year(value), 2025)

    def test_missing_and_invalid_years(self):
        for value in (None, "", " ", 0, "0", "N/A", "2025a", -2025, 2025.5, True):
            with self.subTest(value=value):
                self.assertIsNone(parse_publication_year(value))

    @patch("scripts.fetch_scholar.MIN_PUBLICATIONS", 1)
    @patch("scripts.fetch_scholar.requests.get")
    def test_fetch_skips_undated_papers_and_preserves_scholar_metrics(self, get):
        articles = [
            {"title": "Older paper", "year": "2024"},
            {"title": "Undated paper"},
            {"title": "Newest paper", "year": " 2026 "},
            {"title": "Invalid year", "year": "N/A"},
            {"title": "Year zero", "year": "0"},
            {"title": "Empty year", "year": ""},
            {"title": "Null year", "year": None},
        ]
        response = Mock()
        response.json.return_value = {
            "author": {"name": "Test Author"},
            "articles": articles,
            "cited_by": {
                "table": [
                    {"citations": {"all": 99}},
                    {"h_index": {"all": 5}},
                    {"i10_index": {"all": 3}},
                ]
            },
        }
        get.return_value = response

        profile = fetch_profile("test-key")

        self.assertEqual(
            [(paper["title"], paper["year"]) for paper in profile["publications"]],
            [("Newest paper", 2026), ("Older paper", 2024)],
        )
        self.assertEqual(profile["total_citations"], 99)
        self.assertEqual(profile["h_index"], 5)
        self.assertEqual(profile["i10_index"], 3)
        response.raise_for_status.assert_called_once()
        get.assert_called_once()

        profile["publications"] = []
        with self.assertRaisesRegex(RuntimeError, "publications"):
            validate_profile(profile)


if __name__ == "__main__":
    unittest.main()
