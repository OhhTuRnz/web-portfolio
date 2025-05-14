<script>
import WhiteSquaresBackground from '@/assets/images/white-squares-background.jpg';
import avatarImage from '@/assets/images/avatar_sample.jpg';
import { Carousel } from 'flowbite';

export default {
    name: 'Home',
    components: {},
    data() {
      return {
        background: WhiteSquaresBackground,
        avatar: avatarImage
      }
    },
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
    <div class="bg-cover bg-center" 
         :style="{ backgroundImage: `url(${background})` }">
        <div class="relative bg-white bg-center px-8 pt-20 pb-40 shadow-xl ring-1 ring-chromatic mx-auto max-w-6xl squared-lg sm:px-20">
            <img :src="WhiteSquaresBackground" alt="" class="absolute" width="1080" />
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
                    <img :src="avatar" alt="Your Presentation Image" class="my-5 mx-auto" />
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
                    <div class="bg-white py-24 sm:py-32">
                    <div class="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">This is my stack</h2>
                        <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48">
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48">
                        <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48">
                        <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48">
                        <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48">
                        </div>
                    </div>
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
