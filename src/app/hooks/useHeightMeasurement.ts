import { useRef, useCallback, useEffect } from 'react';

interface UseHeightMeasurementOptions {
  minHeight: number;
  maxHeight: number;
  duration?: number;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}

export function useHeightMeasurement({
  minHeight,
  maxHeight,
  duration = 300,
  onAnimationStart,
  onAnimationEnd,
}: UseHeightMeasurementOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentHeightRef = useRef<number>(minHeight);
  const animationFrameRef = useRef<number | null>(null);
  const hasInitializedRef = useRef<boolean>(false);
  const maxHeightRef = useRef<number>(maxHeight);

  // Update maxHeight ref when it changes AND set initial height
  useEffect(() => {
    const previousMaxHeight = maxHeightRef.current;
    maxHeightRef.current = maxHeight;
    
    // Set initial height on mount
    if (containerRef.current && !hasInitializedRef.current) {
      containerRef.current.style.height = `${minHeight}px`;
      currentHeightRef.current = minHeight;
      return;
    }
    
    // When maxHeight changes (e.g., on resize), only re-clamp if current height exceeds new max
    // Do NOT expand to maxHeight if current height is smaller
    if (containerRef.current && hasInitializedRef.current) {
      const currentHeight = currentHeightRef.current;
      
      // Only adjust if current height exceeds the new maxHeight
      if (currentHeight > maxHeight) {
        const newClampedHeight = Math.max(minHeight, Math.min(maxHeight, currentHeight));
        
        if (Math.abs(newClampedHeight - currentHeight) > 1) {
          containerRef.current.style.height = `${newClampedHeight}px`;
          currentHeightRef.current = newClampedHeight;
        }
      }
      // If maxHeight increased but we're below it, do nothing - let content-based measurement handle it
    }
  }, [maxHeight, minHeight]);

  const measureAndAnimate = useCallback((targetHeight?: number) => {
    if (!containerRef.current) return;

    let measuredHeight: number;
    
    if (targetHeight !== undefined) {
      // Use provided height (from external measurement)
      measuredHeight = targetHeight;
    } else if (contentRef.current) {
      // Fallback: measure the content wrapper
      measuredHeight = contentRef.current.scrollHeight;
    } else {
      return;
    }

    const clampedHeight = Math.max(minHeight, Math.min(maxHeightRef.current, measuredHeight));

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      if (containerRef.current) {
        containerRef.current.style.height = `${clampedHeight}px`;
      }
      currentHeightRef.current = clampedHeight;
      return;
    }

    if (Math.abs(clampedHeight - currentHeightRef.current) < 1) {
      return;
    }

    const startHeight = currentHeightRef.current;
    const endHeight = clampedHeight;
    const startTime = performance.now();

    onAnimationStart?.();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Damped oscillation for bouncy spring effect with single bounce
      const damping = 4.5; // Controls how quickly oscillation settles (higher = faster settling)
      const frequency = 1.0; // Single bounce (one full oscillation)
      
      const eased = progress === 1
        ? 1
        : 1 - Math.exp(-damping * progress) * Math.cos(frequency * Math.PI * progress);
      
      const interpolated = startHeight + (endHeight - startHeight) * eased;

      if (containerRef.current) {
        containerRef.current.style.height = `${interpolated}px`;
      }

      currentHeightRef.current = interpolated;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        currentHeightRef.current = endHeight;
        onAnimationEnd?.();
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [minHeight, duration, onAnimationStart, onAnimationEnd]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    containerRef,
    contentRef,
    measureAndAnimate,
  };
}