export const awards = [
  {
    id: "award-2024-001",
    title: "Best Paper Award",
    organization: "International Conference on Machine Learning (ICML)",
    year: 2024,
    description: "Recognition for outstanding research in autonomous agent decision-making systems for space applications.",
    link: "https://icml.cc/Conferences/2024/Awards",
    category: "research",
    icon: "🏆"
  },
  {
    id: "award-2023-001",
    title: "MIT Presidential Fellowship",
    organization: "Massachusetts Institute of Technology",
    year: 2023,
    description: "Prestigious fellowship awarded to exceptional PhD students for research excellence in artificial intelligence and robotics.",
    link: "https://odge.mit.edu/finances/fellowships/presidential/",
    category: "fellowship",
    icon: "🎓"
  },
  {
    id: "award-2023-002",
    title: "Outstanding Poster Award",
    organization: "Neural Information Processing Systems (NeurIPS)",
    year: 2023,
    description: "Recognition for innovative research in multi-agent communication systems for space applications.",
    link: "https://neurips.cc/Conferences/2023/Awards",
    category: "research",
    icon: "📊"
  },
  {
    id: "award-2022-001",
    title: "NASA NIAC Phase II Grant",
    organization: "NASA Innovative Advanced Concepts",
    year: 2022,
    description: "Funding award for research in autonomous space systems and large language model integration.",
    link: "https://www.nasa.gov/directorates/spacetech/niac/",
    category: "funding",
    icon: "🚀"
  },
  {
    id: "award-2022-002",
    title: "NSF Graduate Research Fellowship",
    organization: "National Science Foundation",
    year: 2022,
    description: "Three-year fellowship supporting graduate research in artificial intelligence and robotics.",
    link: "https://www.nsfgrfp.org/",
    category: "fellowship",
    icon: "🔬"
  },
  {
    id: "award-2021-001",
    title: "Summa Cum Laude",
    organization: "Universidad Politécnica de Madrid",
    year: 2021,
    description: "Graduated with highest honors in Computer Engineering program with focus on artificial intelligence.",
    link: "https://www.upm.es/",
    category: "academic",
    icon: "🎖️"
  }
];

export function getAwardsByYear() {
  return awards.reduce((acc, award) => {
    if (!acc[award.year]) acc[award.year] = [];
    acc[award.year].push(award);
    return acc;
  }, {});
}

export function getAwardsByCategory() {
  return awards.reduce((acc, award) => {
    if (!acc[award.category]) acc[award.category] = [];
    acc[award.category].push(award);
    return acc;
  }, {});
}