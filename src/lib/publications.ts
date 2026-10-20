import { publications as sourcePublications } from '../data/publications.js';

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  citations: number;
  type: string;
  scholar_url: string;
  doi: string | null;
  pdfUrl: string | null;
  abstract: string;
}

export function getPublicationGroups() {
  const publications: Publication[] = sourcePublications.filter((publication: Publication) =>
    Number.isInteger(publication.year) && publication.year >= 1000 && publication.year <= 9999,
  );
  const years = [...new Set(publications.map((publication) => publication.year))].sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    entries: publications.filter((publication) => publication.year === year)
      .sort((a, b) => b.citations - a.citations || a.title.localeCompare(b.title)),
  }));
}
