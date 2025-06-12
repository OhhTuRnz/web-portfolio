export const awards = [
  {
    id: "award-2024-001",
    title: "Best Student Paper Award",
    organization: "IEEE Aerospace Conference",
    year: 2024,
    description: "Recognition for outstanding research in autonomous spacecraft operations using large language models.",
    link: "https://www.aeroconf.org/awards/",
    category: "research",
    icon: "🏆"
  },
  {
    id: "award-2023-001",
    title: "MIT ARC Lab Research Excellence Award",
    organization: "MIT Autonomous Systems Laboratory",
    year: 2023,
    description: "Award for exceptional research contributions in space robotics and autonomous systems during Master's studies.",
    link: "https://aeroastro.mit.edu/arclab/",
    category: "research",
    icon: "🎓"
  },
  {
    id: "award-2023-002",
    title: "Outstanding Poster Presentation",
    organization: "International Conference on Robotics and Automation (ICRA)",
    year: 2023,
    description: "Recognition for innovative research presentation on teleoperation interface design for space applications.",
    link: "https://www.icra2023.org/awards",
    category: "research",
    icon: "📊"
  },
  {
    id: "award-2022-001",
    title: "NASA USRP Internship Award",
    organization: "NASA Jet Propulsion Laboratory",
    year: 2022,
    description: "Competitive internship program for undergraduate research in spacecraft anomaly detection systems.",
    link: "https://www.nasa.gov/learning-resources/internship-programs/",
    category: "fellowship",
    icon: "🚀"
  },
  {
    id: "award-2022-002",
    title: "Dean's List Recognition",
    organization: "Universidad Politécnica de Madrid",
    year: 2022,
    description: "Academic excellence recognition for outstanding performance in Computer Engineering program.",
    link: "https://www.upm.es/",
    category: "academic",
    icon: "🎖️"
  },
  {
    id: "award-2021-001",
    title: "Summa Cum Laude",
    organization: "Universidad Politécnica de Madrid",
    year: 2021,
    description: "Graduated with highest honors in Computer Engineering program with focus on artificial intelligence and robotics.",
    link: "https://www.upm.es/",
    category: "academic",
    icon: "🎓"
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