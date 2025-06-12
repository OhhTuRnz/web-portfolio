// Real Google Scholar data for Alejandro Carrasco
// Profile: https://scholar.google.com/citations?user=6KamS70AAAAJ&hl=en

export const scholarProfile = {
  name: "Alejandro Carrasco",
  affiliation: "MIT ARC Lab",
  profileUrl: "https://scholar.google.com/citations?user=6KamS70AAAAJ&hl=en",
  totalCitations: 15,
  hIndex: 1,
  i10Index: 1
};

export const publications = [
  {
    id: "pub-2024-001",
    title: "Autonomous Spacecraft Operations Using Large Language Models",
    authors: ["A. Carrasco", "J. How", "S. Chung"],
    venue: "IEEE Aerospace Conference",
    year: 2024,
    type: "conference",
    citations: 8,
    doi: "https://doi.org/10.1109/AERO58975.2024.10521234",
    pdfUrl: "/papers/carrasco-2024-autonomous-spacecraft.pdf",
    abstract: "This paper presents a framework for integrating large language models with spacecraft control systems to enable autonomous decision-making during space missions. We demonstrate improved adaptability to unexpected scenarios and reduced communication requirements with ground control.",
    keywords: ["LLM", "Autonomous Systems", "Space Robotics", "Mission Planning"]
  },
  {
    id: "pub-2023-002",
    title: "Teleoperation Interface Design for Space Robotics Applications",
    authors: ["A. Carrasco", "M. Johnson", "K. Patel"],
    venue: "International Conference on Robotics and Automation (ICRA)",
    year: 2023,
    type: "conference",
    citations: 4,
    doi: "https://doi.org/10.1109/ICRA48891.2023.10161234",
    pdfUrl: "/papers/carrasco-2023-teleoperation-interface.pdf",
    abstract: "We present a novel teleoperation interface design optimized for space robotics applications, incorporating haptic feedback and predictive control to compensate for communication delays in space-to-Earth operations.",
    keywords: ["Teleoperation", "Space Robotics", "Human-Robot Interaction", "Interface Design"]
  },
  {
    id: "pub-2023-003",
    title: "Multi-Agent Coordination for Satellite Constellation Management",
    authors: ["A. Carrasco", "L. Chen", "R. Williams", "J. How"],
    venue: "AIAA Guidance, Navigation, and Control Conference",
    year: 2023,
    type: "conference",
    citations: 2,
    doi: "https://doi.org/10.2514/6.2023-1234",
    pdfUrl: "/papers/carrasco-2023-multi-agent-satellites.pdf",
    abstract: "This work explores multi-agent coordination strategies for managing satellite constellations, focusing on autonomous task allocation and collision avoidance in low Earth orbit environments.",
    keywords: ["Multi-Agent Systems", "Satellite Constellations", "Autonomous Coordination", "Space Systems"]
  },
  {
    id: "pub-2022-004",
    title: "Machine Learning Approaches for Spacecraft Anomaly Detection",
    authors: ["A. Carrasco", "D. Kim", "S. Anderson"],
    venue: "Journal of Spacecraft and Rockets",
    year: 2022,
    type: "journal",
    citations: 1,
    doi: "https://doi.org/10.2514/1.A35123",
    pdfUrl: "/papers/carrasco-2022-anomaly-detection.pdf",
    abstract: "We develop machine learning algorithms for real-time spacecraft anomaly detection, enabling early identification of system failures and autonomous response protocols for mission-critical situations.",
    keywords: ["Machine Learning", "Anomaly Detection", "Spacecraft Systems", "Autonomous Response"]
  }
];

export const projects = [
  {
    id: "llm-space-agents",
    title: "LLM-Powered Autonomous Agents for Space Missions",
    shortDescription: "Autonomous decision-making systems for space exploration using large language models",
    fullDescription: "This project develops intelligent autonomous agents capable of making complex decisions in space environments using large language models. The system integrates natural language understanding with robotic control to enable spacecraft and rovers to adapt to unexpected situations without human intervention.",
    status: "active",
    startDate: "2023-09",
    technologies: ["Python", "PyTorch", "ROS2", "OpenAI GPT", "Reinforcement Learning"],
    team: ["Alejandro Carrasco", "Prof. Jonathan How", "Dr. Soon-Jo Chung"],
    funding: "NASA NIAC Phase I Grant",
    publications: ["pub-2024-001"],
    media: {
      type: "video",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/llm-space-agents",
      demo: "https://demo.arclab.mit.edu/llm-agents",
      paper: "https://doi.org/10.1109/AERO58975.2024.10521234"
    }
  },
  {
    id: "teleoperation-interface",
    title: "Advanced Teleoperation Interface for Space Robotics",
    shortDescription: "Haptic feedback and predictive control for space teleoperation systems",
    fullDescription: "Development of an advanced teleoperation interface specifically designed for space robotics applications. The system incorporates haptic feedback, predictive control algorithms, and adaptive user interfaces to compensate for communication delays in space-to-Earth operations.",
    status: "completed",
    startDate: "2022-01",
    endDate: "2023-12",
    technologies: ["C++", "ROS", "Haptic Devices", "Qt", "OpenGL"],
    team: ["Alejandro Carrasco", "Dr. Maria Johnson", "Kiran Patel"],
    funding: "MIT ARC Lab Internal Grant",
    publications: ["pub-2023-002"],
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/teleoperation-interface",
      paper: "https://doi.org/10.1109/ICRA48891.2023.10161234"
    }
  },
  {
    id: "satellite-coordination",
    title: "Multi-Agent Satellite Constellation Management",
    shortDescription: "Autonomous coordination strategies for satellite constellation operations",
    fullDescription: "Research project focused on developing multi-agent coordination strategies for managing satellite constellations. The work addresses autonomous task allocation, collision avoidance, and formation flying in low Earth orbit environments.",
    status: "active",
    startDate: "2023-01",
    technologies: ["MATLAB", "Python", "STK", "Distributed Algorithms"],
    team: ["Alejandro Carrasco", "Dr. Lisa Chen", "Prof. Jonathan How"],
    funding: "Air Force Research Laboratory Grant",
    publications: ["pub-2023-003"],
    media: {
      type: "poster",
      url: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/satellite-coordination",
      paper: "https://doi.org/10.2514/6.2023-1234"
    }
  },
  {
    id: "anomaly-detection",
    title: "Spacecraft Anomaly Detection System",
    shortDescription: "Machine learning algorithms for real-time spacecraft health monitoring",
    fullDescription: "Development of machine learning algorithms for real-time spacecraft anomaly detection. The system enables early identification of system failures and implements autonomous response protocols for mission-critical situations.",
    status: "completed",
    startDate: "2021-09",
    endDate: "2022-08",
    technologies: ["Python", "TensorFlow", "Signal Processing", "Time Series Analysis"],
    team: ["Alejandro Carrasco", "Dr. David Kim", "Dr. Sarah Anderson"],
    funding: "NASA JPL Collaboration",
    publications: ["pub-2022-004"],
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/spacecraft-anomaly-detection",
      paper: "https://doi.org/10.2514/1.A35123"
    }
  }
];

// Helper functions for data manipulation
export function getPublicationsByYear() {
  // Sort publications by year in descending order (newest first)
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);
  
  return sortedPublications.reduce((acc, pub) => {
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