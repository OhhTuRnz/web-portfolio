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

.header {
  background-color: rgba(136, 184, 232, 0.8);
  color: #fff; /* Header text color */
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 999;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.My-name {
  font-size: 1.5em;
  margin: 10px 0;
  color: #ffffff;
  text-align:end;
}

</style>