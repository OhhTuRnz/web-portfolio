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
      isMobileNavbarOpen: false,
      clickOutsideAttached: false
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
            const headerHeight = 56;
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
      
      // Attach listener only when menu is open
      if (this.isMobileNavbarOpen && !this.clickOutsideAttached) {
        document.addEventListener('click', this.handleClickOutside, true);
        this.clickOutsideAttached = true;
      } else if (!this.isMobileNavbarOpen && this.clickOutsideAttached) {
        document.removeEventListener('click', this.handleClickOutside, true);
        this.clickOutsideAttached = false;
      }
    },
    closeMobileNavbar() {
      if (this.isMobileNavbarOpen) {
        this.isMobileNavbarOpen = false;
        if (this.BurgerMenuComponent) {
          this.BurgerMenuComponent.closeMenu();
        }
        // Remove listener when menu closes
        if (this.clickOutsideAttached) {
          document.removeEventListener('click', this.handleClickOutside, true);
          this.clickOutsideAttached = false;
        }
      }
    },
    handleNavLinkClick(sectionId) {
      this.navigateToSection(sectionId);
    },
    handleClickOutside(event) {
      // No need for early return - listener only attached when menu is open
      const burgerButtonEl = this.BurgerMenuComponent?.$el;
      const mobileNavbarEl = this.MobileNavbarElement;

      if (burgerButtonEl && !burgerButtonEl.contains(event.target) && 
          mobileNavbarEl && !mobileNavbarEl.contains(event.target)) {
        this.closeMobileNavbar();
      }
    }
  },
  beforeUnmount() {
    // Clean up the persistent click listener
    if (this.clickOutsideAttached) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  },
  computed: {
    headerClasses() {
      return 'bg-white sticky top-0 z-50 ring-1 ring-chromatic shadow-lg transition-all duration-300 p-1 sm:p-1.5 md:p-2 lg:p-2.5 xl:p-3 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[52px] xl:min-h-[56px]';
    },
    logoClasses() {
      return 'rounded-full transition-all duration-300 h-6 sm:h-7 md:h-8 lg:h-8 xl:h-9 w-6 sm:w-7 md:w-8 lg:w-8 xl:w-9';
    },
    logoTextClasses() {
      return 'self-center font-semibold whitespace-nowrap dark:text-white transition-all duration-300 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg';
    },
    mobileNavClasses() {
      return 'md:hidden fixed left-0 w-screen bg-white dark:bg-gray-800 shadow-md z-40 transition-all duration-300 top-[40px] sm:top-[44px] md:top-[48px] lg:top-[52px] xl:top-[56px]';
    }
  }
});
</script>

<template>
  <header :class="headerClasses">
    <nav class="relative">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto px-1 sm:px-2 md:px-4 lg:px-8 xl:px-16 h-full">
        <a @click="goHome" class="flex items-center cursor-pointer space-x-1 sm:space-x-2 rtl:space-x-reverse">
          <img :src="logo"
               :class="logoClasses" 
               alt="Carrusk Monkey Logo"/>
          <span :class="logoTextClasses">Carrusk</span>
        </a>
        
        <BurgerMenu 
          ref="BurgerMenuComponent" 
          @click="toggleMobileNavbar" 
          type="button" 
          class="md:hidden"
          aria-expanded="false" />
        
        <div class="hidden md:block md:w-auto" id="navbar-default-desktop">
          <NavbarLinks @navigate="handleNavLinkClick" :isMobile="false" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-show="isMobileNavbarOpen"
             ref="MobileNavbarElement"
             :class="mobileNavClasses">
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

/* High-resolution laptop header adjustments */
@media screen and (min-width: 1920px) and (max-width: 3840px) {
  /* For high-res laptops like 1920x1080, 3840x2160 */
  header {
    padding: 0.375rem !important; /* Smaller padding for high-res laptops */
    min-height: 3.5rem !important; /* 56px */
  }
  
  header img {
    height: 2rem !important; /* 32px logo */
    width: 2rem !important;
  }
  
  header span {
    font-size: 1.125rem !important; /* 18px text */
  }
}

@media screen and (min-width: 1920px) and (max-width: 3840px) and (-webkit-min-device-pixel-ratio: 2) {
  /* Specifically for high-DPI Windows laptops */
  header {
    padding: 0.25rem !important; /* Even smaller padding */
    min-height: 3rem !important; /* 48px */
  }
  
  header img {
    height: 1.75rem !important; /* 28px logo */
    width: 1.75rem !important;
  }
  
  header span {
    font-size: 1rem !important; /* 16px text */
  }
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