<template>
  <div class="project-detail-page container mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div v-if="project" class="max-w-3xl mx-auto">
      <!-- Back Button -->
      <router-link to="/#section4" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group">
        <svg class="w-5 h-5 mr-2 transform transition-transform duration-150 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Projects
      </router-link>

      <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{{ project.title }}</h1>
      
      <div class="mb-8">
        <img v-if="!project.video" :src="project.image" :alt="project.title" class="w-full rounded-lg shadow-xl object-cover h-64 sm:h-80 md:h-96">
        <video v-if="project.video" :src="project.video" class="w-full rounded-lg shadow-xl" controls autoplay muted loop playsinline></video>
      </div>

      <div class="prose prose-lg max-w-none mb-8">
        <p>{{ project.description }}</p>
        <!-- Add more detailed sections here: Challenges, Solutions, Learnings etc. -->
        <!-- For example: -->
        <!-- 
        <h3>Challenges Faced</h3>
        <p>Detailed explanation of challenges...</p>
        <h3>My Role & Contributions</h3>
        <p>Specifics of what you did...</p>
        -->
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Technologies Used</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in project.technologies" :key="tech.name"
                :class="[tech.class, 'px-3 py-1 text-sm font-medium rounded-full']">
            {{ tech.name }}
          </span>
        </div>
      </div>

      <div v-if="project.link" class="mt-12">
        <a :href="project.link" target="_blank" 
           class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
          View Project on GitHub <span class="ml-2">→</span>
        </a>
      </div>

    </div>
    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-600">Loading project details or project not found...</p>
      <router-link to="/" class="text-blue-600 hover:underline mt-4 inline-block">Go to Homepage</router-link>
    </div>
  </div>
</template>

<script>
import { projects as allProjects } from '@/views/projectsData.js'; // We will create this file

export default {
  name: 'ProjectDetail',
  props: {
    // id: { // If using id in route like /project/:id
    //   type: [String, Number],
    //   required: true
    // }
    slug: { // Using slug in route like /project/:slug
      type: String,
      required: true
    }
  },
  data() {
    return {
      project: null
    };
  },
  created() {
    // Find project by slug (you might want to convert titles to slugs)
    // For simplicity, we'll assume project titles in data are somewhat URL-friendly or we add a slug property
    this.project = allProjects.find(p => this.generateSlug(p.title) === this.slug);
  },
  methods: {
    generateSlug(title) {
      return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
  }
};
</script>

<style scoped>
/* Add any specific styles for the project detail page here */
.prose {
  /* Tailwind prose styles provide good typography defaults */
}
</style> 