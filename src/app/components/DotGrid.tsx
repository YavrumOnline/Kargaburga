import { TOPIC_THEME_COLORS } from '@/constants/colors';
import { useEffect, useRef } from 'react';

export function DotGrid({ darkMode, activeTopicId }: { darkMode: boolean; activeTopicId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match the currently visible viewport.
    // We deliberately use window.visualViewport instead of window.innerWidth/
    // innerHeight: on iOS Safari, innerHeight reflects the layout viewport
    // (effectively the "toolbar hidden" size), which can be taller than what's
    // actually visible when the address bar/toolbar is showing. visualViewport
    // tracks the real, currently-visible area, and - critically - it fires its
    // own 'resize' event when the toolbar shows/hides, which window's 'resize'
    // event does not reliably do on iOS.
    const getViewportSize = () => ({
      width: window.visualViewport?.width ?? window.innerWidth,
      height: window.visualViewport?.height ?? window.innerHeight,
    });

    const updateSize = () => {
      const { width, height } = getViewportSize();
      canvas.width = width;
      canvas.height = height;
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    window.visualViewport?.addEventListener('resize', updateSize);
    
    // Get theme color
    const themeColor = TOPIC_THEME_COLORS[activeTopicId as keyof typeof TOPIC_THEME_COLORS];
    const baseColor = themeColor || (darkMode ? '#FFFFFF' : '#000000');
    
    // Create dots grid
    const dotSpacing = 20;
    const dotsX = Math.ceil(canvas.width / dotSpacing) + 1;
    const dotsY = Math.ceil(canvas.height / dotSpacing) + 1;
    
    // Create dot data with random blink timing
    const dots: Array<{ x: number; y: number; opacity: number; blinkSpeed: number; blinkPhase: number }> = [];
    
    for (let i = 0; i < dotsX; i++) {
      for (let j = 0; j < dotsY; j++) {
        dots.push({
          x: i * dotSpacing,
          y: j * dotSpacing,
          opacity: Math.random() * 0.6 + 0.2, // Start opacity between 0.2-0.8
          blinkSpeed: Math.random() * 0.04 + 0.02, // Random blink speed (faster)
          blinkPhase: Math.random() * Math.PI * 2, // Random starting phase
        });
      }
    }
    
    // Animation loop
    let animationFrame: number;
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.016; // Approximately 60fps
      
      dots.forEach((dot) => {
        // Calculate blinking opacity using sine wave
        const blink = Math.sin(time * dot.blinkSpeed * 100 + dot.blinkPhase);
        dot.opacity = 0.3 + (blink * 0.3); // Opacity range: 0.0 - 0.6
        
        // Parse color and apply opacity
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateSize);
      window.visualViewport?.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [darkMode, activeTopicId]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}