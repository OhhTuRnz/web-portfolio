<script>
export default {
  name: 'LogoCard',
  props: {
    item: {
      type: Object,
      required: true,
      // Expected shape:
      // {
      //   logo: String,
      //   name: String,
      //   link: String
      // }
    },
    lightCardOnDarkBg: {
      type: Boolean,
      default: false
    },
    imageContainerClass: {
      type: String,
      default: 'w-4/5 h-4/5'
    }
  },
  computed: {
    cardClasses() {
      if (this.lightCardOnDarkBg) {
        return 'bg-gray-200 hover:bg-gray-300 rounded-md shadow-sm'; // Adjusted for dark context
      } else {
        return 'bg-white hover:shadow-xl rounded-xl shadow-md'; // Default style
      }
    }
  }
}
</script>

<template>
  <a 
    :href="item.link" 
    target="_blank"
    class="transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center overflow-hidden"
    :class="cardClasses" 
  >
    <!-- Logo -->
    <div :class="imageContainerClass" class="flex items-center justify-center">
      <img 
        :src="item.logo" 
        :alt="item.name" 
        class="max-w-full max-h-full object-contain"
      >
    </div>
  </a>
</template>

<style scoped>
.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}
</style> 