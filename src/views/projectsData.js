// src/views/projectsData.js

// We will move the projects array from Home.vue here.
// For now, I'll create it with the structure. You'll need to move your actual project data.

export const projects = [
  {
    title: 'LLM-Powered Autonomous Agents',
    description: 'Research on integrating Large Language Models with autonomous agents for enhanced decision-making and task execution capabilities. This project explores advanced techniques for few-shot learning in complex environments and aims to develop agents that can reason, plan, and act with minimal human supervision. Key contributions include a novel architecture for integrating symbolic reasoning with neural networks and extensive empirical validation across multiple benchmarks.',
    image: '/projects/llm-agents-thumb.jpg', // Ensure these paths are correct from the public folder
    video: '/projects/llm-agents-demo.mp4',
    technologies: [
      { name: 'LLMs', class: 'bg-blue-100 text-blue-800' },
      { name: 'Autonomous Agents', class: 'bg-purple-100 text-purple-800' },
      { name: 'Python', class: 'bg-green-100 text-green-800' },
      { name: 'Reinforcement Learning', class: 'bg-red-100 text-red-800' }
    ],
    link: 'https://github.com/yourusername/llm-agents',
    date: '2023 - Present',
    // You can add more fields: challenges, solutions, detailed_description_html, etc.
  },
  {
    title: 'Robotic Control with Neural Networks',
    description: 'Implementation of advanced neural network architectures for improved robotic control and motion planning. This work focuses on sample efficiency and sim-to-real transfer, enabling robots to learn complex manipulation tasks in simulation and deploy them effectively in the real world. We introduced a new curriculum learning strategy that significantly speeds up training.',
    image: '/projects/robotics-thumb.jpg',
    video: '/projects/robotics-demo.mp4',
    technologies: [
      { name: 'Robotics', class: 'bg-red-100 text-red-800' },
      { name: 'Neural Networks', class: 'bg-yellow-100 text-yellow-800' },
      { name: 'ROS', class: 'bg-indigo-100 text-indigo-800' },
      { name: 'PyTorch', class: 'bg-purple-100 text-purple-800' }
    ],
    link: 'https://github.com/yourusername/robotic-control',
    date: '2022 - 2023'
  },
  {
    title: 'Multi-Agent Learning Systems',
    description: 'Development of multi-agent systems using reinforcement learning for collaborative problem-solving. The project investigated emergent communication and coordination strategies in decentralized teams of agents, proposing a new graph-based attention mechanism for inter-agent communication.',
    image: '/projects/multi-agent-thumb.jpg',
    // No video for this one in original data
    technologies: [
      { name: 'Multi-Agent', class: 'bg-green-100 text-green-800' },
      { name: 'RL', class: 'bg-blue-100 text-blue-800' },
      { name: 'PyTorch', class: 'bg-purple-100 text-purple-800' }
    ],
    link: 'https://github.com/yourusername/multi-agent-learning',
    date: '2023'
  },
  {
    title: 'Open Source LLM Framework',
    description: 'Contributing to and maintaining an open-source framework for training and deploying large language models. My contributions focused on optimizing memory usage during training and implementing new attention mechanisms for improved performance on long-sequence tasks. I also helped in developing community documentation and tutorials.',
    image: '/projects/llm-framework-thumb.jpg',
    video: '/projects/llm-framework-demo.mp4',
    technologies: [
      { name: 'Open Source', class: 'bg-orange-100 text-orange-800' },
      { name: 'LLM', class: 'bg-teal-100 text-teal-800' },
      { name: 'C++', class: 'bg-pink-100 text-pink-800' },
      { name: 'Python', class: 'bg-green-100 text-green-800' }
    ],
    link: 'https://github.com/yourusername/llm-framework',
    date: '2022 - Present'
  }
];

export function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
} 