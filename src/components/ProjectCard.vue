<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true,
      // Expected shape:
      // {
      //   title: String,
      //   description: String,
      //   image: String,
      //   video: String (optional),
      //   technologies: Array,
      //   link: String,
      //   date: String
      // }
    }
  },
  data() {
    return {
      isHovered: false,
      videoLoaded: false
    }
  },
  methods: {
    handleMouseEnter() {
      if (this.project.video) {
        this.isHovered = true;
        // Preload video
        const video = this.$refs.video;
        if (video) {
          video.load();
          video.play().catch(err => console.log('Video autoplay prevented:', err));
        }
      }
    },
    handleMouseLeave() {
      this.isHovered = false;
      const video = this.$refs.video;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }
}
</script>

<template>
  <div 
    class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Media Container -->
    <div class="relative aspect-video overflow-hidden">
      <!-- Static Image -->
      <img 
        :src="project.image" 
        :alt="project.title"
        class="w-full h-full object-cover transition-opacity duration-300"
        :class="{ 'opacity-0': isHovered && project.video }"
      >
      
      <!-- Video (if available) -->
      <video
        v-if="project.video"
        ref="video"
        :src="project.video"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        :class="{ 'opacity-100': isHovered, 'opacity-0': !isHovered }"
        muted
        loop
        playsinline
      ></video>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
      <p class="text-gray-600 mb-4">{{ project.description }}</p>
      
      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tech in project.technologies" 
          :key="tech.name"
          class="px-3 py-1 rounded-full text-sm"
          :class="tech.class || 'bg-blue-100 text-blue-800'"
        >
          {{ tech.name }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center">
        <a 
          :href="project.link" 
          class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          target="_blank"
        >
          View Project 
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
        <span class="text-gray-500 text-sm">{{ project.date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}

video {
  opacity: 0;
}

video.opacity-100 {
  opacity: 1;
}
</style> 