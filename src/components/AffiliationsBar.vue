<template>
  <transition name="slide-fade">
    <div v-show="showBar" 
         :class="[barClasses, !hasGPUSupport && 'no-gpu-optimized']">
      <div :class="containerClasses">
        <h3 :class="titleClasses">Affiliated Institutions:</h3>
        <div :class="logosClasses" v-memo="[institutions]">
          <LogoCard 
            v-for="institution in institutions"
            :key="institution.name"
            :item="institution"
            :light-card-on-dark-bg="true" 
            imageContainerClass="w-full h-full"
            :class="institutionLogoClasses" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const LogoCard = defineAsyncComponent(() => import('@/components/LogoCard.vue'));

export default {
  name: 'AffiliationsBar',
  components: {
    LogoCard
  },
  props: {
    institutions: {
      type: Array,
      required: true
    },
    showBar: {
      type: Boolean,
      default: false
    },
    hasGPUSupport: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    barClasses() {
      const baseClasses = 'fixed bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 text-white z-40 transition-all duration-300 p-1.5 sm:p-2 md:p-2 lg:p-2.5 xl:p-3 min-h-[44px] sm:min-h-[48px] md:min-h-[52px] lg:min-h-[56px] xl:min-h-[60px]';
      // Remove backdrop-blur and heavy shadows on low-end devices
      return this.hasGPUSupport 
        ? `${baseClasses} shadow-top-lg backdrop-blur-sm`
        : `${baseClasses} shadow-sm`;
    },
    containerClasses() {
      return 'container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl';
    },
    titleClasses() {
      return 'font-medium mb-1 sm:mb-0 sm:mr-2 md:mr-2 lg:mr-3 whitespace-nowrap transition-all duration-300 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm';
    },
    logosClasses() {
      return 'flex items-center justify-center transition-all duration-300 space-x-1.5 sm:space-x-2 md:space-x-2 lg:space-x-2.5 xl:space-x-3';
    },
    institutionLogoClasses() {
      return '!p-0.5 sm:!p-1 !w-9 !h-9 sm:!w-10 sm:!h-10 md:!w-11 md:!h-11 lg:!w-12 lg:!h-12 xl:!w-13 xl:!h-13 2xl:!w-14 2xl:!h-14 transition-all duration-300';
    }
  }
};
</script>

<style scoped>
/* Transition for the sticky bottom bar */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.shadow-top-lg {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Optimized styles for no-GPU devices */
.no-gpu-optimized {
  /* Simplified shadow instead of backdrop-blur */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Responsive design for various screens */
@media screen and (min-width: 1920px) and (max-width: 3840px) {
  .fixed .LogoCard {
    width: 2.75rem !important;
    height: 2.75rem !important;
  }
  
  .fixed h3 {
    font-size: 0.875rem !important;
  }
  
  .fixed {
    padding: 0.5rem !important;
    min-height: 3rem !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1919px) {
  .fixed .LogoCard {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
  
  .fixed h3 {
    font-size: 0.8125rem !important;
  }
  
  .fixed {
    padding: 0.5rem !important;
    min-height: 2.75rem !important;
  }
}

@media screen and (max-width: 640px) {
  .fixed .LogoCard {
    width: 2rem !important;
    height: 2rem !important;
  }
  
  .fixed h3 {
    font-size: 0.75rem !important;
  }
}
</style> 