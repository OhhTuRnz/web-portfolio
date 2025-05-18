<script>
import avatarImage from '@/assets/images/carrusk_zen.png';
import MITLogo from '@/assets/logos/MIT_logo.svg';
import MITArcLabLogo from '@/assets/logos/mit-arclab-logo.jpg';
import UPMLogoPNG from '@/assets/logos/upm-logo.png';
import ETSISILogoPNG from '@/assets/logos/etsisi-logo.png';
import { Carousel } from 'flowbite';
import { onMounted, onBeforeUnmount } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';
import StackCard from '@/components/StackCard.vue';
import LogoCard from '@/components/LogoCard.vue';
import SkillLogoCard from '@/components/SkillLogoCard.vue';
import TypewriterText from '@/components/TypewriterText.vue';
import { projects as importedProjects } from '@/views/projectsData.js';
import { ParticlesComponent as Particles } from "particles.vue3";
import { loadSlim } from "tsparticles-slim";

export default {
    name: 'Home',
    components: {
        ProjectCard,
        StackCard,
        LogoCard,
        SkillLogoCard,
        TypewriterText,
        Particles
    },
    data() {
      return {
        avatar: avatarImage,
        heroHeadingLines: [
          { text: "Hi There," },
          { text: "I'm Alejandro ", isNewLine: true, divClass: "mt-2" }, 
          { text: "Carrasco", spanClass: "text-blue-600" }
        ],
        phdTitleLines: [
            { text: "PhD Candidate at " },
            { text: "MIT", spanClass: "text-red-600 font-semibold" }
        ],
        heroMainTitleAnimationDuration: 0,
        phdTitleAnimationReady: false,
        socialLinks: [
          { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/yourusername', color: 'text-[#0077B5]' },
          { name: 'GitHub', icon: 'github', url: 'https://github.com/yourusername', color: 'text-gray-900' },
          { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/yourusername', color: 'text-[#1DA1F2]' },
          { name: 'Telegram', icon: 'telegram', url: 'https://t.me/yourusername', color: 'text-[#0088cc]' }
        ],
        projects: importedProjects,
        stackItems: {
          ai: [
            {
              name: 'Large Language Models',
              logo: '/logos/llm-logo.svg',
            },
            {
              name: 'PyTorch',
              logo: '/logos/pytorch-logo.svg',
            },
            {
              name: 'TensorFlow',
              logo: '/logos/tensorflow-logo.svg',
            },
            {
              name: 'Hugging Face',
              logo: '/logos/huggingface-logo.svg',
            }
          ],
          software: [
            {
              name: 'Python',
              logo: '/logos/python-logo.svg',
            },
            {
              name: 'C++',
              logo: '/logos/cpp-logo.svg',
            },
            {
              name: 'ROS',
              logo: '/logos/ros-logo.svg',
            },
            {
              name: 'Docker',
              logo: '/logos/docker-logo.svg',
            }
          ],
        },
        institutions: [
          {
            name: 'MIT',
            logo: MITLogo,
            link: 'https://mit.edu',
            shape: 'square'
          },
          {
            name: 'MIT ArcLab',
            logo: MITArcLabLogo,
            link: 'https://arclab.mit.edu',
            shape: 'square'
          },
          {
            name: 'UPM',
            logo: UPMLogoPNG,
            link: 'https://www.upm.es',
            shape: 'square'
          },
          {
            name: 'ETSIINF',
            logo: ETSISILogoPNG,
            link: 'https://www.etsisi.upm.es/',
            shape: 'square'
          }
        ],
        showBottomBar: false,
        heroObserver: null,
        particlesSetupFunction: loadSlim,
        particlesOptions: {
            fullScreen: {
                enable: false,
                zIndex: -1
            },
            background: {
                color: {
                    value: '#e5e7eb'
                }
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40
                    },
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#374151'
                },
                links: {
                    color: '#6b7280',
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce'
                    },
                    random: false,
                    speed: 2,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 50
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 1, max: 3 }
                }
            },
            detectRetina: true
        }
      }
    },
    mounted() {
      this.observeHeroSection();
      this.calculateHeroMainTitleAnimationDuration();
    },
    beforeUnmount() {
      if (this.heroObserver) {
        this.heroObserver.disconnect();
      }
    },
    methods: {
        calculateHeroMainTitleAnimationDuration() {
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

            this.heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.showBottomBar = entry.isIntersecting;
                });
            }, options);

            this.heroObserver.observe(heroElement);
        },
    },
    computed: {
        logoCardBaseClass() {
            return '!p-0.5 sm:!p-1';
        },
        allStackItems() {
            return [...this.stackItems.ai, ...this.stackItems.software];
        }
    }
};
</script>

<template>
    <div class="min-h-screen bg-slate-900">
        <!-- Hero Section - Adjusted lg padding to move content higher on desktop -->
        <div ref="heroSectionRef" id="hero-section" class="relative min-h-screen flex items-start pt-16 pb-[6vh] sm:pb-[8vh] md:pb-[10vh] lg:pt-[4vh] lg:pb-[16vh]">
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <Particles
                    id="tsparticles"
                    :options="particlesOptions"
                    :particles-init="particlesSetupFunction"
                />
            </div>

            <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-center">
                    <!-- Left Content - Restore text-center for mobile -->
                    <div class="space-y-4 sm:space-y-6 text-center lg:text-center">
                        <TypewriterText 
                            :lines="heroHeadingLines"
                            tag="h1"
                            baseClass="text-5xl lg:text-6xl font-bold text-navy-900"
                            :speed="60"
                            :fadeDuration="350"
                        />
                        <template v-if="phdTitleAnimationReady">
                            <TypewriterText
                                :lines="phdTitleLines"
                                tag="p"
                                baseClass="text-xl sm:text-2xl text-gray-700 font-neue-haas"
                                :speed="60"
                                :fadeDuration="300" 
                                :initialDelay="heroMainTitleAnimationDuration" 
                            />
                        </template>
                        <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-auto">
                            Specialized in Large Language Models, Autonomous Agents, and Robotics
                        </p>
                        <p class="text-lg sm:text-xl text-gray-700 leading-relaxed mt-4 max-w-2xl mx-auto lg:mx-auto hidden sm:block">
                            I'm an AI researcher and software engineer specializing in Large Language Models, autonomous agents, and robotics. 
                        </p>

                        <!-- Avatar for Mobile (hidden on lg and up) -->
                        <div class="lg:hidden mx-auto mt-4 sm:mt-8 mb-2 sm:mb-4 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-yellow-400 overflow-hidden shadow-xl">
                            <img :src="avatar" alt="Alejandro Carrasco" class="w-full h-full object-cover">
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
                            <img :src="avatar" alt="Alejandro Carrasco" class="w-full h-full object-cover">
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
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8">
                        <SkillLogoCard 
                            v-for="item in allStackItems"
                            :key="item.name"
                            :item="item"
                        />
                    </div>
                </div>
            </section>

            <!-- Contact Section (section5) - Full width background -->
            <section ref="section5" id="section5" class="py-16 bg-slate-900 text-white">
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
                 class="fixed bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 text-white p-2 sm:p-3 shadow-top-lg z-40 backdrop-blur-sm">
                <div class="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-2 sm:px-4">
                    <h3 class="text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-3 whitespace-nowrap">Affiliated Institutions:</h3>
                    <div class="flex items-center justify-center space-x-2 sm:space-x-3">
                        <LogoCard 
                            v-for="institution in institutions"
                            :key="institution.name"
                            :item="institution"
                            :light-card-on-dark-bg="true" 
                            imageContainerClass="w-full h-full"
                            :class="[
                                logoCardBaseClass,
                                '!w-16 !h-16 sm:!w-20 sm:!h-20 md:!w-20 md:!h-20'
                            ]" />
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

/* Target the particle canvas if fullScreen:false doesn't remove position:fixed */
:deep(#tsparticles > canvas) {
  position: absolute !important; /* Override fixed position */
  height: 100% !important; /* Ensure it fills its parent (the hero section's inner div) */
  width: 100% !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 0 !important; /* Keep behind hero text (z-10) but above hero bg */
}

/* Particle network animation styles */
/*
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
    opacity: 0.5;
}
*/

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
</style>
