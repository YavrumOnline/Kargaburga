import { TOPIC_THEME_COLORS } from '@/constants/colors';
import { useEffect, useRef } from 'react';

export function DotGrid({ darkMode, activeTopicId }: { darkMode: boolean; activeTopicId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
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
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}