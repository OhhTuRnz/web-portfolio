<template>
  <div class="relative">
    <!-- Hamburger Button (visible on mobile) -->
    <button
      class="burger-button p-5 rounded-md cursor-pointer block md:hidden"
      :class="{ 'active': isOpen }"
      @click="toggleMenu"
    >
      <span class="block w-10 h-1 my-2 bg-gray-800 transition-transform duration-300 transform origin-center" :class="{ 'rotate-45 translate-y-3': isOpen }"></span>
      <span class="block w-10 h-1 my-2 bg-gray-800 transition-transform duration-300 transform origin-center" :class="{ 'opacity-0': isOpen }"></span>
      <span class="block w-10 h-1 my-2 bg-gray-800 transition-transform duration-300 transform origin-center" :class="{ '-rotate-45 -translate-y-3': isOpen }"></span>
    </button>

    <!-- Menu -->
    <div
      class="menu absolute left-0 mt-4 bg-white shadow-lg overflow-x-visible overflow-y-hidden transition-max-height duration-300 ease-in-out max-h-0 z-50"
      :class="{ 'max-h-[800px]': isOpen }"
    > 
      <!-- Menu Items with Router Links -->
      <ul class="list-none p-2 m-0">
        <li class="py-4 text-right">
          <router-link to="/" @click="closeMenu" class="text-gray-800 font-bold text-lg">Home</router-link>
        </li>
        <li class="py-4 text-right">
          <router-link to="/about" @click="closeMenu" class="text-gray-800 font-bold text-lg">About</router-link>
        </li>
      </ul>
    </div>
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
  watch: {
    // Close the menu when the route changes
    $route() {
      this.closeMenu();
    },
  },
};
</script>

