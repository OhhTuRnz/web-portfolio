<script>
import { Slide } from 'vue3-burger-menu';
import { goHome } from './components/scripts/home.js'; // Adjust the path as needed
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  methods: {
    goHome() {
      const router = useRouter();
      goHome(router); // Call the goHome function with the router instance
    },
  },
  components: {
    Slide,
  },
};
</script>

<template>
  <div class="app">
    <Slide>
      <!-- "Home" button in the app layout -->
      <div class="text-3xl text-gray-700 text-center font-bold mb-5 bg-gradient-to-r from-violet-300 to-pink-800 bg-clip-text text-transparent">
        <router-link to="/" custom v-slot="{ navigate }">
          <button @click="navigate" role="link">
            Home
          </button>
        </router-link>
      </div>
      <div class="text-3xl text-gray-700 text-center font-bold mb-5 bg-gradient-to-r from-violet-300 to-pink-800 bg-clip-text text-transparent">
        <router-link to="/About" custom v-slot="{ navigate }">
          <button @click="navigate" role="link">
            About
          </button>
        </router-link>
      </div>
    </Slide>
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
</style>