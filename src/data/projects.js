// Enhanced project data structure with hover-to-play GIF support and YouTube thumbnails
export const projects = [
  {
    id: "beavr-teleoperation",
    title: "BEAVR - Bimanual VR Teleoperation System",
    description: "Open-source, Bimanual, Multi-embodiment Virtual Reality (VR) Teleoperation system for Robots, designed to unify real-time control, data recording, and policy learning across heterogeneous robotic platforms. Features zero-copy streaming architecture achieving ≤35 ms latency and supports modular integration from 7-DoF manipulators to full-body humanoids.",
    shortDescription: "Bimanual, multi-Embodiment, Accessible VR Teleoperation for diverse robotic platforms",
    technologies: ["Python", "VR", "Meta Quest 3", "ROS", "Real-time Systems", "Computer Vision", "LeRobot", "PyTorch"],
    category: "research",
    status: "active",
    startDate: "2024-01",
    team: ["Alejandro Carrasco", "Alex Posadas-Nava", "Victor Rodriguez-Fernandez", "Richard Linares"],
    funding: "MIT ARC Lab",
    venue: "ICCR 2025, Kyoto",
    media: {
      type: "gif", // 🎉 Now using the actual BEAVR GIF!
      url: "/assets/gifs/BeaVR_intro_v1-ezgif.com-speed.gif",
      fallback: "/assets/images/BEAVR_figure.png" // BEAVR branded fallback image
    },
    links: {
      github: "https://github.com/ARCLab-MIT/BEAVR-Bot",
      website: "https://arclab-mit.github.io/beavr-landing/",
      paper: "https://arxiv.org/abs/2508.09606",
      datasets: "https://huggingface.co/collections/ARCLab-MIT/beavr-datasets",
      demo: "https://arclab-mit.github.io/beavr-landing/"
    },
    featured: true
  },
  {
    id: "kspdg-2024",
    title: "KSPDG 2024 Challenge - 2nd Place",
    description: "Autonomous spacecraft control system that achieved 2nd place in the Kerbal Space Program Differential Games Challenge 2024, featuring advanced AI decision-making for space missions.",
    shortDescription: "2nd place solution for KSPDG 2024 with autonomous spacecraft control",
    technologies: ["Python", "Reinforcement Learning", "Kerbal", "Autonomous Systems", "Game AI"],
    category: "research",
    status: "completed",
    startDate: "2024-01",
    endDate: "2024-12",
    team: ["Alejandro Carrasco"],
    media: {
      type: "gif", // 🎉 Hover-to-play GIF with YouTube thumbnail!
      url: "/assets/gifs/KSPDG-2024-Embed.gif", // Your actual GIF file
      fallback: "https://img.youtube.com/vi/ioy0TIyqa8w/maxresdefault.jpg" // YouTube thumbnail as static image
    },
    links: {
      github: "https://github.com/acarrasco/kspdg-2024",
      paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:9yKSN-GCB0IC",
      demo: "https://www.youtube.com/watch?v=ioy0TIyqa8w"
    },
    featured: true
  },
  {
    id: "kspdg-2025",
    title: "KSPDG 2025 Challenge - 2nd Place",
    description: "Enhanced autonomous spacecraft control system for the 2025 Kerbal Space Program Differential Games Challenge, incorporating improved AI algorithms and mission planning capabilities.",
    shortDescription: "2nd place solution for KSPDG 2025 with enhanced AI algorithms",
    technologies: ["Python", "Advanced RL", "Kerbal", "Mission Planning", "Neural Networks"],
    category: "research",
    status: "active",
    startDate: "2025-01",
    team: ["Alejandro Carrasco"],
    media: {
      type: "gif", // 🎉 Hover-to-play GIF with YouTube thumbnail!
      url: "/assets/gifs/KSPDG 2025 - Demo.gif", // Your actual GIF file (with space in name)
      fallback: "https://img.youtube.com/vi/UNhrkZW-eJc/maxresdefault.jpg" // YouTube thumbnail as static image
    },
    links: {
      github: "https://github.com/acarrasco/kspdg-2025",
      demo: "https://www.youtube.com/watch?v=UNhrkZW-eJc"
    },
    featured: true
  },
  {
    id: "copfinder-mobile-app",
    title: "CopFinder - Mobile Donut Shop Locator",
    description: "Real-time location tracking mobile application that shows the nearest donut shops around you as you move. Features interactive maps, shop ratings, favorite management, Firebase authentication, and Google Maps integration. Built with modern Android development practices including Room database, shared preferences, and dark mode support.",
    shortDescription: "Real-time donut shop locator with interactive maps and user favorites",
    technologies: ["Kotlin", "Android", "Firebase", "Google Maps", "Room Database", "OpenStreetMaps", "Glide"],
    category: "personal",
    status: "completed",
    startDate: "2024-01",
    endDate: "2024-04",
    team: ["Alejandro Carrasco", "Alvaro Tajuelo Gomez"],
    funding: "Universidad Politécnica de Madrid - Mobile App Development Course",
    media: {
      type: "image",
      url: "/assets/images/CopFinder_map.jpeg",
      fallback: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/OhhTuRnz/MAD_2024",
      demo: "https://github.com/OhhTuRnz/MAD_2024/releases"
    },
    featured: false
  },
];

// Helper functions for project management
export function getAllProjects() {
  return projects;
}

export function getProjectsByCategory(category) {
  if (category === 'research') return projects.filter(p => p.category === 'research');
  if (category === 'personal') return projects.filter(p => p.category === 'personal');
  return projects;
}

export function getFeaturedProjects() {
  return projects.filter(project => project.featured);
}

export function getActiveProjects() {
  return projects.filter(project => project.status === 'active');
}

export function getProjectById(id) {
  return projects.find(project => project.id === id);
}

export function getProjectsByTechnology(tech) {
  return projects.filter(project => 
    project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );
}