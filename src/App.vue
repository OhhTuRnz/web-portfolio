<script>
import { useRouter } from 'vue-router';
import BurgerMenu from '@/components/burger-menu.vue';
import NavbarLinks from '@/components/NavbarLinks.vue';
import { defineComponent, watch, ref } from 'vue';
import logoImage from '@logos/carrusk_logo_monkey.jpeg';

export default defineComponent({
  name: 'App',
  components: {
    BurgerMenu,
    NavbarLinks
  },
  data() {
    return {
      logo: logoImage,
      isMobileNavbarOpen: false
    }
  },
  setup() {
    const router = useRouter();
    const BurgerMenuComponent = ref(null);
    const MobileNavbarElement = ref(null);

    return { router, BurgerMenuComponent, MobileNavbarElement };
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
      this.closeMobileNavbar();
    },
    scrollToElement(elementId) {
      setTimeout(() => {
        if (elementId === 'hero-section' || elementId === 'home-top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(elementId);
          if (element) {
            const headerHeight = 80;
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
    toggleMobileNavbar() {
      this.isMobileNavbarOpen = !this.isMobileNavbarOpen;
      if (this.BurgerMenuComponent) {
        this.BurgerMenuComponent.toggleMenu();
      }
      if (this.isMobileNavbarOpen) {
        document.addEventListener('click', this.handleClickOutside, true);
      } else {
        document.removeEventListener('click', this.handleClickOutside, true);
      }
    },
    closeMobileNavbar() {
      if (this.isMobileNavbarOpen) {
        this.isMobileNavbarOpen = false;
        if (this.BurgerMenuComponent) {
          this.BurgerMenuComponent.closeMenu();
        }
        document.removeEventListener('click', this.handleClickOutside, true);
      }
    },
    handleNavLinkClick(sectionId) {
      this.navigateToSection(sectionId);
    },
    handleClickOutside(event) {
      const burgerButtonEl = this.BurgerMenuComponent?.$el;
      const mobileNavbarEl = this.MobileNavbarElement;

      if (burgerButtonEl && !burgerButtonEl.contains(event.target) && 
          mobileNavbarEl && !mobileNavbarEl.contains(event.target)) {
        this.closeMobileNavbar();
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }
});
</script>

<template>
  <header class="bg-white p-3 sm:p-4 sticky top-0 z-50 ring-1 ring-chromatic shadow-lg">
    <div class="flex justify-between items-center px-2 sm:px-4 md:px-10 lg:px-20">
      <h1 class="visible lg:invisible text-white text-2xl">Carrusk</h1>
    </div>
    
    <nav class="relative">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <a @click="goHome" class="flex items-center cursor-pointer space-x-3 rtl:space-x-reverse">
          <img :src="logo"
               class="h-12 rounded-full" 
               alt="Carrusk Monkey Logo"/>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Carrusk</span>
        </a>
        
        <BurgerMenu 
          ref="BurgerMenuComponent" 
          @click="toggleMobileNavbar" 
          type="button" 
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
          aria-expanded="false" />
        
        <div class="hidden md:block md:w-auto" id="navbar-default-desktop">
          <NavbarLinks @navigate="handleNavLinkClick" :isMobile="false" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-show="isMobileNavbarOpen"
             ref="MobileNavbarElement"
             class="md:hidden fixed top-[104px] left-0 w-screen bg-white dark:bg-gray-800 shadow-md z-40">
          <NavbarLinks @navigate="handleNavLinkClick" :isMobile="true" />
        </div>
      </Transition>
    </nav>
  </header>
  
  <div class="font-sans text-gray-700 antialiased">
    <router-view></router-view>
  </div>
</template>

<style>
/* Global override for testing scroll issues */
html, body {
  overflow-y: auto !important;
  height: auto !important;
  background-color: #0f172a !important;
}

#app {
  overflow-y: auto !important;
  height: auto !important;
  background-color: #0f172a !important;
}

/* Slide-fade transition for the mobile menu */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  overflow: hidden;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
  max-height: 0px;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
  max-height: 500px;
}
</style>