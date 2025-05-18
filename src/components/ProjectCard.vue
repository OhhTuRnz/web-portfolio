<script>
import { generateSlug } from '@/views/projectsData.js'; // Import slug generator

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
    },
    isLinkToDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showVideo: false
    }
  },
  computed: {
    projectDetailLink() {
      if (!this.project || !this.project.title) return '/';
      return { name: 'ProjectDetail', params: { slug: this.generateSlug(this.project.title) } };
    }
  },
  methods: {
    generateSlug(title) { // Keep local slug generation for direct use in template binding
      return generateSlug(title);
    },
    playVideo() {
      if (this.project.video) {
        this.showVideo = true;
        this.$refs.videoPlayer.play().catch(error => {
          console.warn("Video play interrupted or failed:", error);
        });
      }
    },
    pauseVideo() {
      if (this.project.video) {
        this.showVideo = false;
        this.$refs.videoPlayer.pause();
      }
    },
    handleCardClick() {
      if (this.isLinkToDetail) {
        this.$router.push(this.projectDetailLink);
      }
    }
  }
}
</script>

<template>
  <div class="project-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
    <div @click="handleCardClick" :class="{'cursor-pointer': isLinkToDetail}" class="relative aspect-video overflow-hidden">
      <!-- Image/Video Content -->
      <img v-if="!showVideo && project.image" :src="project.image" :alt="project.title" 
           class="w-full h-full object-cover transition-opacity duration-300 ease-in-out" 
           :class="{'opacity-100': !showVideo, 'opacity-0': showVideo}">
      <video v-if="project.video" ref="videoPlayer" :src="project.video" 
             class="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 ease-in-out" 
             :class="{'opacity-100': showVideo, 'opacity-0': !showVideo}" 
             muted loop playsinline 
             @mouseover="playVideo" @mouseleave="pauseVideo">
      </video>
      <div v-if="project.video && !showVideo" class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 hover:opacity-0">
        <svg class="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
      </div>
    </div>

    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
      <p class="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">{{ project.description.substring(0, 100) + (project.description.length > 100 ? '...' : '') }}</p>
      
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in project.technologies" :key="tech.name" 
                :class="[tech.class, 'px-2 py-1 text-xs font-medium rounded-full']">
            {{ tech.name }}
          </span>
        </div>
      </div>

      <div class="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
        <span class="text-xs text-gray-500">{{ project.date }}</span>
        <a v-if="!isLinkToDetail && project.link" :href="project.link" target="_blank" 
           class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          View Project →
        </a>
        <router-link v-if="isLinkToDetail" :to="projectDetailLink"
           class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          Learn More →
        </router-link>
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