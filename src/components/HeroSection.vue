<template>
  <div ref="heroSectionRef" id="hero-section" class="relative min-h-screen flex items-start pt-16 pb-[6vh] sm:pb-[8vh] md:pb-[10vh] lg:pt-[20vh] lg:pb-[16vh]">
    <!-- Lightweight CSS-only background animation -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-if="enableParticles" class="floating-shapes">
        <!-- Rotating Particle System -->
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
      <span class="text-sm text-gray-600 font-medium">
        Animation
        <span v-if="!hasGPUSupport" class="text-xs text-amber-600">(No GPU)</span>
      </span>
      <label class="relative inline-flex items-center cursor-pointer group">
        <input 
          type="checkbox" 
          v-model="enableParticles"
          class="sr-only peer"
          :title="hasGPUSupport ? 'Toggle particle animations' : 'Warning: Animations may be slow without GPU acceleration'"
        >
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <!-- Tooltip for no GPU warning -->
        <div v-if="!hasGPUSupport && enableParticles" 
             class="absolute top-full mt-2 right-0 w-48 p-2 bg-amber-100 text-amber-800 text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Performance may be slow without GPU acceleration
        </div>
      </label>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-center">
        <!-- Left Content -->
        <div class="space-y-4 sm:space-y-6 text-center lg:text-center">
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
          
          <!-- Social Links -->
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

          <!-- CTA Button -->
          <div class="mt-6 sm:mt-10 text-center">
            <a @click="$emit('scrollToProjects')" class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
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
</template>

<script>
import TypewriterText from '@/components/TypewriterText.vue';
import { useParticles } from '@/composables/useParticles';

export default {
  name: 'HeroSection',
  components: {
    TypewriterText
  },
  props: {
    avatar: {
      type: String,
      required: true
    },
    heroHeadingLines: {
      type: Array,
      required: true
    },
    phdTitleLines: {
      type: Array,
      required: true
    },
    socialLinks: {
      type: Array,
      required: true
    },
    enableTypewriter: {
      type: Boolean,
      default: true
    },
    hasGPUSupport: {
      type: Boolean,
      default: true
    }
  },
  emits: ['scrollToProjects', 'heroInView'],
  setup(props, { emit }) {
    const { 
      particleCount, 
      particleStyles, 
      circleStyles,
      getParticleStyle,
      getCircleStyle,
      injectKeyframes 
    } = useParticles();

    return {
      particleCount,
      particleStyles,
      circleStyles,
      getParticleStyle,
      getCircleStyle,
      injectKeyframes
    };
  },
  data() {
    return {
      // Default to GPU detection result, but user can override via toggle
      enableParticles: this.hasGPUSupport,
      phdTitleAnimationReady: false,
      heroMainTitleAnimationDuration: 0,
      observer: null
    };
  },
  mounted() {
    this.calculateHeroMainTitleAnimationDuration();
    if (this.enableParticles) {
      this.injectKeyframes();
    }
    this.observeHeroSection();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Clean up injected keyframes
    const existingStyle = document.getElementById('particle-keyframes');
    if (existingStyle) {
      existingStyle.remove();
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
    observeHeroSection() {
      const heroElement = this.$refs.heroSectionRef;
      if (!heroElement) return;

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };

      const debounceDelay = this.hasGPUSupport ? 100 : 150;
      let debounceTimer = null;
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.$emit('heroInView', entry.isIntersecting);
          }, debounceDelay);
        });
      }, options);

      this.observer.observe(heroElement);
    }
  },
  watch: {
    enableParticles(newVal) {
      if (newVal) {
        this.injectKeyframes();
      } else {
        const existingStyle = document.getElementById('particle-keyframes');
        if (existingStyle) {
          existingStyle.remove();
        }
      }
    }
  }
};
</script>

<style scoped>
/* Custom font style for PhD title */
.font-neue-haas {
  font-family: 'Neue Haas Grotesk', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

/* Lightweight floating shapes animation */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

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
  background-image: radial-gradient(
    hsl(0, 0%, 20%),
    hsl(0, 0%, 30%) 10%,
    hsla(0, 0%, 40%, 0) 56%
  );
  animation: fade-frames 200ms infinite, scale-frames 2s infinite;
}

/* GPU-enabled styles */
@supports (mix-blend-mode: multiply) and (backdrop-filter: blur(10px)) {
  .glowing-circle {
    mix-blend-mode: multiply;
  }
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