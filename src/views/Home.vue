<script>
import WhiteSquaresBackground from '@/assets/images/white-squares-background.jpg';
import avatarImage from '@/assets/images/avatar_sample.jpg';
import MITLogo from '@/assets/logos/MIT_logo.svg';
import { Carousel } from 'flowbite';
import { onMounted } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
import StackCard from '@/components/StackCard.vue';
import LogoCard from '@/components/LogoCard.vue';

export default {
    name: 'Home',
    components: {
        ProjectCard,
        StackCard,
        LogoCard
    },
    data() {
      return {
        background: WhiteSquaresBackground,
        avatar: avatarImage,
        socialLinks: [
          { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/yourusername', color: 'text-[#0077B5]' },
          { name: 'GitHub', icon: 'github', url: 'https://github.com/yourusername', color: 'text-gray-900' },
          { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/yourusername', color: 'text-[#1DA1F2]' },
          { name: 'Telegram', icon: 'telegram', url: 'https://t.me/yourusername', color: 'text-[#0088cc]' }
        ],
        skills: {
          ai_research: [
            { name: 'Large Language Models', level: 95, icon: '🧠' },
            { name: 'Autonomous Agents', level: 92, icon: '🤖' },
            { name: 'Reinforcement Learning', level: 90, icon: '🎯' },
            { name: 'Neural Networks', level: 88, icon: '🔮' }
          ],
          robotics: [
            { name: 'Robot Control Systems', level: 90, icon: '🦾' },
            { name: 'Computer Vision', level: 88, icon: '👁️' },
            { name: 'Sensor Integration', level: 85, icon: '📡' },
            { name: 'Motion Planning', level: 87, icon: '🎮' }
          ],
          programming: [
            { name: 'Python', level: 95, icon: '🐍' },
            { name: 'PyTorch/TensorFlow', level: 92, icon: '⚡' },
            { name: 'ROS', level: 88, icon: '🔄' },
            { name: 'C++', level: 85, icon: '⚙️' }
          ],
          tools: [
            { name: 'Git/GitHub', level: 90, icon: '📚' },
            { name: 'Docker', level: 88, icon: '🐳' },
            { name: 'Linux/Unix', level: 92, icon: '💻' },
            { name: 'Cloud Computing', level: 85, icon: '☁️' }
          ]
        },
        projects: [
          {
            title: 'LLM-Powered Autonomous Agents',
            description: 'Research on integrating Large Language Models with autonomous agents for enhanced decision-making and task execution capabilities.',
            image: '/projects/llm-agents-thumb.jpg',
            video: '/projects/llm-agents-demo.mp4',
            technologies: [
              { name: 'LLMs', class: 'bg-blue-100 text-blue-800' },
              { name: 'Autonomous Agents', class: 'bg-purple-100 text-purple-800' },
              { name: 'Python', class: 'bg-green-100 text-green-800' }
            ],
            link: 'https://github.com/yourusername/llm-agents',
            date: '2023 - Present'
          },
          {
            title: 'Robotic Control with Neural Networks',
            description: 'Implementation of advanced neural network architectures for improved robotic control and motion planning.',
            image: '/projects/robotics-thumb.jpg',
            video: '/projects/robotics-demo.mp4',
            technologies: [
              { name: 'Robotics', class: 'bg-red-100 text-red-800' },
              { name: 'Neural Networks', class: 'bg-yellow-100 text-yellow-800' },
              { name: 'ROS', class: 'bg-indigo-100 text-indigo-800' }
            ],
            link: 'https://github.com/yourusername/robotic-control',
            date: '2022 - 2023'
          },
          {
            title: 'Multi-Agent Learning Systems',
            description: 'Development of multi-agent systems using reinforcement learning for collaborative problem-solving.',
            image: '/projects/multi-agent-thumb.jpg',
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
            description: 'Contributing to and maintaining an open-source framework for training and deploying large language models.',
            image: '/projects/llm-framework-thumb.jpg',
            video: '/projects/llm-framework-demo.mp4',
            technologies: [
              { name: 'Open Source', class: 'bg-orange-100 text-orange-800' },
              { name: 'LLM', class: 'bg-teal-100 text-teal-800' },
              { name: 'C++', class: 'bg-pink-100 text-pink-800' }
            ],
            link: 'https://github.com/yourusername/llm-framework',
            date: '2022 - Present'
          }
        ],
        stackItems: {
          ai: [
            {
              name: 'Large Language Models',
              logo: '/logos/llm-logo.svg',
              proficiency: 95,
              description: 'Development and fine-tuning of LLMs',
              category: 'AI',
              link: 'https://your-llm-project.com'
            },
            {
              name: 'PyTorch',
              logo: '/logos/pytorch-logo.svg',
              proficiency: 90,
              description: 'Deep learning framework',
              category: 'AI',
              link: 'https://pytorch.org'
            },
            {
              name: 'TensorFlow',
              logo: '/logos/tensorflow-logo.svg',
              proficiency: 88,
              description: 'Machine learning platform',
              category: 'AI',
              link: 'https://tensorflow.org'
            },
            {
              name: 'Hugging Face',
              logo: '/logos/huggingface-logo.svg',
              proficiency: 92,
              description: 'State-of-the-art NLP',
              category: 'AI',
              link: 'https://huggingface.co'
            }
          ],
          software: [
            {
              name: 'Python',
              logo: '/logos/python-logo.svg',
              proficiency: 95,
              description: 'Primary programming language',
              category: 'Software',
              link: 'https://python.org'
            },
            {
              name: 'C++',
              logo: '/logos/cpp-logo.svg',
              proficiency: 85,
              description: 'Systems programming',
              category: 'Software',
              link: 'https://isocpp.org'
            },
            {
              name: 'ROS',
              logo: '/logos/ros-logo.svg',
              proficiency: 88,
              description: 'Robot Operating System',
              category: 'Software',
              link: 'https://ros.org'
            },
            {
              name: 'Docker',
              logo: '/logos/docker-logo.svg',
              proficiency: 87,
              description: 'Containerization platform',
              category: 'Software',
              link: 'https://docker.com'
            }
          ],
          institutions: [
            {
              name: 'MIT',
              logo: '/logos/mit-logo.svg',
              proficiency: 100,
              description: 'PhD Student at MIT',
              category: 'Institution',
              link: 'https://mit.edu'
            },
            {
              name: 'UPM',
              logo: '/logos/upm-logo.svg',
              proficiency: 100,
              description: 'Software Engineering',
              category: 'Institution',
              link: 'https://www.upm.es'
            }
          ]
        },
        institutions: [
          {
            name: 'MIT',
            logo: MITLogo,
            link: 'https://mit.edu'
          },
          {
            name: 'UPM',
            logo: '/logos/upm-logo.svg',
            link: 'https://www.upm.es'
          }
        ]
      }
    },
    mounted() {
      this.initParticleNetwork();
    },
    methods: {
        initParticleNetwork() {
            // We'll add particle network animation here if needed
        },
        scrollToSection(sectionId) {
            const sectionElement = this.$refs[sectionId];
            if (sectionElement) {
            sectionElement.scrollIntoView({
                behavior: 'smooth',
            });
            }
        },
    },
};
</script>

<template>
    <div class="min-h-screen bg-white">
        <!-- Hero Section -->
        <div class="relative min-h-screen flex items-center">
            <!-- Particle Network Background -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="particles-network"></div>
            </div>

            <!-- Content -->
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Content -->
                    <div class="space-y-6">
                        <h1 class="text-5xl lg:text-6xl font-bold text-navy-900">
                            Hi There,
                            <div class="mt-2">I'm Alejandro <span class="text-blue-600">Carrasco</span></div>
                        </h1>
                        <p class="text-2xl text-gray-700">
                            PhD Candidate <span class="text-red-600 font-semibold">at MIT</span>
                        </p>
                        <p class="text-lg text-gray-600 max-w-2xl">
                            Researcher in Large Language Models, Autonomous Agents, and Robotics
                        </p>
                        
                        <!-- Social Links -->
                        <div class="flex space-x-4 mt-8">
                            <a v-for="link in socialLinks" 
                               :key="link.name"
                               :href="link.url"
                               :title="link.name"
                               target="_blank"
                               class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-transform hover:scale-110"
                               :class="link.color">
                                <i :class="'fab fa-' + link.icon" class="text-2xl"></i>
                            </a>
                        </div>

                        <!-- CTA Button -->
                        <div class="mt-8">
                            <a href="#about" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                                About Me
                                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </div>

                        <!-- Institutions -->
                        <div class="mt-16 bg-gray-50 p-6 rounded-xl">
                            <h3 class="text-xl font-semibold text-gray-800 mb-6">Academic Institutions</h3>
                            <div class="grid grid-cols-2 gap-8 max-w-sm">
                                <LogoCard 
                                    v-for="institution in institutions"
                                    :key="institution.name"
                                    :item="institution"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Right Content - Avatar -->
                    <div class="relative">
                        <div class="w-72 h-72 mx-auto lg:w-96 lg:h-96 rounded-full bg-yellow-400 overflow-hidden">
                            <img :src="avatar" alt="Alejandro Carrasco" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rest of the content -->
        <div class="bg-cover bg-center" 
             :style="{ backgroundImage: `url(${background})` }">
            <div class="relative bg-white bg-center px-8 pt-20 pb-40 shadow-xl ring-1 ring-chromatic mx-auto max-w-6xl squared-lg sm:px-20">
                <img :src="WhiteSquaresBackground" alt="" class="absolute" width="1080" />
                <div class="home-page">
                    <!-- Navigation Menu -->
                    <nav>
                    <ul class="flex justify-center mt-4">
                        <li>
                        <button class="text-black font-bold py-2 px-4 mr-2 rounded hover:text-blue-600 transition-colors" @click="scrollToSection('section1')">
                            About
                        </button>
                        </li>
                        <li>
                        <button class="text-black font-bold py-2 px-4 mr-2 rounded hover:text-blue-600 transition-colors" @click="scrollToSection('section2')">
                            Experience
                        </button>
                        </li>
                        <li>
                        <button class="text-black font-bold py-2 px-4 mr-2 rounded hover:text-blue-600 transition-colors" @click="scrollToSection('section3')">
                            Skills
                        </button>
                        </li>
                        <li>
                        <button class="text-black font-bold py-2 px-4 rounded hover:text-blue-600 transition-colors" @click="scrollToSection('section4')">
                            Projects
                        </button>
                        </li>
                    </ul>
                    </nav>

                    <!-- Content Section 1 -->
                    <section ref="section1" id="section1">
                    <!-- Content for Section 1 -->
                    <figure>
                        <img :src="avatar" alt="Your Presentation Image" class="my-5 mx-auto rounded-full w-48 h-48 object-cover" />
                        <figcaption>
                        <div class="mb-4">
                            <p class="text-2xl text-gray-600">AI Researcher | LLM Specialist | Robotics Engineer</p>
                            <p class="text-xl text-blue-600 mt-2">Incoming PhD Student at MIT</p>
                        </div>
                        </figcaption>
                    </figure>
                    </section>
                    <!-- Content Section 2 -->
                    <section ref="section2" id="section2" class="py-12">
                    <!-- Content for Section 2 -->
                    <div class="max-w-3xl mx-auto">
                        <h1 class="text-4xl text-gray-800 font-bold mb-6">I'm Alejandro Carrasco</h1>
                        <p class="text-xl text-gray-700 leading-relaxed mb-6">
                            I'm an AI researcher and software engineer specializing in Large Language Models, autonomous agents, and robotics. 
                            My research focuses on advancing the capabilities of AI systems through the integration of LLMs with robotic applications 
                            and autonomous agent architectures.
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 class="text-lg font-semibold mb-3">Research Interests</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Large Language Models
                                    </li>
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Autonomous Agents
                                    </li>
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Robotics & Control Systems
                                    </li>
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Multi-Agent Systems
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 class="text-lg font-semibold mb-3">Academic Background</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Incoming PhD Student at MIT
                                    </li>
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Software Engineering, UPM
                                    </li>
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Published Researcher
                                    </li>
                                    <li class="flex items-center">
                                        <span class="text-blue-600 mr-2">▹</span>
                                        Open Source Contributor
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </section>
                    <!-- Content Section 3 -->
                    <section ref="section3" id="section3" class="py-16">     
                        <div class="bg-white">
                            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                                <h2 class="text-3xl font-bold text-center mb-16">Skills & Expertise</h2>
                                
                                <!-- AI & Machine Learning -->
                                <div class="mb-16">
                                    <h3 class="text-2xl font-semibold mb-8 flex items-center">
                                        <span class="text-3xl mr-3">🧠</span>
                                        AI & Machine Learning
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        <StackCard 
                                            v-for="item in stackItems.ai"
                                            :key="item.name"
                                            :item="item"
                                        />
                                    </div>
                                </div>

                                <!-- Software Development -->
                                <div class="mb-16">
                                    <h3 class="text-2xl font-semibold mb-8 flex items-center">
                                        <span class="text-3xl mr-3">💻</span>
                                        Software Development
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        <StackCard 
                                            v-for="item in stackItems.software"
                                            :key="item.name"
                                            :item="item"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Projects Section -->
                    <section ref="section4" id="section4" class="py-16 bg-gray-50">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 class="text-3xl font-bold text-center mb-12">Featured Research & Projects</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ProjectCard 
                                  v-for="project in projects" 
                                  :key="project.title" 
                                  :project="project"
                                />
                            </div>

                            <!-- Publications Section -->
                            <div class="mt-16">
                                <h3 class="text-2xl font-semibold mb-8 text-center">Recent Publications</h3>
                                <div class="space-y-6">
                                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <h4 class="text-lg font-semibold mb-2">Title of Your Research Paper</h4>
                                        <p class="text-gray-600 mb-3">Brief description of the research paper and its contributions to the field.</p>
                                        <div class="flex justify-between items-center">
                                            <span class="text-sm text-gray-500">Published in Conference/Journal Name</span>
                                            <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Read Paper →</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Contact Section -->
                    <section ref="section5" id="section5" class="py-16 bg-gray-50">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 class="text-3xl font-bold text-center mb-12">Get In Touch</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <!-- Contact Info -->
                                <div class="space-y-6">
                                    <h3 class="text-2xl font-semibold">Let's Connect</h3>
                                    <p class="text-gray-600">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
                                    <div class="space-y-4">
                                        <div class="flex items-center space-x-3">
                                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <a href="mailto:your.email@example.com" class="text-blue-600 hover:text-blue-800">your.email@example.com</a>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span class="text-gray-600">Madrid, Spain</span>
                                        </div>
                                    </div>
                                    <!-- Social Links -->
                                    <div class="flex space-x-4 mt-6">
                                        <a href="https://github.com/yourusername" target="_blank" class="text-gray-600 hover:text-blue-600">
                                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                                            </svg>
                                        </a>
                                        <a href="https://linkedin.com/in/yourusername" target="_blank" class="text-gray-600 hover:text-blue-600">
                                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a href="https://twitter.com/yourusername" target="_blank" class="text-gray-600 hover:text-blue-600">
                                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <!-- Contact Form -->
                                <div class="bg-white p-6 rounded-lg shadow-md">
                                    <form class="space-y-6">
                                        <div>
                                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                        </div>
                                        <div>
                                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                        </div>
                                        <div>
                                            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                                            <textarea id="message" name="message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                                        </div>
                                        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Particle network animation styles */
.particles-network {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #f8fafc 25%, transparent 25%),
                linear-gradient(-45deg, #f8fafc 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #f8fafc 75%),
                linear-gradient(-45deg, transparent 75%, #f8fafc 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

/* Add smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

/* Existing styles */
.home-page {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Fade animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Skill bar animations */
.skill-bar-enter-active {
  transition: width 1s ease-out;
}

.skill-bar-enter-from {
  width: 0;
}

/* Hover effects */
.project-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-button {
  transition: all 0.3s ease;
}

.nav-button:hover {
  transform: translateY(-2px);
  color: #3b82f6;
}

.vue {
  margin-left: 0.3em;
}

.home-button {
  padding: 8px;
  color: #d6cfbe;
  cursor: pointer;
  font-size: 1.5em;
  margin-bottom: 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.home-button:hover {
  background-color: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}
</style>
