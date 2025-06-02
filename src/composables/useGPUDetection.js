// GPU detection utility
// This detection is used only to set sensible defaults - users can override via UI toggle
export function useGPUDetection() {
  const hasGPUSupport = () => {
    // Check multiple indicators of GPU support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return false;
    
    // Check for hardware acceleration hints
    const hardwareConcurrency = window.navigator.hardwareConcurrency || 1;
    const hasWillChange = CSS.supports('will-change', 'transform');
    const hasBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
    
    // Additional check for WebGL renderer
    let renderer = '';
    try {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    } catch (e) {
      // Ignore errors
    }
    
    // Check if running in software rendering mode
    const isSoftwareRenderer = renderer.toLowerCase().includes('swiftshader') || 
                              renderer.toLowerCase().includes('llvmpipe') ||
                              renderer.toLowerCase().includes('software');
    
    // Conservative approach: disable heavy effects on low-end devices by default
    // Users can still enable animations manually if they want
    return hardwareConcurrency > 2 && 
           hasWillChange && 
           hasBackdropFilter && 
           !isSoftwareRenderer;
  };

  return {
    hasGPUSupport: hasGPUSupport()
  };
} 