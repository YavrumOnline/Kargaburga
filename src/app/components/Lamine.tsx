import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigation } from '@/app/navigation/NavigationController';

// One CSS gradient per topic following color themes - mesh gradient style with color variations
const GRADIENT_MAP: Record<string, string> = {
  // Topic 0 (Values) - Orange spectrum (3 sources: deep brown, bright orange, peach)
  'values': `
    radial-gradient(at 20% 30%, rgba(80, 25, 0, 0.95) 0px, transparent 50%),
    radial-gradient(at 70% 40%, rgba(255, 120, 0, 0.95) 0px, transparent 55%),
    radial-gradient(at 45% 80%, rgba(255, 200, 100, 0.9) 0px, transparent 50%)
  `,
  
  // Topic 1 (Courses) - Cyan/Dark Blue spectrum (3 sources: navy, electric blue, cyan)
  'courses': `
    radial-gradient(at 30% 25%, rgba(0, 40, 100, 0.95) 0px, transparent 50%),
    radial-gradient(at 75% 35%, rgba(0, 150, 255, 0.95) 0px, transparent 55%),
    radial-gradient(at 50% 75%, rgba(100, 255, 255, 0.9) 0px, transparent 50%)
  `,
  
  // Topic 2 (Team) - Purple spectrum (3 sources: deep indigo, vibrant magenta, lilac)
  'team': `
    radial-gradient(at 25% 20%, rgba(40, 5, 100, 0.95) 0px, transparent 50%),
    radial-gradient(at 70% 45%, rgba(180, 40, 255, 0.95) 0px, transparent 55%),
    radial-gradient(at 40% 75%, rgba(220, 120, 255, 0.9) 0px, transparent 50%)
  `,
  
  // Topic 3 (Contact) - Green/Yellow spectrum (3 sources: forest green, lime, bright yellow)
  'contact': `
    radial-gradient(at 20% 35%, rgba(15, 60, 20, 0.95) 0px, transparent 50%),
    radial-gradient(at 65% 30%, rgba(120, 255, 80, 0.95) 0px, transparent 55%),
    radial-gradient(at 50% 80%, rgba(255, 250, 0, 0.95) 0px, transparent 50%)
  `,
  
  // Topic 4 (Login) - Red spectrum (3 sources: burgundy, scarlet, coral)
  'login': `
    radial-gradient(at 30% 30%, rgba(60, 0, 0, 0.95) 0px, transparent 50%),
    radial-gradient(at 70% 40%, rgba(255, 40, 40, 0.95) 0px, transparent 55%),
    radial-gradient(at 45% 75%, rgba(255, 120, 110, 0.9) 0px, transparent 50%)
  `,
};

export function Lamine() {
  const { activeTopicId, activeSlideIndexByTopic } = useNavigation();
  
  const slideIndex = activeSlideIndexByTopic[activeTopicId];
  
  // Get current gradient based on topic only
  const currentGradient = GRADIENT_MAP[activeTopicId] || GRADIENT_MAP['values'];
  
  // Track previous topic and slide to detect changes
  const previousTopicIdRef = useRef(activeTopicId);
  const previousSlideIndexRef = useRef(slideIndex);
  
  // Track rotation angle (increments by 90deg on each horizontal swipe)
  const [rotationAngle, setRotationAngle] = useState(0);
  
  // Track animation states
  const [displayedGradient, setDisplayedGradient] = useState(currentGradient);
  const [previousGradient, setPreviousGradient] = useState<string | null>(null);
  const [previousOpacity, setPreviousOpacity] = useState(0);
  const [currentOpacity, setCurrentOpacity] = useState(0.08);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Track zoom state for each gradient to persist animation progress
  const zoomStateRef = useRef<Record<string, number>>({});
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Handle rotation and gradient changes when slide/topic changes
  useEffect(() => {
    const isTopicChange = previousTopicIdRef.current !== activeTopicId;
    const isSlideChange = previousSlideIndexRef.current !== slideIndex;
    
    if (isTopicChange) {
      // TOPIC CHANGE: Crossfade to new gradient and reset rotation
      const oldGradient = displayedGradient;
      
      setPreviousGradient(oldGradient);
      setPreviousOpacity(0.08); // Start fading out previous
      setDisplayedGradient(currentGradient);
      setCurrentOpacity(0); // Start fading in current
      setRotationAngle(0); // Reset rotation on topic change
      
      // Animate crossfade
      if (!prefersReducedMotion) {
        requestAnimationFrame(() => {
          setPreviousOpacity(0); // Fade out previous
          setCurrentOpacity(0.08); // Fade in current
        });
      } else {
        // No animation for reduced motion
        setPreviousOpacity(0);
        setCurrentOpacity(0.08);
      }
      
      // Clear previous gradient after transition completes
      setTimeout(() => {
        setPreviousGradient(null);
      }, 300);
    } else if (isSlideChange) {
      // SLIDE CHANGE (horizontal swipe): Rotate gradient by 90 degrees
      setRotationAngle(prev => prev + 90);
    }
    
    previousTopicIdRef.current = activeTopicId;
    previousSlideIndexRef.current = slideIndex;
  }, [currentGradient, activeTopicId, slideIndex, displayedGradient, prefersReducedMotion]);
  
  // Continuous zoom animation (100% → 130% → 100%, 6 second cycle)
  const zoomCycleDuration = 6000; // 6 seconds
  
  const calculateScale = (progress: number): number => {
    // Progress is in milliseconds [0, 6000]
    // Map to [1.0, 1.3, 1.0] using sine wave
    const normalizedProgress = (progress % zoomCycleDuration) / zoomCycleDuration;
    // Smooth zoom from 1.0 → 1.3 → 1.0
    const scale = 1.0 + (Math.sin(normalizedProgress * Math.PI * 2 - Math.PI / 2) + 1) * 0.15;
    return scale;
  };
  
  // Animation loop - using CSS variables to avoid React re-renders
  useEffect(() => {
    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--lamine-scale', '1.0');
      }
      return;
    }
    
    let running = true;
    
    const animate = () => {
      if (!running) return;
      
      const now = Date.now();
      const delta = now - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = now;
      
      // Get current zoom progress for the active gradient
      const currentProgress = zoomStateRef.current[activeTopicId] || 0;
      const newProgress = currentProgress + delta;
      
      // Update zoom state
      zoomStateRef.current[activeTopicId] = newProgress;
      
      // Calculate and apply new scale via CSS variable to avoid React re-renders
      const newScale = calculateScale(newProgress);
      
      // Update CSS variable directly on the rotating element
      if (containerRef.current) {
        const rotatingElement = containerRef.current.querySelector('.lamine-rotating') as HTMLElement;
        if (rotatingElement) {
          rotatingElement.style.setProperty('--lamine-scale', newScale.toFixed(3));
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      running = false;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeTopicId, prefersReducedMotion, calculateScale]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 20,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        mixBlendMode: 'multiply',
      }}
    >
      {/* Gradient container with rotation */}
      <div
        className="lamine-rotating absolute inset-0"
        style={{
          transform: `rotate(${rotationAngle}deg) scale(calc(var(--lamine-scale, 1) * 1.5))`,
          transition: prefersReducedMotion ? 'none' : 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: 1000,
          WebkitPerspective: 1000,
        }}
      >
        {/* Current gradient - oversized to prevent gaps during rotation */}
        <div
          className="absolute"
          style={{
            backgroundImage: displayedGradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentOpacity,
            width: '500%',
            height: '500%',
            left: '-200%',
            top: '-200%',
            transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease-in-out',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        />
        
        {/* Previous gradient - oversized to prevent gaps during rotation */}
        {previousGradient && (
          <div
            className="absolute"
            style={{
              backgroundImage: previousGradient,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: previousOpacity,
              width: '500%',
              height: '500%',
              left: '-200%',
              top: '-200%',
              transition: prefersReducedMotion ? 'none' : 'opacity 300ms ease-in-out',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)',
              WebkitTransform: 'translate3d(0, 0, 0)',
            }}
          />
        )}
      </div>
    </div>
  );
}