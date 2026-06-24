import React, { useState, useRef, useEffect } from 'react';
import { LIGHT_MODE, DARK_MODE } from '@/constants/colors';

interface HorizontalPickerProps {
  items: string[];
  onSelect?: (index: number, item: string) => void;
  height?: number;
  darkMode?: boolean;
}

export function HorizontalPicker({ items, onSelect, height = 60, darkMode }: HorizontalPickerProps) {
  // Real index (0 to items.length - 1)
  const [realIndex, setRealIndex] = useState(0);
  // Virtual index for rendering (includes clones)
  const [virtualIndex, setVirtualIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const currentXRef = useRef(0);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const itemWidth = height * 3; // Each item is 3x the height
  const gap = 0; // No gap between items for simpler calculations

  // Create circular array with more clones for seamless infinite scrolling
  // Pattern: [last 2, ...items, first 2]
  const circularItems = [
    items[items.length - 2],
    items[items.length - 1],
    ...items,
    items[0],
    items[1]
  ];

  useEffect(() => {
    // Notify parent of initial selection
    if (onSelect) {
      onSelect(0, items[0]);
    }
    
    // Measure viewport width
    if (scrollContainerRef.current) {
      setViewportWidth(scrollContainerRef.current.offsetWidth);
      
      const handleResize = () => {
        if (scrollContainerRef.current) {
          setViewportWidth(scrollContainerRef.current.offsetWidth);
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Handle seamless looping after transition completes
  useEffect(() => {
    if (!isTransitioning) return;

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      
      // If we're at a clone, instantly jump to the real item
      if (virtualIndex <= 1) {
        // At one of the last item clones, jump to real last item
        setVirtualIndex(items.length + 1);
      } else if (virtualIndex >= items.length + 2) {
        // At one of the first item clones, jump to real first item
        setVirtualIndex(2);
      }
    }, 400); // Match transition duration

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [virtualIndex, isTransitioning, items.length]);

  const snapToIndex = (newRealIndex: number) => {
    // Calculate which virtual index to go to
    let targetVirtualIndex: number;
    
    if (newRealIndex < 0) {
      // Going backwards from first item
      setRealIndex(items.length - 1);
      targetVirtualIndex = 1; // Go to second-to-last clone
    } else if (newRealIndex >= items.length) {
      // Going forward from last item
      setRealIndex(0);
      targetVirtualIndex = items.length + 2; // Go to first item's second clone
    } else {
      // Normal case
      setRealIndex(newRealIndex);
      targetVirtualIndex = newRealIndex + 2; // +2 because of two prepended clones
    }
    
    setVirtualIndex(targetVirtualIndex);
    setIsTransitioning(true);
    
    if (onSelect) {
      const actualIndex = newRealIndex < 0 ? items.length - 1 : newRealIndex >= items.length ? 0 : newRealIndex;
      onSelect(actualIndex, items[actualIndex]);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current || isTransitioning) return;

    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    startTimeRef.current = Date.now();
    scrollContainerRef.current.style.cursor = 'grabbing';
    
    // Capture pointer to continue receiving events even if cursor leaves element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTransitioning) return;
    currentXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current || isTransitioning) return;

    scrollContainerRef.current.style.cursor = 'grab';
    
    // Release pointer capture
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    
    // Calculate velocity and distance
    const dragTime = Math.max(Date.now() - startTimeRef.current, 1);
    const dragDistance = currentXRef.current - startXRef.current;
    const velocity = Math.abs(dragDistance / dragTime);
    
    // Determine swipe direction based on distance and velocity
    const swipeThreshold = itemWidth * 0.15; // 15% of item width
    const velocityThreshold = 0.3; // pixels per ms
    
    let targetIndex = realIndex;
    
    if (Math.abs(dragDistance) > swipeThreshold || velocity > velocityThreshold) {
      if (dragDistance > 0) {
        // Swiped right - go to previous item
        targetIndex = realIndex - 1;
      } else {
        // Swiped left - go to next item
        targetIndex = realIndex + 1;
      }
    }
    
    // Snap to target index (only if changed)
    if (targetIndex !== realIndex) {
      snapToIndex(targetIndex);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.style.cursor = 'grab';
    
    // Release pointer capture
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Calculate opacity and scale for each item based on distance from center (virtual index)
  const getItemStyle = (index: number) => {
    const isActive = index === virtualIndex;
    const distanceFromSelected = Math.abs(index - virtualIndex);
    const maxDistance = 2;

    const normalizedDistance = Math.min(distanceFromSelected / maxDistance, 1);
    const opacity = isActive ? 1 : 1 - normalizedDistance * 0.7;
    const scale = isActive ? 1.2 : 1 - normalizedDistance * 0.2;
    const fontWeight = isActive ? 700 : 500;

    return { opacity, scale, isActive, fontWeight };
  };

  const textColor = darkMode ? DARK_MODE.TEXT : LIGHT_MODE.TEXT;

  // Calculate the transform to center the selected item
  const getTransform = () => {
    if (!viewportWidth) return `translateX(0px)`;
    const centerOffset = viewportWidth / 2 - itemWidth / 2;
    return `translateX(${centerOffset - virtualIndex * itemWidth}px)`;
  };

  return (
    <div
      data-gesture-exclude
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        marginBottom: '-10px',
        marginTop: '-2px',
      }}
    >
      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '25%',
          background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '25%',
          background: 'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* Container */}
      <div
        ref={scrollContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        data-gesture-exclude
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'grab',
          touchAction: 'pan-x',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Items */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${gap}px`,
            transform: getTransform(),
            transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          }}
        >
          {circularItems.map((item, index) => {
            const style = getItemStyle(index);
            return (
              <div
                key={`${item}-${index}`}
                style={{
                  minWidth: `${itemWidth}px`,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: style.opacity,
                  transform: `scale(${style.scale})`,
                  transition: isTransitioning ? 'opacity 0.4s ease-out, transform 0.4s ease-out' : 'none',
                  fontSize: '14px',
                  fontWeight: style.fontWeight,
                  color: textColor,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  textAlign: 'center',
                  padding: '0 12px',
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}