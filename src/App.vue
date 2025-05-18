<script>
import { goHome } from '@/components/scripts/home.js'; // Adjust the path as needed
import { useRouter } from 'vue-router'; // Import useRouter
import BurgerMenu from '@/components/burger-menu.vue'; // Import the BurgerMenu component
import { defineComponent } from 'vue';
// Import the logo using alias
import logoImage from '@logos/carrusk_logo_monkey.jpeg';

export default defineComponent({
  name: 'App',
  data() {
    return {
      logo: logoImage  // Use the imported image
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    navigateToSection(sectionId) {
      if (this.$route.name !== 'Home') {
        this.router.push({ name: 'Home' }).then(() => {
          this.scrollToElement(sectionId);
        });
      } else {
        this.scrollToElement(sectionId);
      }
      this.closeMenu(); // Close burger menu if open
    },
    scrollToElement(elementId) {
      // Slight delay to ensure element is available after route change
      setTimeout(() => {
        if (elementId === 'hero-section' || elementId === 'home-top') { // Special case for top of home
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(elementId);
          if (element) {
            const headerHeight = 80; // Height of your fixed header
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - headerHeight,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    },
    goHome() {
      this.navigateToSection('hero-section');
    },
    closeMenu(){
      if (this.$refs.BurgerMenu && this.$refs.BurgerMenu.$el.offsetParent !== null) { // Check if burger menu is visible
        setTimeout(() => {
            this.$refs.BurgerMenu.closeMenu();
            this.$refs.BurgerMenu.$el.click(); // Trigger click to ensure state is updated if Flowbite handles it
        }, 150);
      }
    }
  },
  components: {
    BurgerMenu
  },
});
</script>

<template>
  <header class="bg-white p-3 sm:p-4 sticky top-0 z-50 ring-1 ring-chromatic shadow-lg">
    <div class="flex justify-between items-center px-2 sm:px-4 md:px-10 lg:px-20">
      <h1 class="visible lg:invisible text-white text-2xl">Carrusk</h1>
    </div>
    
    <!-- Simple navigation bar -->
    
    <nav class="">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <a @click="goHome" class="flex items-center cursor-pointer">
          <img :src="logo"
               class="h-12 mr-3 rounded-full" 
               alt="Carrusk Monkey Logo"/>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Carrusk</span>
        </a>
        <BurgerMenu ref="BurgerMenu" data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false"/>
        <div ref="listaMenu" class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-2 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a @click="goHome" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent text-gray-900 rounded md:bg-transparent md:text-black md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-700 text-lg cursor-pointer" aria-current="page">Home</a>
            </li>
            <li>
              <a @click="navigateToSection('hero-section')" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg cursor-pointer">About</a>
            </li>
            <li>
              <a @click="navigateToSection('section4')" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg cursor-pointer">Skills</a>
            </li>
            <li>
              <a @click="navigateToSection('section3')" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg cursor-pointer">Projects</a>
            </li>
            <li>
              <a @click="navigateToSection('section5')" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg cursor-pointer">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  
  <!-- Router view to render the current route's component -->
  <div class="font-sans text-gray-700 antialiased">
    <router-view></router-view>
  </div>
</template>

<style>
/* Global override for testing scroll issues */
html, body {
  overflow-y: auto !important; /* Force scrollbars if content overflows */
  height: auto !important; /* Allow height to grow with content */
  background-color: #0f172a !important; /* Tailwind slate-900 - Set a dark page background */
}

#app {
  overflow-y: auto !important; /* Also try on the #app container */
  height: auto !important;
  background-color: #0f172a !important; /* Ensure #app also has dark background */
}
</style>