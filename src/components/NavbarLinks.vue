<template>
  <ul :class="ulClass">
    <li>
      <a @click="$emit('navigate', 'hero-section')" :class="linkClass" aria-current="page">Home</a>
    </li>
    <li>
      <a @click="$emit('navigate', 'hero-section')" :class="linkClass">About</a>
    </li>
    <li>
      <a @click="$emit('navigate', 'section3')" :class="linkClass">Projects</a>
    </li>
    <li>
      <a @click="$emit('navigate', 'section4')" :class="linkClass">Skills</a>
    </li>
    <li>
      <a @click="$emit('navigate', 'section5')" :class="linkClass">Contact</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavbarLinks',
  props: {
    isMobile: Boolean,
  },
  emits: ['navigate'],
  computed: {
    ulClass() {
      return this.isMobile
        ? 'font-medium flex flex-col p-4 text-left rtl:text-right mt-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800' // Mobile: Reverted to text-left
        : 'font-medium flex flex-col p-0 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:text-white md:dark:bg-gray-900 dark:border-gray-700'; // Desktop UL styling
    },
    linkClass() {
      // Base classes for all links
      let classes = 'text-lg cursor-pointer block dark:text-white ';
      if (this.isMobile) {
        // Mobile specific classes
        classes += 'py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'; // Added rounded-md for a slightly softer look on hover
      } else {
        // Desktop specific classes
        classes += 'py-2 px-0 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent';
      }
      return classes;
    }
  }
}
</script> 