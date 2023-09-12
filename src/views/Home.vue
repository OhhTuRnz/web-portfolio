
<script>
export default {
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
    <div class="home-page">
        <!-- Navigation Menu -->
        <nav>
            <ul class="flex justify-center mt-4">
                <li>
                <button
                    class="text-black font-bold py-2 px-4 mr-2 rounded"
                    @click="scrollToSection('section1')"
                >
                    Section 1
                </button>
                </li>
                <li>
                <button
                    class="text-black font-bold py-2 px-4 rounded"
                    @click="scrollToSection('section2')"
                >
                    Section 2
                </button>
                </li>
                <li>
                <button
                    class="text-black font-bold py-2 px-4 rounded"
                    @click="scrollToSection('section3')"
                >
                    Section 3
                </button>
                </li>
            </ul>
        </nav>

        <!-- Content Section 1 -->
        <section ref="section1" id="section1">
        <!-- Content for Section 1 -->
            <figure>
                <img src="\src\assets\images\avatar_sample.jpg" alt="Your Presentation Image" class="my-5 mx-auto"/>
                    <figcaption>
                        <div class="mb-4">
                            <p class="text-2xl text-gray-600">Software Engineer | Deep Learning Specialist | AI Enthusiast</p>
                        </div>
                    </figcaption>
            </figure>
            <br><br>
            <div>
                <p class="text-3xl text-gray-800 font-semibold">I'm Alejandro Carrasco</p>
                <p class="text-2xl text-gray-700 mt-4">I'm a Software Engineering student at Universidad Politécnica de Madrid with big aspirations that wants enrichful experiences and never stop learning.</p>
            </div>
        </section>
        <!-- Content Section 2 -->
        <section ref="section2" id="section2">
        <!-- Content for Section 2 -->
            <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-20">
                <h1 class="text-3xl text-gray-700 text-center font-bold mb-5 bg-gradient-to-r from-violet-300 to-pink-800 bg-clip-text text-transparent">
                    Welcome!
                </h1>
                <p class="break-words text-gray-800 text-lg text-center">
                    I'm currently developing my portfolio website!
                    Hope you like it!
                </p>
            </div>
        </section>
        <!-- Add more sections as needed -->
        
        <!-- Rest of the content goes here -->
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
        color: #D6CFBE;
        cursor: pointer;
        font-size: 1.5em;
        margin-bottom: 16px;
        border-radius: 4px;
    }
</style>