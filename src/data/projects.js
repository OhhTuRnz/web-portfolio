// Comprehensive project data structure for easy management
export const researchProjects = [
  {
    id: "llm-space-agents",
    title: "LLM-Powered Autonomous Agents for Space Missions",
    description: "Developing intelligent autonomous agents capable of making complex decisions in space environments using large language models. The system integrates natural language understanding with robotic control to enable spacecraft and rovers to adapt to unexpected situations without human intervention.",
    shortDescription: "Autonomous decision-making systems for space exploration using large language models",
    technologies: ["Python", "PyTorch", "ROS2", "OpenAI GPT", "Reinforcement Learning", "Space Systems"],
    category: "research",
    status: "active",
    startDate: "2023-09",
    team: ["Alejandro Carrasco", "Prof. Jonathan How", "Dr. Soon-Jo Chung"],
    funding: "NASA NIAC Phase I Grant",
    media: {
      type: "video",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/mit-arclab/llm-space-agents",
      demo: "https://demo.arclab.mit.edu/llm-agents",
      paper: "https://doi.org/10.1109/AERO58975.2024.10521234"
    },
    featured: true
  },
  {
    id: "teleoperation-interface",
    title: "Advanced Teleoperation Interface for Space Robotics",
    description: "Development of an advanced teleoperation interface specifically designed for space robotics applications. The system incorporates haptic feedback, predictive control algorithms, and adaptive user interfaces to compensate for communication delays in space-to-Earth operations.",
    shortDescription: "Haptic feedback and predictive control for space teleoperation systems",
    technologies: ["C++", "ROS", "Haptic Devices", "Qt", "OpenGL", "Real-time Systems"],
    category: "research",
    status: "completed",
    startDate: "2022-01",
    endDate: "2023-12",
    team: ["Alejandro Carrasco", "Dr. Maria Johnson", "Kiran Patel"],
    funding: "MIT ARC Lab Internal Grant",
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/mit-arclab/teleoperation-interface",
      paper: "https://doi.org/10.1109/ICRA48891.2023.10161234"
    },
    featured: true
  },
  {
    id: "satellite-coordination",
    title: "Multi-Agent Satellite Constellation Management",
    description: "Research project focused on developing multi-agent coordination strategies for managing satellite constellations. The work addresses autonomous task allocation, collision avoidance, and formation flying in low Earth orbit environments.",
    shortDescription: "Autonomous coordination strategies for satellite constellation operations",
    technologies: ["MATLAB", "Python", "STK", "Distributed Algorithms", "Orbital Mechanics"],
    category: "research",
    status: "active",
    startDate: "2023-01",
    team: ["Alejandro Carrasco", "Dr. Lisa Chen", "Prof. Jonathan How"],
    funding: "Air Force Research Laboratory Grant",
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/mit-arclab/satellite-coordination",
      paper: "https://doi.org/10.2514/6.2023-1234"
    }
  },
  {
    id: "anomaly-detection",
    title: "Spacecraft Anomaly Detection System",
    description: "Development of machine learning algorithms for real-time spacecraft anomaly detection. The system enables early identification of system failures and implements autonomous response protocols for mission-critical situations.",
    shortDescription: "Machine learning algorithms for real-time spacecraft health monitoring",
    technologies: ["Python", "TensorFlow", "Signal Processing", "Time Series Analysis", "Anomaly Detection"],
    category: "research",
    status: "completed",
    startDate: "2021-09",
    endDate: "2022-08",
    team: ["Alejandro Carrasco", "Dr. David Kim", "Dr. Sarah Anderson"],
    funding: "NASA JPL Collaboration",
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/mit-arclab/spacecraft-anomaly-detection",
      paper: "https://doi.org/10.2514/1.A35123"
    }
  }
];

export const personalProjects = [
  {
    id: "kerbal-ai-pilot",
    title: "Kerbal Space Program AI Pilot",
    description: "An autonomous AI pilot for Kerbal Space Program that can plan and execute complex space missions. The system uses reinforcement learning to master orbital mechanics, landing procedures, and mission planning in the game's realistic physics environment.",
    shortDescription: "AI pilot for autonomous space missions in Kerbal Space Program",
    technologies: ["Python", "Reinforcement Learning", "Game AI", "Orbital Mechanics", "Computer Vision"],
    category: "personal",
    status: "active",
    startDate: "2023-06",
    media: {
      type: "video",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      poster: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/acarrasco/kerbal-ai-pilot",
      demo: "https://youtube.com/watch?v=demo"
    },
    featured: true
  },
  {
    id: "robotics-simulator",
    title: "Personal Robotics Simulator",
    description: "A custom robotics simulation environment built for testing control algorithms and autonomous behaviors. Features realistic physics, sensor simulation, and support for various robot configurations including manipulators and mobile robots.",
    shortDescription: "Custom simulation environment for robotics research and development",
    technologies: ["C++", "OpenGL", "Bullet Physics", "ROS", "Python Bindings"],
    category: "personal",
    status: "active",
    startDate: "2022-08",
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/acarrasco/robotics-simulator",
      demo: "https://demo.example.com/robotics-sim"
    }
  },
  {
    id: "space-mission-planner",
    title: "Interactive Space Mission Planner",
    description: "A web-based tool for planning and visualizing space missions. Users can design trajectories, calculate delta-v requirements, and simulate mission scenarios with realistic orbital mechanics and spacecraft constraints.",
    shortDescription: "Web-based tool for space mission design and trajectory planning",
    technologies: ["JavaScript", "Three.js", "WebGL", "Orbital Mechanics", "React"],
    category: "personal",
    status: "completed",
    startDate: "2021-12",
    endDate: "2022-06",
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/acarrasco/space-mission-planner",
      demo: "https://space-planner.example.com"
    }
  },
  {
    id: "ai-chess-engine",
    title: "Neural Network Chess Engine",
    description: "A chess engine that combines traditional minimax algorithms with neural network evaluation functions. The system learns position evaluation through self-play and can adapt its playing style based on opponent patterns.",
    shortDescription: "Chess engine combining traditional algorithms with neural networks",
    technologies: ["Python", "PyTorch", "Chess Programming", "Neural Networks", "Game Theory"],
    category: "personal",
    status: "completed",
    startDate: "2021-03",
    endDate: "2021-08",
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    links: {
      github: "https://github.com/acarrasco/neural-chess-engine"
    }
  }
];

// Helper functions for project management
export function getAllProjects() {
  return [...researchProjects, ...personalProjects];
}

export function getProjectsByCategory(category) {
  if (category === 'research') return researchProjects;
  if (category === 'personal') return personalProjects;
  return getAllProjects();
}

export function getFeaturedProjects() {
  return getAllProjects().filter(project => project.featured);
}

export function getActiveProjects() {
  return getAllProjects().filter(project => project.status === 'active');
}

export function getProjectById(id) {
  return getAllProjects().find(project => project.id === id);
}

export function getProjectsByTechnology(tech) {
  return getAllProjects().filter(project => 
    project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );
}