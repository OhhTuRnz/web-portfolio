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
import { useGPUDetection } from '@/composables/useGPUDetection';

// Import new modular components
import HeroSection from '@/components/HeroSection.vue';
import AffiliationsBar from '@/components/AffiliationsBar.vue';

// Lazy load only non-critical components
const LogoCard = defineAsyncComponent(() => import('@/components/LogoCard.vue'));
const SkillLogoCard = defineAsyncComponent(() => import('@/components/SkillLogoCard.vue'));

// Pre-generate particle styles to avoid runtime calculations
const PARTICLE_COUNT = 15;
const PRE_GENERATED_PARTICLES = generateParticleStylesStatic(PARTICLE_COUNT);

function generateParticleStylesStatic(count) {
  const particles = [];
  const circles = [];
  let keyframesCSS = '';
  
  for (let i = 1; i <= count; i++) {
    const size = Math.floor(Math.random() * 8) + 4;
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 10;
    const endX = Math.random() * 100;
    const endY = -30 - Math.random() * 30;
    const moveDuration = 7000 + Math.random() * 4000;
    const animDelay = Math.random() * 11000;
    const circleDelay = Math.random() * 4000;
    const keyframeName = `moveFrames${i}`;
    
    const keyframe = `
      @keyframes ${keyframeName} {
        from { transform: translate3d(${startX}vw, ${startY}vh, 0); }
        to { transform: translate3d(${endX}vw, ${endY}vh, 0); }
      }
    `;
    
    keyframesCSS += keyframe;
    
    particles.push({
      width: `${size}px`,
      height: `${size}px`,
      animationName: keyframeName,
      animationDuration: `${moveDuration}ms`,
      animationDelay: `${animDelay}ms`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear'
    });
    
    circles.push({
      animationDelay: `${circleDelay}ms`
    });
  }
  
  return { particles, circles, keyframesCSS };
}

export default {
    name: 'Home',
    components: {
        ProjectCard,
        SkillLogoCard,
        HeroSection,
        AffiliationsBar
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

      // Detect GPU support once using composable
      // This only affects the default state - users can still toggle animations on/off
      const { hasGPUSupport } = useGPUDetection();

      return {
        avatar: avatarImage,
        heroHeadingLines: frozenHeroLines,
        phdTitleLines: frozenPhdLines,
        socialLinks: frozenSocialLinks,
        projects: frozenProjects,
        stackItems: frozenStackItems,
        institutions: frozenInstitutions,
        showBottomBar: false,
        hasGPUSupport,
        // Cached computed results
        _cachedAllStackItems: null,
        // Performance flags
        projectsLoaded: true,
        enableTypewriter: true, // User likes the typewriter effect
        flowbiteInitialized: false
      }
    },
    async mounted() {
      // Defer Flowbite initialization
      if (!this.flowbiteInitialized) {
        requestAnimationFrame(() => {
          initFlowbite();
          this.flowbiteInitialized = true;
        });
      }
    },
    methods: {
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
        handleHeroInView(isInView) {
            this.showBottomBar = isInView;
        },
        handleScrollToProjects() {
            this.scrollToSection('section3');
        },
        loadProjects() {
            if (!this.projectsLoaded) {
                this.projects = importedProjects;
                this.projectsLoaded = true;
            }
        }
    },
    computed: {
        allStackItems() {
            if (this._cachedAllStackItems === null) {
                this._cachedAllStackItems = [...this.stackItems.ai, ...this.stackItems.software];
            }
            return this._cachedAllStackItems;
        }
    }
};
</script>

<template>
    <div class="min-h-screen bg-slate-900">
        <!-- Hero Section Component -->
        <HeroSection 
            :avatar="avatar"
            :hero-heading-lines="heroHeadingLines"
            :phd-title-lines="phdTitleLines"
            :social-links="socialLinks"
            :enable-typewriter="enableTypewriter"
            :has-g-p-u-support="hasGPUSupport"
            @scrollToProjects="handleScrollToProjects"
            @heroInView="handleHeroInView"
        />

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

        <!-- Affiliations Bar Component -->
        <AffiliationsBar 
            :institutions="institutions"
            :show-bar="showBottomBar"
            :has-g-p-u-support="hasGPUSupport"
        />
    </div>
</template>

<style scoped>
/* Add smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

/* Base styles */
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

/* Project card optimizations */
.project-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Simplified shadows for low-end devices */
@media (hover: none) or (prefers-reduced-motion: reduce) {
  .project-card {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
    transition: transform 0.2s ease-out !important;
  }
  
  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12) !important;
  }
}

/* Standard hover for devices with GPU */
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
}

/* Accessibility - disable all animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

