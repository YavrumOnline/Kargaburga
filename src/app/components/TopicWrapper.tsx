import { ReactNode, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { TopicId } from '@/app/navigation/NavigationController';

export interface TopicWrapperRef {
  remeasureCurrentSlide: (force?: boolean) => void;
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollToSlide: (index: number) => void;
}

interface TopicWrapperProps {
  topicId: TopicId;
  isActive: boolean;
  targetSlideIndex: number;
  children: ReactNode;
  onSnapComplete: (slideIndex: number, measuredHeight: number) => void;
  onSlideChange?: (slideIndex: number) => void;
  isDraggingDisabled?: boolean;
}

export const TopicWrapper = forwardRef<TopicWrapperRef, TopicWrapperProps>(({
  topicId,
  isActive,
  targetSlideIndex,
  children,
  onSnapComplete,
  onSlideChange,
  isDraggingDisabled = false,
}, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    loop: true,
    align: 'start',
    skipSnaps: false,
    duration: 20,
    dragFree: false,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    startIndex: 0,
    watchDrag: false,
    watchResize: true,
    watchSlides: true,
  });

  const lastSnapIndexRef = useRef<number>(-1);
  const lastScrollTimeRef = useRef<number>(0);
  const lastMeasurementTimeRef = useRef<number>(0);
  const measurementTimeoutRef = useRef<number | null>(null);
  const SCROLL_COOLDOWN = 800; // Cooldown in milliseconds to prevent rapid slide changes

  // Measure current slide
  const measureCurrentSlide = (force?: boolean) => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    const slideNodes = emblaApi.slideNodes();
    const currentSlide = slideNodes[currentIndex];
    
    if (!currentSlide) {
      return;
    }
    
    const attemptMeasurement = (retryCount = 0) => {
      const slideContent = currentSlide as HTMLElement;
      
      if (force && retryCount === 0) {
        void slideContent.offsetHeight;
        void slideContent.scrollHeight;
        
        const scrollHeight = slideContent.scrollHeight;
        const offsetHeight = slideContent.offsetHeight;
        const clientHeight = slideContent.clientHeight;
        const boundingHeight = Math.ceil(slideContent.getBoundingClientRect().height);
        
        let childrenHeight = 0;
        for (let i = 0; i < slideContent.children.length; i++) {
          const child = slideContent.children[i] as HTMLElement;
          void child.offsetHeight;
          const childRect = child.getBoundingClientRect();
          const childScrollHeight = child.scrollHeight;
          childrenHeight = Math.max(childrenHeight, childRect.height, childScrollHeight);
        }
        
        const measuredHeight = Math.max(scrollHeight, offsetHeight, clientHeight, boundingHeight, childrenHeight);
        
        lastMeasurementTimeRef.current = Date.now();
        onSnapComplete(currentIndex, measuredHeight);
        return;
      }
      
      if (!slideContent.isConnected || !document.body.contains(slideContent)) {
        if (retryCount < 30) {
          setTimeout(() => attemptMeasurement(retryCount + 1), 50);
          return;
        }
        onSnapComplete(currentIndex, 600);
        return;
      }
      
      const computedStyle = window.getComputedStyle(slideContent);
      if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
        if (retryCount < 30) {
          setTimeout(() => attemptMeasurement(retryCount + 1), 50);
          return;
        }
      }
      
      if (retryCount === 0) {
        const images = slideContent.querySelectorAll('img');
        const unloadedImages = Array.from(images).filter(img => !img.complete);
        
        if (unloadedImages.length > 0) {
          setTimeout(() => attemptMeasurement(retryCount + 1), 100);
          return;
        }
      }
      
      void slideContent.offsetHeight;
      void slideContent.scrollHeight;
      
      const scrollHeight = slideContent.scrollHeight;
      const offsetHeight = slideContent.offsetHeight;
      const clientHeight = slideContent.clientHeight;
      const boundingHeight = Math.ceil(slideContent.getBoundingClientRect().height);
      
      let childrenHeight = 0;
      for (let i = 0; i < slideContent.children.length; i++) {
        const child = slideContent.children[i] as HTMLElement;
        void child.offsetHeight;
        const childRect = child.getBoundingClientRect();
        const childScrollHeight = child.scrollHeight;
        childrenHeight = Math.max(childrenHeight, childRect.height, childScrollHeight);
      }
      
      const measuredHeight = Math.max(scrollHeight, offsetHeight, clientHeight, boundingHeight, childrenHeight);
      
      if (measuredHeight === 0 && retryCount < 30) {
        setTimeout(() => attemptMeasurement(retryCount + 1), 50);
        return;
      }
      
      if (measuredHeight === 0) {
        const fallbackHeight = Math.min(window.innerHeight * 0.6, 600);
        lastMeasurementTimeRef.current = Date.now();
        onSnapComplete(currentIndex, fallbackHeight);
        return;
      }
      
      lastMeasurementTimeRef.current = Date.now();
      onSnapComplete(currentIndex, measuredHeight);
    };
    
    attemptMeasurement();
  };

  // Programmatic navigation methods
  const scrollNext = () => {
    if (emblaApi) {
      const currentTime = Date.now();
      if (currentTime - lastScrollTimeRef.current < SCROLL_COOLDOWN) return;
      lastScrollTimeRef.current = currentTime;
      emblaApi.scrollNext();
    }
  };

  const scrollPrev = () => {
    if (emblaApi) {
      const currentTime = Date.now();
      if (currentTime - lastScrollTimeRef.current < SCROLL_COOLDOWN) return;
      lastScrollTimeRef.current = currentTime;
      emblaApi.scrollPrev();
    }
  };

  const scrollToSlide = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index, false);
    }
  };

  // Expose remeasure function and programmatic controls
  useImperativeHandle(ref, () => ({
    remeasureCurrentSlide: measureCurrentSlide,
    scrollNext,
    scrollPrev,
    scrollToSlide,
  }), [emblaApi, onSnapComplete]);

  // Navigate to target slide when topic becomes active or target changes
  useEffect(() => {
    if (isActive && emblaApi) {
      const currentIndex = emblaApi.selectedScrollSnap();
      
      if (currentIndex !== targetSlideIndex) {
        emblaApi.scrollTo(targetSlideIndex, false);
      }
    }
  }, [isActive, targetSlideIndex, emblaApi]);

  // Listen for snap events
  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      
      if (onSlideChange && currentIndex !== lastSnapIndexRef.current) {
        onSlideChange(currentIndex);
      }
      
      if (currentIndex !== lastSnapIndexRef.current) {
        lastSnapIndexRef.current = currentIndex;
        
        if (measurementTimeoutRef.current !== null) {
          clearTimeout(measurementTimeoutRef.current);
          measurementTimeoutRef.current = null;
        }
        
        measurementTimeoutRef.current = window.setTimeout(() => {
          measureCurrentSlide();
          measurementTimeoutRef.current = null;
        }, 0);
      }
    };

    const handleSettle = () => {
    };

    emblaApi.on('select', handleSelect);
    emblaApi.on('settle', handleSettle);

    const handleInit = () => {
      if (measurementTimeoutRef.current !== null) {
        clearTimeout(measurementTimeoutRef.current);
      }
      
      const currentIndex = emblaApi.selectedScrollSnap();
      if (onSlideChange) {
        onSlideChange(currentIndex);
      }
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measurementTimeoutRef.current = window.setTimeout(() => {
            measureCurrentSlide();
            measurementTimeoutRef.current = null;
          }, 50);
        });
      });
    };
    
    emblaApi.on('init', handleInit);
    
    if (emblaApi.slideNodes().length > 0) {
      const currentIndex = emblaApi.selectedScrollSnap();
      if (onSlideChange) {
        onSlideChange(currentIndex);
      }
      
      if (measurementTimeoutRef.current !== null) {
        clearTimeout(measurementTimeoutRef.current);
      }
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measurementTimeoutRef.current = window.setTimeout(() => {
            measureCurrentSlide();
            measurementTimeoutRef.current = null;
          }, 50);
        });
      });
    }

    return () => {
      if (measurementTimeoutRef.current !== null) {
        clearTimeout(measurementTimeoutRef.current);
        measurementTimeoutRef.current = null;
      }
      emblaApi.off('select', handleSelect);
      emblaApi.off('settle', handleSettle);
      emblaApi.off('init', handleInit);
    };
  }, [emblaApi, onSnapComplete, onSlideChange]);

  // Only mount Embla when topic is active
  if (!isActive) {
    return null;
  }

  return (
    <div 
      className="embla" 
      ref={emblaRef} 
      style={{ 
        overflow: 'hidden', 
        width: '100%',
        pointerEvents: isDraggingDisabled ? 'none' : 'auto',
      }}
    >
      <div 
        className="embla__container" 
        style={{ 
          display: 'flex',
          alignItems: 'flex-start',
          pointerEvents: isDraggingDisabled ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
});

TopicWrapper.displayName = 'TopicWrapper';