export const awards = [
  {
    id: "award-2025-001",
    title: "PhD Admission - Top 3% Pool",
    organization: "MIT Department of Aeronautics and Astronautics",
    year: 2025,
    description: "Admitted to the highly selective PhD program in AeroAstro at MIT, ranking in the top 3% of applicants worldwide.",
    link: "https://aeroastro.mit.edu/",
    category: "academic",
    icon: "🎓"
  },
  {
    id: "award-2025-002",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "KSPDG Competition",
    year: 2025,
    description: "Second place achievement in the prestigious Kerbal Space Program Differential Games Challenge, demonstrating advanced autonomous control algorithms for space missions.",
    link: "https://kspdg.com/",
    category: "research",
    icon: "🚀"
  },
  {
    id: "award-2024-001",
    title: "92nd Percentile - Bachelor's Degree",
    organization: "ETSISI - Universidad Politécnica de Madrid",
    year: 2024,
    description: "Graduated in the 92nd percentile of the Computer Engineering program, demonstrating exceptional academic performance.",
    link: "https://www.etsisi.upm.es/",
    category: "academic",
    icon: "🎓"
  },
  {
    id: "award-2024-002",
    title: "Best Bachelor Thesis for National Defense Award",
    organization: "Centro Superior de Estudios de la Defensa Nacional (CESEDEN)",
    year: 2024,
    description: "Recognition for outstanding bachelor thesis contributing to national defense research and applications in autonomous systems.",
    link: "https://www.defensa.gob.es/ceseden/",
    category: "academic",
    icon: "🏅"
  },
  {
    id: "award-2024-003",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "KSPDG Competition",
    year: 2024,
    description: "Second place achievement in the Kerbal Space Program Differential Games Challenge, showcasing best AI solution for autonomous space mission planning and execution.",
    link: "https://kspdg.com/",
    category: "research",
    icon: "🤖"
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