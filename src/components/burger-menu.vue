<template>
    <div class="burger-menu">
      <!-- Hamburger Button -->
      <button
        class="burger-button"
        :class="{ active: isOpen }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
  
      <!-- Menu -->
    <div class="menu" :class="{ active: isOpen }">
      <!-- Menu Items with Router Links -->
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <!-- Add more menu items as needed -->
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
    scrollToSection(sectionId) {
      // Implement your scrolling logic here, similar to App.vue
      // Example: Use scrollIntoView to scroll to the specified section
      const sectionElement = document.querySelector(`#${sectionId}`);
      if (sectionElement) {
        sectionElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
      this.isOpen = false; // Close the menu after clicking a link
    },
  },
};
</script>
  
  <style scoped>
  /* Style for the burger menu container */
  .burger-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
  }
  
  /* Style for the hamburger button */
  .burger-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  
  .burger-button span {
    display: block;
    width: 50px;
    height: 5px;
    margin: 10px 0;
    background-color: #333; /* Change this color as needed */
    transition: 0.4s;
  }
  
  .burger-button.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-10px, 12px);
  }
  
  .burger-button.active span:nth-child(2) {
    opacity: 0;
  }
  
  .burger-button.active span:nth-child(3) {
    transform: rotate(45deg) translate(-10px, -12px);
  }
  
  /* Style for the menu */
  .menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    display: none;
    flex-direction: column;
    z-index: 999;
  }
  
  .menu.active {
    display: block;
  }
  
  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li {
    padding: 20px;
    text-align: right;
  }
  
  .menu a {
    text-decoration: none;
    color: #333; /* Change this color as needed */
    font-weight: bold;
    font-size: 18px; /* Change this font size as needed */
  }
  
  /* Add more styles as needed to customize your burger menu */
  </style>