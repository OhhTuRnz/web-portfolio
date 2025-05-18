<template>
  <component :is="tag" :class="baseClass">
    <template v-for="(line, lineIndex) in displayedLines" :key="lineIndex">
      <div v-if="line.isNewLine && lineIndex > 0" :class="line.divClass">
        <span 
          v-for="(char, charIndex) in line.chars" 
          :key="charIndex" 
          :class="['char-animated', line.spanClass]" 
          :style="{ animationDelay: char.delay + 'ms', animationDuration: fadeDuration + 'ms' }"
        >
          {{ char.char }}
        </span>
      </div>
      <span 
        v-else 
        v-for="(char, charIndex) in line.chars" 
        :key="charIndex" 
        :class="['char-animated', line.spanClass]"
        :style="{ animationDelay: char.delay + 'ms', animationDuration: fadeDuration + 'ms' }"
      >
        {{ char.char }}
      </span>
    </template>
  </component>
</template>

<script>
export default {
  name: 'TypewriterText',
  props: {
    lines: {
      type: Array,
      required: true,
      default: () => []
    },
    tag: {
      type: String,
      default: 'h1' // Default to h1 for previous usage
    },
    baseClass: {
      type: String,
      default: '' // Classes for the root component tag
    },
    speed: { // Time (ms) between each character appearing
      type: Number,
      default: 75
    },
    fadeDuration: { // Time (ms) for each character to fade in
      type: Number,
      default: 300 
    },
    initialDelay: { // Initial delay before this animation starts
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      displayedLines: [],
      totalCharAccumulatedDelay: 0 // Renamed for clarity
    };
  },
  mounted() {
    this.animateText();
  },
  methods: {
    animateText() {
      const newDisplayedLines = [];
      // Start with the initialDelay for the very first character of this component instance
      this.totalCharAccumulatedDelay = this.initialDelay; 

      this.lines.forEach(lineConfig => {
        const lineOutput = {
          chars: [],
          isNewLine: !!lineConfig.isNewLine,
          divClass: lineConfig.divClass || '',
          spanClass: lineConfig.spanClass || ''
        };
        for (let i = 0; i < lineConfig.text.length; i++) {
          lineOutput.chars.push({
            char: lineConfig.text[i],
            // delay for CSS is the accumulated time *for this specific char*
            delay: this.totalCharAccumulatedDelay 
          });
          // Increment accumulated delay for the *next* char
          this.totalCharAccumulatedDelay += this.speed;
        }
        newDisplayedLines.push(lineOutput);
      });
      this.displayedLines = newDisplayedLines;
    }
  }
};
</script>

<style scoped>
@keyframes fadeInChar {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.char-animated {
  display: inline-block; /* Allows transform */
  opacity: 0; /* Start hidden */
  animation-name: fadeInChar;
  animation-fill-mode: forwards; /* Keep state at end of animation */
  white-space: pre-wrap; /* Preserve spaces */
}
</style> 