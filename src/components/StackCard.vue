<script>
export default {
  name: 'StackCard',
  props: {
    item: {
      type: Object,
      required: true,
      // Expected shape:
      // {
      //   name: String,
      //   logo: String,
      //   proficiency: Number,
      //   description: String,
      //   category: String,
      //   link: String (optional)
      // }
    }
  }
}
</script>

<template>
  <a 
    :href="item.link" 
    target="_blank"
    class="bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div class="flex items-center space-x-4">
      <!-- Logo -->
      <div class="w-12 h-12 flex-shrink-0">
        <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain">
      </div>
      
      <!-- Content -->
      <div class="flex-grow">
        <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ item.description }}</p>
        
        <!-- Proficiency Bar -->
        <div class="mt-3">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-500"
              :class="{
                'bg-blue-600': item.category === 'AI',
                'bg-green-600': item.category === 'Software',
                'bg-purple-600': item.category === 'Institution'
              }"
              :style="{ width: `${item.proficiency}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}
</style> 