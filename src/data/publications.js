// Publications data — auto-merged from Google Scholar cache + manual overrides.
// The cache (scholar-cache.json) is refreshed weekly by .github/workflows/fetch-scholar.yml.
// Manual overrides supply fields Scholar cannot provide: abstract, keywords, featured,
// doi, pdfUrl, website, code, datasets.

import cache from './scholar-cache.json';

// ── Scholar profile (from cache) ────────────────────────────────────────────
export const scholarProfile = {
  name:           cache.name,
  affiliation:    cache.affiliation,
  profileUrl:     cache.profile_url,
  totalCitations: cache.total_citations,
  hIndex:         cache.h_index,
  i10Index:       cache.i10_index,
  fetchedAt:      cache.fetched_at,
};

// ── Manual overrides ─────────────────────────────────────────────────────────
// _matchTitle must be lowercase + punctuation-stripped to match Scholar title.
// Only add fields that cannot be auto-fetched (type, keywords, extra links,
// or a published journal DOI that supersedes the arXiv preprint DOI).
// abstract / pdf_url are filled automatically from arxiv_cache each week.
const manualOverrides = [
  {
    _matchTitle: "vibeops intelligent spacecraft operations copilot",
    id: "pub-2026-001",
    type: "conference",
    keywords: ["Spacecraft Operations", "Autonomous Systems", "Co-Pilot AI", "Space Systems", "Mission Planning"],
    featured: false,
  },
  {
    _matchTitle: "beavr bimanual multiembodiment accessible virtual reality teleoperation system for robots",
    id: "pub-2025-003",
    type: "conference",
    keywords: ["VR Teleoperation", "Robotics", "Bimanual Control", "Real-time Systems", "Policy Learning", "Meta Quest 3"],
    website: "https://arclab-mit.github.io/beavr-landing/",
    code: "https://github.com/ARCLab-MIT/BEAVR-Bot",
    datasets: "https://huggingface.co/collections/ARCLab-MIT/beavr-datasets",
    featured: false,
  },
  {
    _matchTitle: "large language models as autonomous spacecraft operators in kerbal space program",
    id: "pub-2025-002",
    type: "journal",
    // Published journal DOI overrides the arXiv preprint DOI from the cache
    doi: "https://doi.org/10.1016/j.asr.2025.06.034",
    keywords: ["Large Language Models", "Autonomous Agents", "Kerbal Space Program", "Prompt Engineering", "Fine-tuning", "Spacecraft Control"],
    featured: false,
  },
  {
    _matchTitle: "language models are spacecraft operators",
    id: "pub-2024-001",
    type: "preprint",
    keywords: ["Language Models", "Spacecraft Operations", "Autonomous Decision Making", "Space AI"],
    featured: false,
  },
  {
    _matchTitle: "finetuning llms for autonomous spacecraft control a case study using kerbal space program",
    id: "pub-2024-002",
    type: "conference",
    keywords: ["Fine-tuning", "LLM", "Spacecraft Control", "Autonomous Systems", "Kerbal Space Program"],
    featured: false,
  },
  {
    _matchTitle: "visual language models as operator agents in the space domain",
    id: "pub-2025-001",
    type: "conference",
    keywords: ["Visual Language Models", "Space Operations", "Multimodal AI", "Operator Agents"],
    featured: false,
  },
];

// ── Merge helpers ─────────────────────────────────────────────────────────────
const arxivCache = cache.arxiv_cache || {};

function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

function extractArxivId(url) {
  if (!url) return null;
  const m = url.match(/arxiv\.org\/(?:abs|pdf)\/(\d{4}\.\d{4,5})/);
  return m ? m[1] : null;
}

function mergePublications(scraped, overrides) {
  return scraped.map((pub, idx) => {
    const norm     = normalizeTitle(pub.title);
    const override = overrides.find(o => normalizeTitle(o._matchTitle) === norm) || {};
    const { _matchTitle, ...clean } = override;

    // Derive arXiv ID from eprint_url set by the fetch script — no hardcoding needed.
    // The fetch script visits each Scholar citation page, finds the arXiv link,
    // and stores it in eprint_url. arxiv_cache is then built from the arXiv API.
    const eprintPdf = pub.eprint_url || null;
    const eprintAbs = eprintPdf ? eprintPdf.replace('arxiv.org/pdf/', 'arxiv.org/abs/') : null;
    const arxivId   = extractArxivId(eprintPdf);
    const ax        = arxivId ? (arxivCache[arxivId] || {}) : {};

    return {
      id:          clean.id          || `pub-${pub.year}-${idx}`,
      title:       pub.title,
      authors:     pub.authors,
      venue:       pub.venue,
      year:        pub.year,
      citations:   pub.citations,
      scholar_url: pub.scholar_url,
      arxivId:     arxivId,
      type:        clean.type        || 'conference',
      doi:         clean.doi         || ax.doi        || eprintAbs || pub.scholar_url,
      pdfUrl:      clean.pdfUrl      || ax.pdf_url    || eprintPdf || null,
      abstract:    clean.abstract    || ax.abstract   || '',
      keywords:    clean.keywords    || [],
      featured:    clean.featured    || false,
      website:     clean.website     || null,
      code:        clean.code        || null,
      datasets:    clean.datasets    || null,
      projectPage: clean.projectPage || null,
    };
  });
}

// ── Exports ───────────────────────────────────────────────────────────────────
export const publications = mergePublications(cache.publications, manualOverrides);

// Projects within the publications context (research projects linked to papers)
export const projects = [
  {
    id: "llm-space-agents",
    title: "LLM-Powered Autonomous Agents for Space Missions",
    shortDescription: "Autonomous decision-making systems for space exploration using large language models",
    fullDescription: "This project develops intelligent autonomous agents capable of making complex decisions in space environments using large language models.",
    status: "active",
    startDate: "2023-09",
    technologies: ["Python", "PyTorch", "ROS2", "OpenAI GPT", "Reinforcement Learning"],
    team: ["Alejandro Carrasco", "Prof. Jonathan How", "Dr. Soon-Jo Chung"],
    funding: "NASA NIAC Phase I Grant",
    publications: ["pub-2024-001"],
    media: { type: "video", url: "", images: [], videos: [] },
    links: {
      github: "https://github.com/mit-arclab/llm-space-agents",
      paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:9yKSN-GCB0IC"
    }
  },
  {
    id: "teleoperation-interface",
    title: "Advanced Teleoperation Interface for Space Robotics",
    shortDescription: "Haptic feedback and predictive control for space teleoperation systems",
    fullDescription: "Development of an advanced teleoperation interface specifically designed for space robotics applications.",
    status: "completed",
    startDate: "2022-01",
    endDate: "2023-12",
    technologies: ["C++", "ROS", "Haptic Devices", "Qt", "OpenGL"],
    team: ["Alejandro Carrasco", "Dr. Maria Johnson", "Kiran Patel"],
    funding: "MIT ARC Lab Internal Grant",
    publications: ["pub-2024-002"],
    media: { type: "image", url: "", images: [], videos: [] },
    links: {
      github: "https://github.com/mit-arclab/teleoperation-interface",
      paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:u-x6o8ySG0sC"
    }
  },
];

// ── Helper functions (interface unchanged) ────────────────────────────────────
export function getPublicationsByYear() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);
  return sorted.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});
}

export function getPublicationsByType() {
  return publications.reduce((acc, pub) => {
    if (!acc[pub.type]) acc[pub.type] = [];
    acc[pub.type].push(pub);
    return acc;
  }, {});
}

export function getPublicationById(id) {
  return publications.find(pub => pub.id === id);
}

export function getProjectById(id) {
  return projects.find(project => project.id === id);
}

export function getTotalCitations() {
  return publications.reduce((total, pub) => total + pub.citations, 0);
}
