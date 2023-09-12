<template>
  <div class="burger-menu" @click="toggleMenu">
    <!-- Hamburger Button -->
    <button
      class="burger-button"
      :class="{ active: isOpen }"
      @click.stop="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Menu -->
    <div
      class="menu"
      :class="{ active: isOpen }"
      v-click-away="closeMenu"
    >
      <!-- Menu Items with Router Links -->
      <ul>
        <li>
          <router-link to="/" @click.native="closeMenu">Home</router-link>
        </li>
        <li>
          <router-link to="/about" @click.native="closeMenu">About</router-link>
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
  
  <style scoped>
.burger-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
}

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
  background-color: #333;
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
.menu {
  position: fixed;
  top: 115px;
  right: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}



.menu.active {
  max-height: 400px;
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
  color: #333;
  font-weight: bold;
  font-size: 18px;
}
  </style>