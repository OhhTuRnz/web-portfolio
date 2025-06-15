export const awards = [
  {
    id: "award-2025-001",
    title: "PhD Admission - Top 3% Pool",
    organization: "MIT Department of Aeronautics and Astronautics",
    year: 2025,
    description: "Admitted to the highly selective PhD program in AeroAstro at MIT, ranking in the top 3% of applicants worldwide.",
    link: "https://aeroastro.mit.edu/",
    category: "academic",
    icon: "🎓",
    preview: {
      title: "MIT Department of Aeronautics and Astronautics",
      description: "The MIT Department of Aeronautics and Astronautics is a world leader in aerospace education and research, offering cutting-edge programs in space systems, autonomous vehicles, and advanced propulsion.",
      image: "https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=800",
      domain: "aeroastro.mit.edu"
    }
  },
  {
    id: "award-2025-002",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "KSPDG Competition",
    year: 2025,
    description: "Second place achievement in the prestigious Kerbal Space Program Differential Games Challenge, demonstrating advanced autonomous control algorithms for space missions.",
    link: "https://kspdg.com/",
    category: "research",
    icon: "🚀",
    preview: {
      title: "Kerbal Space Program Differential Games Challenge",
      description: "An international competition challenging teams to develop autonomous AI agents for spacecraft control and mission planning in the Kerbal Space Program environment.",
      image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
      domain: "kspdg.com"
    }
  },
  {
    id: "award-2024-001",
    title: "92nd Percentile - Bachelor's Degree",
    organization: "ETSISI - Universidad Politécnica de Madrid",
    year: 2024,
    description: "Graduated in the 92nd percentile of the Computer Engineering program, demonstrating exceptional academic performance.",
    link: "https://www.etsisi.upm.es/",
    category: "academic",
    icon: "🎓",
    preview: {
      title: "ETSISI - Universidad Politécnica de Madrid",
      description: "The School of Computer Systems Engineering at UPM is a leading institution in Spain for computer science and software engineering education, known for its rigorous academic programs.",
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
      domain: "etsisi.upm.es"
    }
  },
  {
    id: "award-2024-002",
    title: "Best Bachelor Thesis for National Defense Award",
    organization: "Centro Superior de Estudios de la Defensa Nacional (CESEDEN)",
    year: 2024,
    description: "Recognition for outstanding bachelor thesis contributing to national defense research and applications in autonomous systems.",
    link: "https://www.defensa.gob.es/ceseden/",
    category: "academic",
    icon: "🏅",
    preview: {
      title: "Centro Superior de Estudios de la Defensa Nacional",
      description: "CESEDEN is Spain's premier defense studies institution, promoting research and education in national security, defense strategy, and military technology applications.",
      image: "https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg?auto=compress&cs=tinysrgb&w=800",
      domain: "defensa.gob.es"
    }
  },
  {
    id: "award-2024-003",
    title: "Kerbal Space Program Differential Games Challenge (KSPDG) 2nd Position",
    organization: "KSPDG Competition",
    year: 2024,
    description: "Second place achievement in the Kerbal Space Program Differential Games Challenge, showcasing best AI solution for autonomous space mission planning and execution.",
    link: "https://kspdg.com/",
    category: "research",
    icon: "🤖",
    preview: {
      title: "KSPDG 2024 Competition Results",
      description: "The 2024 challenge focused on autonomous spacecraft control using AI agents, with teams competing to develop the most effective mission planning and execution algorithms.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
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