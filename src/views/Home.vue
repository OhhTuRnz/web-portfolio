<script>
import WhiteSquaresBackground from '../../src/assets/images/white-squares-background.jpg';
import { Carousel, initTE,} from "tw-elements";

initTE({ Carousel });

export default {
    name: 'Home',
    components: {},
    methods: {
        scrollToSection(sectionId) {
            const sectionElement = this.$refs[sectionId];
            if (sectionElement) {
            sectionElement.scrollIntoView({
                behavior: 'smooth',
            });
            }
        },
    },
};
</script>

<template>
    <div class="bg-cover bg-center" style="background-image: url('../../src/assets/images/white-squares-background.jpg');">
        <div class="relative bg-white bg-center px-8 pt-20 pb-12 shadow-xl ring-1 ring-chromatic mx-auto max-w-4xl squared-lg sm:px-20">
        <img src="WhiteSquaresBackground" alt="" class="absolute" width="1080" />
            <div class="home-page">
                <!-- Navigation Menu -->
                <nav>
                <ul class="flex justify-center mt-4">
                    <li>
                    <button class="text-black font-bold py-2 px-4 mr-2 rounded" @click="scrollToSection('section1')">
                        Section 1
                    </button>
                    </li>
                    <li>
                    <button class="text-black font-bold py-2 px-4 rounded" @click="scrollToSection('section2')">
                        Section 2
                    </button>
                    </li>
                    <li>
                    <button class="text-black font-bold py-2 px-4 rounded" @click="scrollToSection('section3')">
                        Section 3
                    </button>
                    </li>
                </ul>
                </nav>

                <!-- Content Section 1 -->
                <section ref="section1" id="section1">
                <!-- Content for Section 1 -->
                <figure>
                    <img src="\src\assets\images\avatar_sample.jpg" alt="Your Presentation Image" class="my-5 mx-auto" />
                    <figcaption>
                    <div class="mb-4">
                        <p class="text-2xl text-gray-600">Software Engineer | Deep Learning Specialist | AI Enthusiast</p>
                    </div>
                    </figcaption>
                </figure>
                <br /><br />
                </section>
                <!-- Content Section 2 -->
                <section ref="section2" id="section2">
                <!-- Content for Section 2 -->
                <div>
                    <p class="text-3xl text-gray-800 font-semibold">I'm Alejandro Carrasco</p>
                    <p class="text-2xl text-gray-700 mt-4">I'm a Software Engineering student at Universidad Politécnica de Madrid with big aspirations that wants enrichful experiences and never stop learning.</p>
                </div>
                <br /><br />
                </section>
                <!-- Content Section 3 -->
                <section ref="section3" id="section3">     
                    <div id="default-carousel" class="relative w-full" data-carousel="slide">
                        <!-- Carousel wrapper -->
                        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                            <!-- Item 1 -->
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="../assets/images/gatito.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            <!-- Item 2 -->
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="../assets/images/gatito.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            <!-- Item 3 -->
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="../assets/images/gatito.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            <!-- Item 4 -->
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="../assets/images/gatito.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            <!-- Item 5 -->
                            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="../assets/images/gatito.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                        </div>
                        <!-- Slider indicators -->
                        <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                            <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                            <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                        </div>
                        <!-- Slider controls -->
                        <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                </svg>
                                <span class="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span class="sr-only">Next</span>
                            </span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vue {
  margin-left: 0.3em;
}

.home-button {
  padding: 8px;
  color: #d6cfbe;
  cursor: pointer;
  font-size: 1.5em;
  margin-bottom: 16px;
  border-radius: 4px;
}
</style>
