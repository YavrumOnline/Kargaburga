import { ReactNode, useRef, useCallback, forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { useHeightMeasurement } from '@/app/hooks/useHeightMeasurement';
import { IndicatorButton } from '@/app/components/IndicatorButton';
import { PillToggle } from '@/app/components/PillToggle';
import { LIGHT_MODE, DARK_MODE } from '@/constants/colors';

export interface CaroContainRef {
  measureAndAnimate: (targetHeight?: number) => void;
  getIndicatorHeight: () => number;
  remeasure: () => void;
}

interface CaroContainParams {
  children: React.ReactNode;
  minHeightPx: number;
  maxHeightVh?: number;
  baseSize?: number;
  backgroundColor?: string;
  lightColor?: string;
  darkColor?: string;
  borderColor?: string;
  darkMode?: boolean;
  borderWidthRatio?: number;
  blurAmountRatio?: number;
  borderRadiusRatio?: number;
  outerOffsetRatio?: number;
  outerBlurRatio?: number;
  outerSpreadRatio?: number;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  onRemeasureRequest?: () => void;
  onContactModeToggle?: () => void;
  onVerticalNavigateNext?: () => void;
  onVerticalNavigatePrev?: () => void;
  activeTopicId: string;
  onLoginSubmit?: () => void;
  onIndicatorHeldChange?: (isHeld: boolean) => void;
  onAddButtonPress?: (isPressed: boolean) => void;
  isAddButtonExpanded?: boolean;
  onSlideSelect?: (index: number) => void;
  disableVerticalNavigation?: boolean;
  showIndicatorTooltipBox?: boolean;
  showAddButtonTooltipBox?: boolean;
  addButtonRef?: React.RefObject<HTMLDivElement>;
}

export const CaroContain = forwardRef<CaroContainRef, CaroContainParams>(({
  children,
  minHeightPx,
  maxHeightVh = 70,
  baseSize = 64,
  backgroundColor = LIGHT_MODE.BACKGROUND,
  lightColor = LIGHT_MODE.LIGHT_SHADOW,
  darkColor = LIGHT_MODE.DARK_SHADOW,
  borderColor = LIGHT_MODE.BORDER,
  darkMode = false,
  borderWidthRatio = 2/64,
  blurAmountRatio = 1/64,
  borderRadiusRatio = 32/64,
  outerOffsetRatio = 6/64,
  outerBlurRatio = 12/64,
  outerSpreadRatio = 2/64,
  onAnimationStart,
  onAnimationEnd,
  onRemeasureRequest,
  onContactModeToggle,
  onVerticalNavigateNext,
  onVerticalNavigatePrev,
  activeTopicId,
  onLoginSubmit,
  onIndicatorHeldChange,
  onAddButtonPress,
  isAddButtonExpanded,
  onSlideSelect,
  disableVerticalNavigation,
  showIndicatorTooltipBox,
  showAddButtonTooltipBox,
  addButtonRef,
}, ref) => {
  const scrollTimeoutRef = useRef<number | null>(null);
  const edgeScrollCountRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const resizeTimeoutRef = useRef<number | null>(null);
  const [loginButtonBlink, setLoginButtonBlink] = useState(false);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  
  // Constants used throughout component
  const indicatorHeight = 48;
  const bottomPadding = 24;
  
  const [maxHeightPx, setMaxHeightPx] = useState(() => 
    typeof window !== 'undefined' ? (window.innerHeight * maxHeightVh) / 100 : 600
  );
  
  const { containerRef, contentRef, measureAndAnimate } = useHeightMeasurement({
    minHeight: minHeightPx,
    maxHeight: maxHeightPx,
    duration: 400,
    onAnimationStart,
    onAnimationEnd,
  });

  // Remeasure function that triggers parent to re-measure content
  const remeasure = useCallback(() => {
    onRemeasureRequest?.();
  }, [onRemeasureRequest]);

  // Expose API to parent
  useImperativeHandle(ref, () => ({
    measureAndAnimate,
    getIndicatorHeight: () => indicatorHeight,
    remeasure,
  }), [measureAndAnimate, remeasure, indicatorHeight]);

  // Handle window resize with debounce
  useEffect(() => {
    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Debounce resize handling
      resizeTimeoutRef.current = window.setTimeout(() => {
        const newMaxHeightPx = (window.innerHeight * maxHeightVh) / 100;
        
        setMaxHeightPx(newMaxHeightPx);
        
        if (activeTopicId === 'courses' && isAddButtonExpanded) {
          if (containerRef.current) {
            containerRef.current.style.height = `${newMaxHeightPx}px`;
          }
          return;
        }
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            Promise.resolve().then(() => {
              remeasure();
            });
          });
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [maxHeightVh, remeasure, activeTopicId, isAddButtonExpanded]);
  
  // Handle vertical scroll for topic navigation
  useEffect(() => {
    const contentElement = (contentRef as any).current;
    if (!contentElement) return;

    const handleScroll = () => {
      // If vertical navigation is disabled (e.g., add button pressed), don't trigger topic changes
      if (disableVerticalNavigation) {
        return;
      }

      const scrollTop = contentElement.scrollTop;
      const scrollHeight = contentElement.scrollHeight;
      const clientHeight = contentElement.clientHeight;
      
      const isScrollable = scrollHeight > clientHeight;
      const atTop = scrollTop === 0;
      const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      
      // Reset edge counter if not at edge
      if (!atTop && !atBottom) {
        edgeScrollCountRef.current = 0;
        lastScrollTopRef.current = scrollTop;
        return;
      }

      // Determine scroll direction
      const scrollingDown = scrollTop > lastScrollTopRef.current;
      const scrollingUp = scrollTop < lastScrollTopRef.current;
      lastScrollTopRef.current = scrollTop;

      // For non-scrollable content, trigger immediately
      if (!isScrollable) {
        if (scrollingDown && onVerticalNavigateNext) {
          onVerticalNavigateNext();
        } else if (scrollingUp && onVerticalNavigatePrev) {
          onVerticalNavigatePrev();
        }
        return;
      }

      // For scrollable content, require edge + continued scroll
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        edgeScrollCountRef.current = 0;
      }, 150);

      // Increment edge scroll counter
      if ((atBottom && scrollingDown) || (atTop && scrollingUp)) {
        edgeScrollCountRef.current++;
        
        // Trigger topic change after 2 edge scroll events
        if (edgeScrollCountRef.current >= 2) {
          edgeScrollCountRef.current = 0;
          if (atBottom && onVerticalNavigateNext) {
            onVerticalNavigateNext();
          } else if (atTop && onVerticalNavigatePrev) {
            onVerticalNavigatePrev();
          }
        }
      }
    };

    contentElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      contentElement.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [onVerticalNavigateNext, onVerticalNavigatePrev, disableVerticalNavigation]);
  
  // Calculate actual pixel values from ratios using baseSize
  const borderWidth = baseSize * borderWidthRatio;
  const blurAmount = baseSize * blurAmountRatio;
  const borderRadius = baseSize * borderRadiusRatio;
  const outerOffsetX = baseSize * outerOffsetRatio;
  const outerOffsetY = baseSize * outerOffsetRatio;
  const outerBlur = baseSize * outerBlurRatio;
  const outerSpread = baseSize * outerSpreadRatio;
  
  // Inset shadow parameters (subtle depth)
  const insetOffsetRatio = 1/64;
  const insetBlurRatio = 1/64;
  const insetSpreadRatio = 1/64;
  const insetOffsetX = baseSize * insetOffsetRatio;
  const insetOffsetY = baseSize * insetOffsetRatio;
  const insetBlur = baseSize * insetBlurRatio;
  const insetSpread = baseSize * insetSpreadRatio;
  
  // Dark mode colors
  const effectiveBackgroundColor = darkMode ? DARK_MODE.BACKGROUND : backgroundColor;
  const effectiveLightColor = darkMode ? DARK_MODE.LIGHT_SHADOW : lightColor;
  const effectiveDarkColor = darkMode ? DARK_MODE.DARK_SHADOW : darkColor;
  const effectiveBorderColor = darkMode ? DARK_MODE.BORDER : borderColor;
  
  // Light mode shadows
  const shadowLight = `
    -${outerOffsetX}px -${outerOffsetY}px ${outerBlur}px ${outerSpread}px ${lightColor},
    ${outerOffsetX}px ${outerOffsetY}px ${outerBlur}px ${outerSpread}px ${darkColor},
    inset -${insetOffsetX}px -${insetOffsetY}px ${insetBlur}px ${insetSpread}px ${lightColor},
    inset ${insetOffsetX}px ${insetOffsetY}px ${insetBlur}px ${insetSpread}px ${darkColor}
  `.replace(/\s+/g, ' ').trim();

  // Dark mode shadows
  const shadowDark = `
    -${outerOffsetX}px -${outerOffsetY}px ${outerBlur}px ${outerSpread}px ${DARK_MODE.LIGHT_SHADOW},
    ${outerOffsetX}px ${outerOffsetY}px ${outerBlur}px ${outerSpread}px ${DARK_MODE.DARK_SHADOW},
    inset -${insetOffsetX}px -${insetOffsetY}px ${insetBlur}px ${insetSpread}px ${DARK_MODE.LIGHT_SHADOW},
    inset ${insetOffsetX}px ${insetOffsetY}px ${insetBlur}px ${insetSpread}px ${DARK_MODE.DARK_SHADOW}
  `.replace(/\s+/g, ' ').trim();
  
  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ 
        width: '90%',
        maxWidth: '90vh',
        minHeight: `${minHeightPx}px`,
        backgroundColor: 'transparent',
        margin: '0 auto',
        pointerEvents: 'auto',
        position: 'relative', // Explicit position for absolute children
        overflow: 'visible', // Prevent layout shifts from absolutely-positioned children
      }}
    >
      {/* Light mode shadow layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: effectiveBackgroundColor,
          boxShadow: shadowLight,
          border: `${borderWidth}px solid ${borderColor}`,
          filter: `blur(${blurAmount}px)`,
          borderRadius: `${borderRadius}px`,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: darkMode ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
        }}
      />
      {/* Dark mode shadow layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: effectiveBackgroundColor,
          boxShadow: shadowDark,
          border: `${borderWidth}px solid ${effectiveBorderColor}`,
          filter: `blur(${blurAmount}px)`,
          borderRadius: `${borderRadius}px`,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: darkMode ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
        }}
      />
      
      <div 
        ref={(node) => {
          if (node) {
            (contentRef as any).current = node;
          }
        }}
        className="relative w-full h-full"
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          scrollbarWidth: 'thin',
          scrollbarColor: `${darkColor}50 transparent`,
          borderRadius: `${borderRadius}px`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pointerEvents: 'auto',
          touchAction: 'none',
          zIndex: 10,
        }}
      >
        {/* Content Zone - flexible height, centers content when short */}
        <div 
          ref={scrollableContentRef}
          style={{ 
            flex: '1 1 auto', 
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            touchAction: 'auto',
          }}
        >
          {children}
        </div>
        
        {/* Control Zone - fixed height for indicators/buttons */}
        {activeTopicId === 'login' ? (
          <div 
            style={{ 
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: `${bottomPadding}px`,
              paddingTop: `${bottomPadding / 2}px`,
              pointerEvents: 'auto',
              touchAction: 'none',
            }}
          >
            <PillToggle
              mode="action"
              label="Giriş Yap"
              pressed={false}
              onClick={() => {
                setLoginButtonBlink(true);
                setTimeout(() => setLoginButtonBlink(false), 200);
                onLoginSubmit?.();
              }}
              height={indicatorHeight}
              darkMode={darkMode}
              blinkColor={loginButtonBlink ? '#ff4444' : undefined}
            />
          </div>
        ) : (
          <div 
            style={{ 
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: `${bottomPadding}px`,
              paddingTop: `${bottomPadding / 4}px`,
              pointerEvents: 'auto',
              touchAction: 'none',
              position: 'relative',
              height: `${indicatorHeight + bottomPadding + bottomPadding / 4}px`,
              overflow: 'visible',
            }}
          >
            <IndicatorButton 
              height={indicatorHeight} 
              onContactModeToggle={onContactModeToggle} 
              onHeldChange={(held) => {
                onIndicatorHeldChange?.(held);
              }}
              onAddButtonPress={onAddButtonPress}
              isAddButtonExpanded={isAddButtonExpanded}
              onSlideSelect={onSlideSelect}
              darkMode={darkMode}
              showTooltipBox={showIndicatorTooltipBox}
              addButtonRef={addButtonRef}
              showAddButtonTooltipBox={showAddButtonTooltipBox}
            />
          </div>
        )}
      </div>
    </div>
  );
});

CaroContain.displayName = 'CaroContain';