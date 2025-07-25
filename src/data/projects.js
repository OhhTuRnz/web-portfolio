// Enhanced project data structure with hover-to-play GIF support and YouTube thumbnails
export const projects = [
  {
    id: "beavr-teleoperation",
    title: "BeaVR - VR Teleoperation System",
    description: "Advanced virtual reality teleoperation system for robotic control with immersive haptic feedback and intuitive gesture-based interfaces.",
    shortDescription: "VR-based teleoperation system with haptic feedback for robotic control",
    technologies: ["Unity", "C#", "VR", "Haptic Devices", "ROS", "Real-time Systems"],
    category: "research",
    status: "active",
    startDate: "2023-03",
    team: ["Alejandro Carrasco", "VR Research Team"],
    funding: "MIT ARC Lab",
    media: {
      type: "image", // Keep as image for now since no BeaVR GIF yet
      url: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
      fallback: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/beavr-teleoperation",
      demo: "https://demo.arclab.mit.edu/beavr"
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
      url: "/src/assets/gifs/KSPDG-2024-Embed.gif", // Your actual GIF file
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
      url: "/src/assets/gifs/KSPDG 2025 - Demo.gif", // Your actual GIF file (with space in name)
      fallback: "https://img.youtube.com/vi/UNhrkZW-eJc/maxresdefault.jpg" // YouTube thumbnail as static image
    },
    links: {
      github: "https://github.com/acarrasco/kspdg-2025",
      demo: "https://www.youtube.com/watch?v=UNhrkZW-eJc"
    },
    featured: true
  },
  {
    id: "mobile-robotics-app",
    title: "Mobile Robotics Control App",
    description: "Cross-platform mobile application for controlling and monitoring robotic systems remotely. Features real-time telemetry, video streaming, and intuitive touch-based control interfaces.",
    shortDescription: "Mobile app for remote robotics control and monitoring",
    technologies: ["React Native", "JavaScript", "WebRTC", "ROS Bridge", "Mobile Development"],
    category: "personal",
    status: "active",
    startDate: "2023-08",
    team: ["Alejandro Carrasco"],
    media: {
      type: "image", // Keep as image for now since no mobile app GIF yet
      url: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      fallback: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/acarrasco/mobile-robotics-app",
      demo: "https://play.google.com/store/apps/details?id=com.carrasco.robotics"
    }
  }
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