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
  methods: {
    goHome() {
      const router = useRouter();
      goHome(router); // Call the goHome function with the router instance
    },
    closeMenu(){
      setTimeout(() => {
        this.$refs.BurgerMenu.closeMenu();
        this.$refs.BurgerMenu.$el.click();
      }, 150);
    }
  },
  components: {
    BurgerMenu
  },
});
</script>

<template>
  <header class="bg-white p-7 sticky top-0 z-50 ring-1 ring-chromatic shadow-lg">
    <div class="flex justify-between items-center px-4 md:px-20">
      <h1 class="visible lg:invisible text-white text-2xl">Carrusk</h1>
    </div>
    
    <!-- Simple navigation bar -->
    
    <nav class="">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <router-link to="/" class="flex items-center" @click="goHome">
          <img :src="logo"
               class="h-12 mr-3 rounded-full" 
               alt="Carrusk Monkey Logo"/>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Carrusk</span>
        </router-link>
        <BurgerMenu ref="BurgerMenu" data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false"/>
        <div ref="listaMenu" class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <router-link to="/" @click="closeMenu" class="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent text-gray-900 rounded md:bg-transparent md:text-black md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-700 text-lg" aria-current="page">Home</router-link>
            </li>
            <li>
              <router-link to="/About" @click="closeMenu" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg">About</router-link>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg">Services</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg">Pricing</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700 text-lg">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  
  <!-- Router view to render the current route's component -->
  <div class="font-sans text-gray-700 text-center">
    <router-view></router-view>
  </div>
</template>