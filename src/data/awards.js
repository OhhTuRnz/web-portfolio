export const awards = [
  {
    id: "award-2025-001",
    title: "PhD Admission - Top 3% Pool",
    organization: "MIT Department of Aeronautics and Astronautics",
    year: 2025,
    link: "https://aeroastro.mit.edu/",
    category: "academic",
    icon: "🎓",
    preview: {
      title: "MIT Department of Aeronautics and Astronautics",
      description: "The MIT Department of Aeronautics and Astronautics is a world leader in aerospace education and research, offering cutting-edge programs in space systems, autonomous vehicles, and advanced propulsion.",
      domain: "aeroastro.mit.edu"
    }
  },
  {
    id: "award-2025-002",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "MIT Lincoln Lab",
    year: 2025,
    link: "https://kspdg.com/",
    category: "research",
    icon: "🚀",
    preview: {
      title: "Kerbal Space Program Differential Games Challenge",
      description: "An international competition challenging teams to develop autonomous AI agents for spacecraft control and mission planning in the Kerbal Space Program environment.",
      domain: "kspdg.com"
    }
  },
  {
    id: "award-2024-001",
    title: "92nd Percentile - Bachelor's Degree",
    organization: "ETSISI - Universidad Politécnica de Madrid",
    year: 2024,
    link: "https://www.etsisi.upm.es/",
    category: "academic",
    icon: "🎓",
    preview: {
      title: "ETSISI - Universidad Politécnica de Madrid",
      description: "The School of Computer Systems Engineering at UPM is a leading institution in Spain for computer science and software engineering education, known for its rigorous academic programs.",
      domain: "etsisi.upm.es"
    }
  },
  {
    id: "award-2024-002",
    title: "Best Bachelor Thesis for National Defense Award",
    organization: "Centro Superior de Estudios de la Defensa Nacional (CESEDEN)",
    year: 2024,
    link: "https://www.upm.es/UPM?id=CON16695&prefmt=articulo&fmt=detail",
    category: "academic",
    icon: "🏅",
    preview: {
      title: "Best Bachelor Thesis for National Defense Award",
      description: "CESEDEN recognition for outstanding research contributions to national defense applications in autonomous systems and AI technologies.",
      domain: "upm.es"
    }
  },
  {
    id: "award-2024-003",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "MIT Lincoln Lab",
    year: 2024,
    link: "https://kspdg.com/",
    category: "research",
    icon: "🤖",
    preview: {
      title: "KSPDG 2024 Competition Results",
      description: "The 2024 challenge focused on autonomous spacecraft control using AI agents, with teams competing to develop the most effective mission planning and execution algorithms.",
      domain: "kspdg.com"
    }
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