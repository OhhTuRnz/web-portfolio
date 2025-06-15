export const awards = [
  {
    id: "award-2025-001",
    title: "PhD Admission - Top 3% Pool",
    organization: "MIT Department of Aeronautics and Astronautics",
    year: 2025,
    link: "https://aeroastro.mit.edu/",
    category: "academic",
    icon: "🎓"
  },
  {
    id: "award-2025-002",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "MIT Lincoln Lab",
    year: 2025,
    link: "https://kspdg.com/",
    category: "research",
    icon: "🚀"
  },
  {
    id: "award-2024-001",
    title: "92nd Percentile - Bachelor's Degree",
    organization: "ETSISI - Universidad Politécnica de Madrid",
    year: 2024,
    link: "https://www.etsisi.upm.es/",
    category: "academic",
    icon: "🎓"
  },
  {
    id: "award-2024-002",
    title: "Best Bachelor Thesis for National Defense Award",
    organization: "Centro Superior de Estudios de la Defensa Nacional (CESEDEN)",
    year: 2024,
    link: "https://www.upm.es/UPM?id=CON16695&prefmt=articulo&fmt=detail",
    category: "academic",
    icon: "🏅"
  },
  {
    id: "award-2024-003",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "MIT Lincoln Lab",
    year: 2024,
    link: "https://www.ll.mit.edu/conferences-events/2024/01/kerbal-space-program-differential-game-challenge",
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