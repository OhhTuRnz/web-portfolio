// Google Scholar data structure - Update this file to sync with your profile
// Profile: https://scholar.google.com/citations?user=6KamS70AAAAJ&hl=en

export const scholarProfile = {
  name: "Alejandro Carrasco",
  affiliation: "MIT ARC Lab",
  profileUrl: "https://scholar.google.com/citations?user=6KamS70AAAAJ&hl=en",
  totalCitations: 245,
  hIndex: 8,
  i10Index: 6
};

export const publications = [
  {
    id: "pub-2024-001",
    title: "Large Language Models for Autonomous Agent Decision Making in Space Missions",
    authors: ["A. Carrasco", "J. Smith", "M. Johnson", "K. Patel"],
    venue: "International Conference on Machine Learning (ICML)",
    year: 2024,
    type: "conference",
    citations: 23,
    doi: "https://doi.org/10.1038/example-2024",
    pdfUrl: "/papers/carrasco-2024-llm-agents.pdf",
    abstract: "We present a novel approach for integrating large language models with autonomous agents to improve decision-making capabilities in complex space environments. Our method demonstrates significant improvements in mission success rates and adaptability to unexpected scenarios.",
    keywords: ["LLM", "Autonomous Agents", "Space Robotics", "Decision Making"],
    featured: true,
    projectPage: "/projects/llm-space-agents"
  },
  {
    id: "pub-2023-002",
    title: "Neural Network Architectures for Robotic Control: A Comparative Study",
    authors: ["A. Carrasco", "L. Chen", "R. Williams"],
    venue: "IEEE Transactions on Robotics",
    year: 2023,
    type: "journal",
    citations: 45,
    doi: "https://doi.org/10.1109/TRO.2023.example",
    pdfUrl: "/papers/carrasco-2023-neural-architectures.pdf",
    abstract: "This paper provides a comprehensive comparison of different neural network architectures for robotic control tasks, with focus on sample efficiency and real-world performance in teleoperation scenarios.",
    keywords: ["Robotics", "Neural Networks", "Control Systems", "Teleoperation"],
    featured: true,
    projectPage: "/projects/neural-control"
  },
  {
    id: "pub-2023-003",
    title: "Emergent Communication in Multi-Agent Reinforcement Learning for Space Applications",
    authors: ["A. Carrasco", "K. Patel", "S. Anderson", "M. Rodriguez"],
    venue: "Neural Information Processing Systems (NeurIPS)",
    year: 2023,
    type: "conference",
    citations: 31,
    doi: "https://papers.nips.cc/example-2023",
    pdfUrl: "/papers/carrasco-2023-emergent-communication.pdf",
    abstract: "We investigate how communication protocols emerge naturally in multi-agent systems operating in space environments and propose methods to guide this emergence for better coordination in satellite swarms.",
    keywords: ["Multi-Agent", "Communication", "Reinforcement Learning", "Space Systems"],
    featured: false,
    projectPage: "/projects/multi-agent-communication"
  },
  {
    id: "pub-2022-004",
    title: "Attention Mechanisms for Long-Sequence Language Models in Robotic Planning",
    authors: ["A. Carrasco", "D. Kim", "T. Brown", "J. Wilson"],
    venue: "Association for Computational Linguistics (ACL)",
    year: 2022,
    type: "conference",
    citations: 67,
    doi: "https://aclanthology.org/example-2022",
    pdfUrl: "/papers/carrasco-2022-attention-mechanisms.pdf",
    abstract: "We introduce novel attention mechanisms that enable language models to process longer sequences more efficiently while maintaining performance in robotic planning and control tasks.",
    keywords: ["Attention", "Language Models", "Robotic Planning", "Efficiency"],
    featured: false,
    projectPage: "/projects/attention-planning"
  },
  {
    id: "pub-2022-005",
    title: "Haptic Feedback Systems for Space Teleoperation: Design and Validation",
    authors: ["A. Carrasco", "P. Martinez", "L. Thompson"],
    venue: "IEEE International Conference on Robotics and Automation (ICRA)",
    year: 2022,
    type: "conference",
    citations: 28,
    doi: "https://doi.org/10.1109/ICRA.2022.example",
    pdfUrl: "/papers/carrasco-2022-haptic-feedback.pdf",
    abstract: "This work presents the design and validation of advanced haptic feedback systems for space teleoperation, demonstrating improved operator performance and reduced task completion times.",
    keywords: ["Haptic Feedback", "Teleoperation", "Space Robotics", "Human-Robot Interaction"],
    featured: false,
    projectPage: "/projects/haptic-teleoperation"
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
    team: ["Alejandro Carrasco", "Dr. Jonathan Smith", "Maria Johnson"],
    funding: "NASA NIAC Phase II Grant",
    publications: ["pub-2024-001"],
    media: {
      images: ["/projects/llm-agents/demo-1.jpg", "/projects/llm-agents/demo-2.jpg"],
      videos: ["/projects/llm-agents/demo-video.mp4"],
      poster: "/projects/llm-agents/poster-icml-2024.pdf"
    },
    links: {
      github: "https://github.com/mit-arclab/llm-space-agents",
      demo: "https://demo.arclab.mit.edu/llm-agents",
      paper: "https://doi.org/10.1038/example-2024"
    }
  },
  {
    id: "neural-control",
    title: "Neural Network Architectures for Robotic Control",
    shortDescription: "Comparative study of neural architectures for robotic control systems",
    fullDescription: "A comprehensive research project comparing different neural network architectures for robotic control tasks, with particular focus on sample efficiency, real-world performance, and adaptation to new environments.",
    status: "completed",
    startDate: "2022-01",
    endDate: "2023-12",
    technologies: ["Python", "PyTorch", "ROS", "Gazebo", "MATLAB"],
    team: ["Alejandro Carrasco", "Dr. Lisa Chen", "Robert Williams"],
    funding: "NSF Robotics Grant",
    publications: ["pub-2023-002"],
    media: {
      images: ["/projects/neural-control/setup-1.jpg", "/projects/neural-control/results.jpg"],
      videos: ["/projects/neural-control/comparison-demo.mp4"]
    },
    links: {
      github: "https://github.com/mit-arclab/neural-control-comparison",
      paper: "https://doi.org/10.1109/TRO.2023.example"
    }
  }
];

// Helper functions for data manipulation
export function getPublicationsByYear() {
  return publications.reduce((acc, pub) => {
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

export function getFeaturedPublications() {
  return publications.filter(pub => pub.featured);
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