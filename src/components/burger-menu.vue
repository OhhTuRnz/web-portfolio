<template>
  <div class="relative">
    <!-- Hamburger Button (visible on mobile) -->
    <button
      class="burger-button p-2 rounded-md cursor-pointer block md:hidden"
      :class="{ 'active': isOpen }"
      @click="toggleMenu"
      >
      <span class="block w-6 h-0.5 my-1 bg-gray-800 transition-transform duration-300 transform origin-center" :class="{ 'rotate-45 translate-y-2': isOpen }"></span>
      <span class="block w-6 h-0.5 my-1 bg-gray-800 transition-transform duration-300 transform origin-center" :class="{ 'opacity-0': isOpen }"></span>
      <span class="block w-6 h-0.5 my-1 bg-gray-800 transition-transform duration-300 transform origin-center" :class="{ '-rotate-45 -translate-y-2': isOpen }"></span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false, // Track the menu state (open/close)
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

