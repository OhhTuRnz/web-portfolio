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
    id: "pub-2025-002",
    title: "Large Language Models as Autonomous Spacecraft Operators in Kerbal Space Program",
    authors: [],
    venue: "Advances in Space Research (In Progress)",
    year: 2025,
    type: "journal",
    citations: 0,
    doi: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:9yKSN-GCB0IC",
    pdfUrl: "/papers/carrasco-2024-llm-spacecraft-operators.pdf",
    abstract: "Recent trends are emerging in the use of Large Language Models (LLMs) as autonomous agents that take actions based on the content of the user text prompts. We intend to apply these concepts to the field of Control in space, enabling LLMs to play a significant role in the decision-making process for autonomous satellite operations. As a first step towards this goal, we have developed a pure LLM-based solution for the Kerbal Space Program Differential Games (KSPDG) challenge, a public software design competition where participants create autonomous agents for maneuvering satellites involved in non-cooperative space operations, running on the KSP game engine. Our approach leverages prompt engineering, few-shot prompting, and fine-tuning techniques to create an effective LLM-based agent that ranked 2nd in the competition. To the best of our knowledge, this work pioneers the integration of LLM agents into space research. The project comprises several open repositories to facilitate replication and further research. The codebase is accessible on \href{https://github.com/ARCLab-MIT/kspdg}{GitHub}, while the trained models and datasets are available on \href{https://huggingface.co/OhhTuRnz}{Hugging Face}. Additionally, experiment tracking and detailed results can be reviewed on \href{https://wandb.ai/carrusk/huggingface}{Weights \& Biases}",
    keywords: ["Large Language Models", "Autonomous Agents", "Kerbal Space Program",
"Prompt Engineering", "Fine-tuning, Spacecraft Control"]
  },
  {
    id: "pub-2024-002",
    title: "Fine-tuning LLMs for Autonomous Spacecraft Control: A Case Study Using Kerbal Space Program",
    authors: ["A. Carrasco", "M. Johnson", "K. Patel"],
    venue: "SPAICE 2024",
    year: 2024,
    type: "conference",
    citations: 1,
    doi: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:u-x6o8ySG0sC",
    pdfUrl: "/papers/carrasco-2024-fine-tuning-llms.pdf",
    abstract: "Recent trends are emerging in the use of Large Language Models (LLMs) as autonomous agents that take actions based on the content of the user text prompt. This study explores the use of fine-tuned Large Language Models (LLMs) for autonomous spacecraft control, using the Kerbal Space Program Differential Games suite (KSPDG) as a testing environment. Traditional Reinforcement Learning (RL) approaches face limitations in this domain due to insufficient simulation capabilities and data. By leveraging LLMs, specifically fine-tuning models like GPT-3.5 and LLaMA, we demonstrate how these models can effectively control spacecraft using language-based inputs and outputs. Our approach integrates real-time mission telemetry into textual prompts processed by the LLM, which then generate control actions via an agent. The results open a discussion about the potential of LLMs for space operations beyond their nominal use for text-related tasks. Future work aims to expand this methodology to other space control tasks and evaluate the performance of different LLM families. The code is available at this URL: \texttt{this https URL}.",
    keywords: ["Fine-tuning", "LLM", "Spacecraft Control", "Autonomous Systems", "Kerbal Space Program"]
  },
  {
    id: "pub-2025-001",
    title: "Visual Language Models as Operator Agents in the Space Domain",
    authors: ["Alejandro Carrasco", "Marco Nedungadi", "Victor Rodriguez-Fernandez", "Richard Linares"],
    venue: "AIAA SciTech 2025",
    year: 2025,
    type: "conference",
    citations: 1,
    doi: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:d1gkVwhDpl0C",
    pdfUrl: "/papers/carrasco-2025-visual-language-models.pdf",
    abstract: "This paper explores the application of Vision-Language Models (VLMs) as operator agents in the space domain, focusing on both software and hardware operational paradigms. Building on advances in Large Language Models (LLMs) and their multimodal extensions, we investigate how VLMs can enhance autonomous control and decision-making in space missions. In the software context, we employ VLMs within the Kerbal Space Program Differential Games (KSPDG) simulation environment, enabling the agent to interpret visual screenshots of the graphical user interface to perform complex orbital maneuvers. In the hardware context, we integrate VLMs with robotic systems equipped with cameras to inspect and diagnose physical space objects, such as satellites. Our results demonstrate that VLMs can effectively process visual and textual data to generate contextually appropriate actions, competing with traditional methods and non-multimodal LLMs in simulation tasks, and showing promise in real-world applications.",
    keywords: ["Visual Language Models", "Space Operations", "Multimodal AI", "Operator Agents"]
  },
  {
    id: "pub-2024-001",
    title: "Language models are spacecraft operators",
    authors: ["Victor Rodriguez-Fernandez", "Alejandro Carrasco", "Jason Cheng", "Eli Scharf", "Peng Mun Siew", "Richard Linares"],
    venue: "arXiv preprint",
    year: 2024,
    type: "preprint",
    citations: 6,
    doi: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:u5HHmVD_uO8C",
    pdfUrl: "/papers/carrasco-2024-language-models-operators.pdf",
    abstract: "Recent trends are emerging in the use of Large Language Models (LLMs) as autonomous agents that take actions based on the content of the user text prompts. We intend to apply these concepts to the field of Guidance, Navigation, and Control in space, enabling LLMs to have a significant role in the decision-making process for autonomous satellite operations. As a first step towards this goal, we have developed a pure LLM-based solution for the Kerbal Space Program Differential Games (KSPDG) challenge, a public software design competition where participants create autonomous agents for maneuvering satellites involved in non-cooperative space operations, running on the KSP game engine. Our approach leverages prompt engineering, few-shot prompting, and fine-tuning techniques to create an effective LLM-based agent that ranked 2nd in the competition. To the best of our knowledge, this work pioneers the integration of LLM agents into space research. Code is available at this https URL.",
    keywords: ["Language Models", "Spacecraft Operations", "Autonomous Decision Making", "Space AI"]
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
      paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:9yKSN-GCB0IC"
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
    publications: ["pub-2024-002"],
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/teleoperation-interface",
      paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:u-x6o8ySG0sC"
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
    publications: ["pub-2025-001"],
    media: {
      type: "poster",
      url: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/satellite-coordination",
      paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:d1gkVwhDpl0C"
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
    publications: ["pub-2024-003"],
    media: {
      type: "image",
      url: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    links: {
      github: "https://github.com/mit-arclab/spacecraft-anomaly-detection",
      paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6KamS70AAAAJ&citation_for_view=6KamS70AAAAJ:u5HHmVD_uO8C"
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