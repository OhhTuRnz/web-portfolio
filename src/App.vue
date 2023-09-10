<script>
import { Slide } from 'vue3-burger-menu';
import { Push } from 'vue3-burger-menu';
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
    Slide,
    Push,
    BurgerMenu
  },
};
</script>

<template>
  <header class="header">
    <!-- Include the Carrusk name and BurgerMenu component here -->
    <div class="header-content">
      <h1 class="My-name">Carrusk</h1>
      <BurgerMenu />
    </div>
  </header>
  <div class="app">
    <div>
      <!-- Router view to render the current route's component -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
/* Global styles for the entire application */
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Style the "Home" button */
.home-button {
  padding: 8px;
  color: #D6CFBE;
  cursor: pointer;
  font-size: 1.5em;
  margin-bottom: 16px;
  border-radius: 4px;
}

.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
}

/* Style the header and its content */
.header {
  background-color: #88b8e8; /* Header background color */
  color: #fff; /* Header text color */
  padding: 20px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.carrusk-name {
  font-family: 'YourFavoriteFont', sans-serif; /* Specify your preferred font */
  font-size: 24px; /* Adjust the font size as needed */
  margin: 0;
}
</style>