<template>
  <div class="bg-slate-800 p-4 rounded-lg flex items-center justify-center aspect-square transition-all duration-300 ease-in-out hover:bg-slate-700 hover:shadow-lg transform hover:scale-105">
    <img 
      :src="item.logo" 
      :alt="item.name + ' logo'" 
      class="max-w-full max-h-16 object-contain"
    />
  </div>
</template>

<script>
export default {
  name: 'SkillLogoCard',
  props: {
    item: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && typeof value.logo === 'string' && typeof value.name === 'string';
      }
    }
  }
};
</script>

<style scoped>
/* Add any specific styles if needed, though Tailwind should cover most */
img {
  filter: grayscale(30%) brightness(1.2); /* Subtle filter to make logos look cohesive */
  transition: filter 0.3s ease-in-out;
}

.hover\:bg-slate-700:hover img {
  filter: grayscale(0%) brightness(1);
}
</style> 