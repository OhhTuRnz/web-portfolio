// Composable for particle system logic
import { ref } from 'vue';

// Pre-generate particle styles to avoid runtime calculations
const PARTICLE_COUNT = 15;
const PRE_GENERATED_PARTICLES = generateParticleStylesStatic(PARTICLE_COUNT);

function generateParticleStylesStatic(count) {
  const particles = [];
  const circles = [];
  let keyframesCSS = '';
  
  for (let i = 1; i <= count; i++) {
    const size = Math.floor(Math.random() * 8) + 4;
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 10;
    const endX = Math.random() * 100;
    const endY = -30 - Math.random() * 30;
    const moveDuration = 7000 + Math.random() * 4000;
    const animDelay = Math.random() * 11000;
    const circleDelay = Math.random() * 4000;
    const keyframeName = `moveFrames${i}`;
    
    const keyframe = `
      @keyframes ${keyframeName} {
        from { transform: translate3d(${startX}vw, ${startY}vh, 0); }
        to { transform: translate3d(${endX}vw, ${endY}vh, 0); }
      }
    `;
    
    keyframesCSS += keyframe;
    
    particles.push({
      width: `${size}px`,
      height: `${size}px`,
      animationName: keyframeName,
      animationDuration: `${moveDuration}ms`,
      animationDelay: `${animDelay}ms`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear'
    });
    
    circles.push({
      animationDelay: `${circleDelay}ms`
    });
  }
  
  return { particles, circles, keyframesCSS };
}

export function useParticles() {
  const particleCount = ref(PARTICLE_COUNT);
  const particleStyles = ref(PRE_GENERATED_PARTICLES.particles);
  const circleStyles = ref(PRE_GENERATED_PARTICLES.circles);
  const particleKeyframesCSS = ref(PRE_GENERATED_PARTICLES.keyframesCSS);

  const getParticleStyle = (index) => {
    const i = index - 1; // Convert to 0-based index
    return particleStyles.value[i] || {};
  };

  const getCircleStyle = (index) => {
    const i = index - 1; // Convert to 0-based index
    return circleStyles.value[i] || {};
  };

  const injectKeyframes = () => {
    // Remove existing style element if any
    const existingStyle = document.getElementById('particle-keyframes');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Create new style element with pre-generated keyframes
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = particleKeyframesCSS.value;
    document.head.appendChild(style);
  };

  return {
    particleCount,
    particleStyles,
    circleStyles,
    particleKeyframesCSS,
    getParticleStyle,
    getCircleStyle,
    injectKeyframes
  };
} 