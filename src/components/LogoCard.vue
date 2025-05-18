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
    }
  }
}
</script>

<template>
  <a 
    :href="item.link" 
    target="_blank"
    class="bg-white rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center aspect-square overflow-hidden"
  >
    <!-- Logo -->
    <div class="w-4/5 h-4/5 flex items-center justify-center">
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