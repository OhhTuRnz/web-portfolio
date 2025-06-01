<script>
import avatarImage from '@/assets/images/carrusk_zen.png';
import MITLogo from '@/assets/logos/MIT_logo.svg';
import MITArcLabLogo from '@/assets/logos/mit-arclab-logo.jpg';
import UPMLogoPNG from '@/assets/logos/upm-logo.png';
import ETSISILogoPNG from '@/assets/logos/etsisi-logo.png';
import { onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue';
import TypewriterText from '@/components/TypewriterText.vue';
import { initFlowbite } from 'flowbite';
import { projects as importedProjects } from '@/views/projectsData.js';
import ProjectCard from '@/components/ProjectCard.vue';

// Lazy load only non-critical components
const LogoCard = defineAsyncComponent(() => import('@/components/LogoCard.vue'));
const SkillLogoCard = defineAsyncComponent(() => import('@/components/SkillLogoCard.vue'));

export default {
    name: 'Home',
    components: {
        ProjectCard,
        LogoCard,
        SkillLogoCard,
        TypewriterText
    },
    data() {
      // Freeze static data to prevent Vue reactivity overhead
      const frozenHeroLines = Object.freeze([
        Object.freeze({ text: "Hi There," }),
        Object.freeze({ text: "I'm Alejandro ", isNewLine: true, divClass: "mt-2" }), 
        Object.freeze({ text: "Carrasco", spanClass: "text-blue-600" })
      ]);
      
      const frozenPhdLines = Object.freeze([
        Object.freeze({ text: "Master's Student at " }),
        Object.freeze({ text: "MIT", spanClass: "text-red-600 font-semibold" })
      ]);
      
      const frozenSocialLinks = Object.freeze([
        Object.freeze({ name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/yourusername', color: 'text-[#0077B5]' }),
        Object.freeze({ name: 'GitHub', icon: 'github', url: 'https://github.com/yourusername', color: 'text-gray-900' }),
        Object.freeze({ name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/yourusername', color: 'text-[#1DA1F2]' }),
        Object.freeze({ name: 'Telegram', icon: 'telegram', url: 'https://t.me/yourusername', color: 'text-[#0088cc]' })
      ]);
      
      const frozenStackItems = Object.freeze({
        ai: Object.freeze([
          Object.freeze({ name: 'Large Language Models', logo: '/logos/llm-logo.svg' }),
          Object.freeze({ name: 'PyTorch', logo: '/logos/pytorch-logo.svg' }),
          Object.freeze({ name: 'TensorFlow', logo: '/logos/tensorflow-logo.svg' }),
          Object.freeze({ name: 'Hugging Face', logo: '/logos/huggingface-logo.svg' })
        ]),
        software: Object.freeze([
          Object.freeze({ name: 'Python', logo: '/logos/python-logo.svg' }),
          Object.freeze({ name: 'C++', logo: '/logos/cpp-logo.svg' }),
          Object.freeze({ name: 'ROS', logo: '/logos/ros-logo.svg' }),
          Object.freeze({ name: 'Docker', logo: '/logos/docker-logo.svg' })
        ])
      });
      
      const frozenInstitutions = Object.freeze([
        Object.freeze({ name: 'MIT', logo: MITLogo, link: 'https://mit.edu', shape: 'square' }),
        Object.freeze({ name: 'MIT ArcLab', logo: MITArcLabLogo, link: 'https://arclab.mit.edu', shape: 'square' }),
        Object.freeze({ name: 'UPM', logo: UPMLogoPNG, link: 'https://www.upm.es', shape: 'square' }),
        Object.freeze({ name: 'ETSIINF', logo: ETSISILogoPNG, link: 'https://www.etsisi.upm.es/', shape: 'square' })
      ]);

      const frozenProjects = Object.freeze(importedProjects.map(project => Object.freeze(project)));

      return {
        avatar: avatarImage,
        heroHeadingLines: frozenHeroLines,
        phdTitleLines: frozenPhdLines,
        heroMainTitleAnimationDuration: 0,
        phdTitleAnimationReady: false,
        // Performance settings
        enableParticles: true, // Enable particles in both dev and production
        socialLinks: frozenSocialLinks,
        projects: frozenProjects,
        stackItems: frozenStackItems,
        institutions: frozenInstitutions,
        showBottomBar: false,
        heroObserver: null,
        // Cached computed results
        _cachedAllStackItems: null,
        _cachedLogoCardBaseClass: '!p-0.5 sm:!p-1',
        particleCount: 15,
        particleStyles: [],
        circleStyles: [],
        // Performance flags
        projectsLoaded: true,
        enableTypewriter: true, // User likes the typewriter effect
        flowbiteInitialized: false
      }
    },
    async mounted() {
      this.observeHeroSection();
      this.calculateHeroMainTitleAnimationDuration();
      
      // Defer Flowbite initialization
      if (!this.flowbiteInitialized) {
        requestAnimationFrame(() => {
          initFlowbite();
          this.flowbiteInitialized = true;
        });
      }
      
      this.generateParticleStyles();
    },
    beforeUnmount() {
      if (this.heroObserver) {
        this.heroObserver.disconnect();
      }
      // Clean up injected keyframes
      const existingStyle = document.getElementById('particle-keyframes');
      if (existingStyle) {
        existingStyle.remove();
      }
    },
    methods: {
        calculateHeroMainTitleAnimationDuration() {
            // Cache calculation to avoid recalculating
            if (this.heroMainTitleAnimationDuration !== 0) return;
            
            const lines = this.heroHeadingLines;
            const speed = 60;
            const fadeDuration = 350;
            let totalChars = 0;
            lines.forEach(line => totalChars += line.text.length);
            
            if (totalChars === 0) {
                this.heroMainTitleAnimationDuration = 0;
            } else {
                const lastCharDelay = (totalChars - 1) * speed;
                this.heroMainTitleAnimationDuration = lastCharDelay + fadeDuration;
            }
            this.phdTitleAnimationReady = true;
        },
        scrollToSection(sectionId) {
            const sectionElement = this.$refs[sectionId];
            if (sectionElement) {
                const headerOffset = 80; // Approximate height of the header
                const elementPosition = sectionElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
            });
            }
        },
        observeHeroSection() {
            const heroElement = this.$refs.heroSectionRef;
            if (!heroElement) return;

            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            };

            // Debounce to prevent rapid reflows
            let debounceTimer = null;
            this.heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        this.showBottomBar = entry.isIntersecting;
                    }, 100); // 100ms debounce
                });
            }, options);

            this.heroObserver.observe(heroElement);
        },
        generateParticleStyles() {
            // Generate styles for each particle
            this.particleStyles = [];
            this.circleStyles = [];
            
            for (let i = 1; i <= this.particleCount; i++) {
                // Random size between 4-12px
                const size = Math.floor(Math.random() * 8) + 4;
                
                // Random starting position
                const startX = Math.random() * 100;
                const startY = 100 + Math.random() * 10; // Start below viewport
                const endX = Math.random() * 100;
                const endY = -30 - Math.random() * 30; // End above viewport
                
                // Random durations and delays
                const moveDuration = 7000 + Math.random() * 4000; // 7-11 seconds
                const animDelay = Math.random() * 11000; // 0-11 seconds
                const circleDelay = Math.random() * 4000; // 0-4 seconds
                
                // Create unique keyframe name
                const keyframeName = `moveFrames${i}`;
                
                this.particleStyles.push({
                    width: `${size}px`,
                    height: `${size}px`,
                    animationName: keyframeName,
                    animationDuration: `${moveDuration}ms`,
                    animationDelay: `${animDelay}ms`,
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear',
                    keyframes: `
                        @keyframes ${keyframeName} {
                            from { transform: translate3d(${startX}vw, ${startY}vh, 0); }
                            to { transform: translate3d(${endX}vw, ${endY}vh, 0); }
                        }
                    `
                });
                
                this.circleStyles.push({
                    animationDelay: `${circleDelay}ms`
                });
            }
            
            // Inject keyframes into the document
            this.injectKeyframes();
        },
        injectKeyframes() {
            // Remove existing style element if any
            const existingStyle = document.getElementById('particle-keyframes');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // Create new style element
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            
            // Add all keyframes
            let keyframesCSS = '';
            this.particleStyles.forEach(particle => {
                keyframesCSS += particle.keyframes;
            });
            
            style.textContent = keyframesCSS;
            document.head.appendChild(style);
        },
        getParticleStyle(index) {
            const i = index - 1; // Convert to 0-based index
            return this.particleStyles[i] || {};
        },
        getCircleStyle(index) {
            const i = index - 1; // Convert to 0-based index
            return this.circleStyles[i] || {};
        },
        loadProjects() {
            if (!this.projectsLoaded) {
                this.projects = importedProjects;
                this.projectsLoaded = true;
            }
        }
    },
    computed: {
        logoCardBaseClass() {
            return this._cachedLogoCardBaseClass;
        },
        allStackItems() {
            if (this._cachedAllStackItems === null) {
                this._cachedAllStackItems = [...this.stackItems.ai, ...this.stackItems.software];
            }
            return this._cachedAllStackItems;
        },
        // Optimized class bindings to reduce reactive churn
        headerClasses() {
            return 'bg-white sticky top-0 z-50 ring-1 ring-chromatic shadow-lg transition-all duration-300 p-0.5 sm:p-1 md:p-1.5 lg:p-2 xl:p-2 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[52px] xl:min-h-[56px]';
        },
        logoClasses() {
            return 'rounded-full transition-all duration-300 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 w-6 sm:w-7 md:w-8 lg:w-8 xl:w-9';
        },
        logoTextClasses() {
            return 'self-center font-semibold whitespace-nowrap dark:text-white transition-all duration-300 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg';
        },
        mobileNavClasses() {
            return `md:hidden fixed left-0 w-screen bg-white dark:bg-gray-800 shadow-md z-40 transition-all duration-300 top-[40px] sm:top-[44px] md:top-[48px] lg:top-[52px] xl:top-[56px]`;
        },
        bottomBarClasses() {
            return 'fixed bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 text-white shadow-top-lg z-40 backdrop-blur-sm transition-all duration-300 p-1.5 sm:p-2 md:p-2 lg:p-2.5 xl:p-3 min-h-[44px] sm:min-h-[48px] md:min-h-[52px] lg:min-h-[56px] xl:min-h-[60px]';
        },
        bottomBarContainerClasses() {
            return 'container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl';
        },
        bottomBarTitleClasses() {
            return 'font-medium mb-1 sm:mb-0 sm:mr-2 md:mr-2 lg:mr-3 whitespace-nowrap transition-all duration-300 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm';
        },
        bottomBarLogosClasses() {
            return 'flex items-center justify-center transition-all duration-300 space-x-1.5 sm:space-x-2 md:space-x-2 lg:space-x-2.5 xl:space-x-3';
        },
        institutionLogoClasses() {
            return [
                this.logoCardBaseClass,
                '!w-9 !h-9 sm:!w-10 sm:!h-10 md:!w-11 md:!h-11 lg:!w-12 lg:!h-12 xl:!w-13 xl:!h-13 2xl:!w-14 2xl:!h-14 transition-all duration-300'
            ].join(' ');
        }
    }
};
</script>

<template>
    <div class="min-h-screen bg-slate-900">
        <!-- Hero Section - Adjusted lg padding to move content higher on desktop -->
        <div ref="heroSectionRef" id="hero-section" class="relative min-h-screen flex items-start pt-16 pb-[6vh] sm:pb-[8vh] md:pb-[10vh] lg:pt-[20vh] lg:pb-[16vh]">
            <!-- Lightweight CSS-only background animation -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div v-if="enableParticles" class="floating-shapes">
                    <!-- Rotating Particle System - Much cooler! -->
                    <div class="particle-system">
                        <div 
                            v-for="i in particleCount" 
                            :key="i"
                            class="circle-container"
                            :style="getParticleStyle(i)"
                        >
                            <div class="glowing-circle" :style="getCircleStyle(i)"></div>
                        </div>
                    </div>
                </div>
                <!-- Static background when particles are disabled -->
                <div v-else class="absolute inset-0 bg-gray-200" style="background-color: #e5e7eb;"></div>
            </div>

            <!-- Animation Toggle Switch (top-right corner) -->
            <div class="absolute top-4 right-4 z-20 flex items-center space-x-3">
                <span class="text-sm text-gray-600 font-medium">Animation</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        v-model="enableParticles"
                        class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-center">
                    <!-- Left Content - Restore text-center for mobile -->
                    <div class="space-y-4 sm:space-y-6 text-center lg:text-center">
                        <!-- Conditional TypewriterText for dev performance -->
                        <TypewriterText 
                            v-if="enableTypewriter"
                            :lines="heroHeadingLines"
                            tag="h1"
                            baseClass="text-5xl lg:text-6xl font-bold text-navy-900"
                            :speed="60"
                            :fadeDuration="350"
                            v-memo="[heroHeadingLines]"
                        />
                        <!-- Static text for dev mode -->
                        <h1 v-else class="text-5xl lg:text-6xl font-bold text-navy-900">
                            Hi There,<br>I'm Alejandro <span class="text-blue-600">Carrasco</span>
                        </h1>
                        
                        <template v-if="phdTitleAnimationReady && enableTypewriter">
                            <TypewriterText
                                :lines="phdTitleLines"
                                tag="p"
                                baseClass="text-xl sm:text-2xl text-gray-700 font-neue-haas"
                                :speed="60"
                                :fadeDuration="300" 
                                :initialDelay="heroMainTitleAnimationDuration"
                                v-memo="[phdTitleLines, heroMainTitleAnimationDuration]"
                            />
                        </template>
                        <!-- Static PhD text for dev mode -->
                        <p v-else-if="!enableTypewriter" class="text-xl sm:text-2xl text-gray-700 font-neue-haas">
                            PhD Candidate at <span class="text-red-600 font-semibold">MIT</span>
                        </p>
                        <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-auto">
                            Specialized in Large Language Models, Autonomous Agents, and Robotics
                        </p>
                        <p class="text-lg sm:text-xl text-gray-700 leading-relaxed mt-4 max-w-2xl mx-auto lg:mx-auto hidden sm:block">
                            I'm an AI researcher and software engineer specializing in Large Language Models, autonomous agents, and robotics. 
                        </p>

                        <!-- Avatar for Mobile (hidden on lg and up) -->
                        <div class="lg:hidden mx-auto mt-4 sm:mt-8 mb-2 sm:mb-4 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-yellow-400 overflow-hidden shadow-xl">
                            <img :src="avatar" alt="Alejandro Carrasco" class="w-full h-full object-cover" loading="lazy">
                        </div>
                        
                        <!-- Social Links - Centered -->
                        <div class="flex justify-center space-x-4 mt-4 sm:mt-8">
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

                        <!-- CTA Button to Projects - Centered -->
                        <div class="mt-6 sm:mt-10 text-center">
                            <a @click="scrollToSection('section3')" class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                                View My Projects
                                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Right Content - Avatar (hidden on screens smaller than lg) -->
                    <div class="hidden lg:block relative self-start mt-8 lg:mt-0">
                        <div class="w-72 h-72 mx-auto lg:w-96 lg:h-96 rounded-full bg-yellow-400 overflow-hidden shadow-xl">
                            <img :src="avatar" alt="Alejandro Carrasco" class="w-full h-full object-cover" loading="lazy">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rest of the content: Full-width sections with overall page background -->
        <div class="bg-slate-900">
            
            <!-- Projects Section (section3) - Full width background, changed to bg-gray-50 -->
            <section ref="section3" id="section3" class="py-16 bg-slate-800 text-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12 text-gray-100">Featured Research & Projects</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8" v-memo="[projects]">
                        <ProjectCard 
                          v-for="project in projects" 
                          :key="project.title" 
                          :project="project"
                          :is-link-to-detail="true"
                        />
                    </div>

                    <!-- Publications Section -->
                    <div class="mt-16">
                        <h3 class="text-2xl font-semibold mb-8 text-center text-gray-100">Recent Publications</h3>
                        <div class="space-y-6">
                            <div class="bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h4 class="text-lg font-semibold mb-2 text-gray-100">Title of Your Research Paper</h4>
                                <p class="text-gray-300 mb-3">Brief description of the research paper and its contributions to the field.</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-400">Published in Conference/Journal Name</span>
                                    <a href="#" class="text-blue-400 hover:text-blue-300 font-medium">Read Paper →</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

            <!-- Content Section 4 (Skills) - Full width background -->
            <section ref="section4" id="section4" class="py-16 bg-slate-900 text-white">
                    <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-16 text-white">Skills & Expertise</h2>
                    
                    <!-- New Unified Skill Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8" v-memo="[allStackItems]">
                        <SkillLogoCard 
                            v-for="item in allStackItems"
                            :key="item.name"
                            :item="item"
                        />
                    </div>
                </div>
            </section>

            <!-- Contact Section (section5) - Full width background -->
            <section ref="section5" id="section5" class="py-16 bg-slate-800 text-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12 text-gray-100">Get In Touch</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <!-- Contact Info -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-semibold text-gray-100">Let's Connect</h3>
                            <p class="text-gray-300">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
                            <div class="space-y-4">
                                <div class="flex items-center space-x-3">
                                    <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:your.email@example.com" class="text-blue-400 hover:text-blue-300">your.email@example.com</a>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="text-gray-300">Madrid, Spain</span>
                                </div>
                            </div>
                            <!-- Social Links -->
                            <div class="flex space-x-4 mt-6">
                                <a href="https://github.com/yourusername" target="_blank" class="text-gray-400 hover:text-blue-400">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" class="text-gray-400 hover:text-blue-400">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com/yourusername" target="_blank" class="text-gray-400 hover:text-blue-400">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <!-- Contact Form -->
                        <div class="bg-slate-800 p-6 rounded-lg shadow-md">
                            <form class="space-y-6">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-300">Name</label>
                                    <input type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
                                    <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                </div>
                                <div>
                                    <label for="message" class="block text-sm font-medium text-gray-300">Message</label>
                                    <textarea id="message" name="message" rows="4" class="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                                </div>
                                <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">Send Message</button>
                            </form>
                        </div>
                    </div>
                    </div>
                </section>
        </div>

        <!-- Sticky Bottom Bar for Institutions -->
        <transition name="slide-fade">
            <div v-show="showBottomBar" 
                 :class="bottomBarClasses">
                <div :class="bottomBarContainerClasses">
                    <h3 :class="bottomBarTitleClasses">Affiliated Institutions:</h3>
                    <div :class="bottomBarLogosClasses" v-memo="[institutions]">
                        <LogoCard 
                            v-for="institution in institutions"
                            :key="institution.name"
                            :item="institution"
                            :light-card-on-dark-bg="true" 
                            imageContainerClass="w-full h-full"
                            :class="institutionLogoClasses" />
                    </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<style scoped>
/* Custom font style for PhD title */
.font-neue-haas {
  font-family: 'Neue Haas Grotesk', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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

/* Transition for the sticky bottom bar */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.shadow-top-lg {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Ensure the LogoCard itself adapts to the class-applied sizes */
.fixed .LogoCard {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Enhanced responsive design based on viewport dimensions and aspect ratios */

/* High-resolution laptop screens (like yours) */
@media screen and (min-width: 1920px) and (max-width: 3840px) {
  /* High-res laptops: 1920x1080, 3840x2160 */
  .fixed .LogoCard {
    width: 2.75rem !important;  /* 44px - good size for high-res laptops */
    height: 2.75rem !important;
  }
  
  .fixed h3 {
    font-size: 0.875rem !important;  /* 14px */
  }
  
  .fixed {
    padding: 0.5rem !important;
    min-height: 3rem !important; /* 48px */
  }
}

@media screen and (min-width: 1024px) and (max-width: 1919px) {
  /* Standard laptop screens - including MacBook Air */
  .fixed .LogoCard {
    width: 2.5rem !important;  /* 40px - good for standard laptops */
    height: 2.5rem !important;
  }
  
  .fixed h3 {
    font-size: 0.8125rem !important;  /* 13px */
  }
  
  .fixed {
    padding: 0.5rem !important;
    min-height: 2.75rem !important; /* 44px */
  }
}

@media screen and (min-width: 1366px) and (max-width: 1920px) and (min-aspect-ratio: 16/9) {
  /* Common laptop resolutions: 1366x768, 1536x864, 1600x900 */
  .fixed .LogoCard {
    width: 2.5rem !important;      /* 40px */
    height: 2.5rem !important;
  }
  
  .fixed h3 {
    font-size: 0.8125rem !important;
  }
  
  .fixed {
    padding: 0.5rem !important;
    min-height: 2.75rem !important;
  }
}

@media screen and (min-width: 1920px) and (min-aspect-ratio: 16/10) {
  /* High-resolution displays and ultra-wide monitors */
  .fixed .LogoCard {
    width: 3rem !important;      /* 48px */
    height: 3rem !important;
  }
  
  .fixed h3 {
    font-size: 0.9375rem !important; /* 15px */
  }
}

@media screen and (max-width: 1366px) and (min-aspect-ratio: 4/3) {
  /* Smaller laptop screens and tablets in landscape */
  .fixed .LogoCard {
    width: 2.25rem !important;   /* 36px */
    height: 2.25rem !important;
  }
  
  .fixed h3 {
    font-size: 0.75rem !important; /* 12px */
  }
  
  .fixed {
    padding: 0.375rem !important;
    min-height: 2.5rem !important; /* 40px */
  }
}

/* Mobile specific optimizations */
@media screen and (max-width: 640px) {
  .fixed .LogoCard {
    width: 2rem !important;    /* 32px - larger for mobile readability */
    height: 2rem !important;
  }
  
  .fixed h3 {
    font-size: 0.75rem !important; /* 12px */
  }
}

/* Lightweight floating shapes animation - replaces particles.js */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Rotating Particle System - Much cooler! */
.particle-system {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #e5e7eb;
  transform: translateZ(0);
  will-change: auto;
}

.circle-container {
  position: absolute;
  opacity: 0.3;
  transform: translateZ(0);
  will-change: auto;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 25s;
}

.glowing-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  mix-blend-mode: multiply;
  background-image: radial-gradient(
    hsl(0, 0%, 20%),
    hsl(0, 0%, 30%) 10%,
    hsla(0, 0%, 40%, 0) 56%
  );
  animation: fade-frames 200ms infinite, scale-frames 2s infinite;
}

@keyframes fade-frames {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

@keyframes scale-frames {
  0% { transform: scale3d(0.4, 0.4, 1); }
  50% { transform: scale3d(2.2, 2.2, 1); }
  100% { transform: scale3d(0.4, 0.4, 1); }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .circle-container {
    animation: none;
    opacity: 0.1;
  }
  .glowing-circle {
    animation: none;
  }
}
</style>

