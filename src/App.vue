<script>
import { goHome } from './components/scripts/home.js'; // Adjust the path as needed
import { useRouter } from 'vue-router'; // Import useRouter
import BurgerMenu from './components/burger-menu.vue'; // Import the BurgerMenu component

export default {
  methods: {
    goHome() {
      const router = useRouter();
      goHome(router); // Call the goHome function with the router instance
    },
  },
  components: {
    BurgerMenu
  },
};
</script>

<template>
  <header class="bg-blue-500 p-5 sticky top-0 z-50">
    <div class="flex justify-between items-center px-4 md:px-20">
      <h1 class="visible lg:invisible text-white text-2xl">Carrusk</h1>
      <BurgerMenu class="visible lg:invisible self-end" />
    </div>
    
    <!-- Simple navigation bar -->
    
    <nav class="hidden lg:block">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <a href="https://flowbite.com/" class="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo"/>
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Carrusk</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-700" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/About" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700">About</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700">Services</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700">Pricing</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-blue-700">Contact</a>
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
