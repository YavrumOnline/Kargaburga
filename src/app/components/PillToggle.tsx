import { generateNeumorphicShadow, useBounceAnimation } from '@/app/utils/neumorphicUtils';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { LIGHT_MODE, DARK_MODE } from '@/constants/colors';

type PillToggleMode = 'indicator' | 'action';

interface PillToggleParams {
  // Base height (all other values calculated as proportions of this)
  height?: number; // in px
  
  // Mode and state
  mode: PillToggleMode;
  pressed?: boolean;
  disabled?: boolean;
  darkMode?: boolean;
  
  // Content (mode-dependent)
  label?: string;
  icon?: ReactNode;
  dotsCount?: number;
  activeDotIndex?: number;
  
  // Callback
  onClick?: () => void;
  onHeldChange?: (isHeld: boolean) => void;
  onSlideSelect?: (index: number) => void; // New callback for slide selection during hold
  
  // Colors
  backgroundColor?: string;
  lightColor?: string;
  darkColor?: string;
  borderColor?: string;
  textColor?: string;
  
  // Blink animation
  blinkColor?: string; // Color to blink to (e.g., '#ff0000' for red)
  
  // Proportional values (as ratio of height)
  borderWidthRatio?: number;
  blurAmountRatio?: number;
  paddingXRatio?: number;
  
  // Shadow OFF (raised state) - outer shadows (as ratio of height)
  outerOffsetRatio?: number;
  outerBlurRatio?: number;
  outerSpreadRatio?: number;
  
  // Shadow OFF (raised state) - inset shadows (as ratio of height)
  insetOffOffsetRatio?: number;
  insetOffBlurRatio?: number;
  insetOffSpreadRatio?: number;
  
  // Shadow ON (pressed state) - inset shadows (as ratio of height)
  insetOnOffsetRatio?: number;
  insetOnBlurRatio?: number;
  insetOnSpreadRatio?: number;
  
  // Shadow ON (pressed state) - outer shadows (as ratio of height)
  outerOnOffsetRatio?: number;
  outerOnBlurRatio?: number;
  outerOnSpreadRatio?: number;
}

export function PillToggle({
  height = 64,
  mode,
  pressed = false,
  disabled = false,
  darkMode = false,
  label,
  icon,
  dotsCount = 0,
  activeDotIndex = 0,
  onClick,
  onHeldChange,
  onSlideSelect,
  backgroundColor = LIGHT_MODE.BACKGROUND,
  lightColor = LIGHT_MODE.LIGHT_SHADOW,
  darkColor = LIGHT_MODE.DARK_SHADOW,
  borderColor = LIGHT_MODE.BORDER,
  textColor = '#3A3A3A',
  blinkColor, // No default - only used when explicitly provided
  borderWidthRatio = 2/64,        // 2px at 64px height
  blurAmountRatio = 1/64,         // 1px at 64px height
  paddingXRatio = 24/64,          // 24px at 64px height
  outerOffsetRatio = 6/64,        // 6px at 64px height
  outerBlurRatio = 12/64,         // 12px at 64px height
  outerSpreadRatio = 2/64,        // 2px at 64px height
  insetOffOffsetRatio = 1/64,     // 1px at 64px height
  insetOffBlurRatio = 1/64,       // 1px at 64px height
  insetOffSpreadRatio = 1/64,     // 1px at 64px height
  insetOnOffsetRatio = 6/64,      // 6px at 64px height
  insetOnBlurRatio = 8/64,        // 8px at 64px height
  insetOnSpreadRatio = 2/64,      // 2px at 64px height
  outerOnOffsetRatio = 1/64,      // 1px at 64px height
  outerOnBlurRatio = 1/64,        // 1px at 64px height
  outerOnSpreadRatio = 2/64,      // 2px at 64px height
}: PillToggleParams) {
  const { isBouncing, triggerBounce } = useBounceAnimation();
  const [isHeld, setIsHeld] = useState(false);
  const [showExpandBounce, setShowExpandBounce] = useState(false);
  const [showCollapseBounce, setShowCollapseBounce] = useState(false);
  const [dotsAnimationKey, setDotsAnimationKey] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const initialPositionRef = useRef<{ x: number; startIndex: number } | null>(null);
  const prevIsHeldRef = useRef(false);
  const prevDotsCountRef = useRef(dotsCount);
  
  // Calculate actual pixel values from ratios
  const borderWidth = height * borderWidthRatio;
  const blurAmount = height * blurAmountRatio;
  const paddingX = height * paddingXRatio;
  
  // Dark mode colors
  const effectiveBackgroundColor = darkMode ? DARK_MODE.BACKGROUND : backgroundColor;
  const effectiveLightColor = darkMode ? DARK_MODE.LIGHT_SHADOW : lightColor;
  const effectiveDarkColor = darkMode ? DARK_MODE.DARK_SHADOW : darkColor;
  const effectiveBorderColor = darkMode ? DARK_MODE.BORDER : borderColor;
  const effectiveTextColor = darkMode ? DARK_MODE.TEXT_SECONDARY : textColor;
  
  // Light mode shadows
  const shadowOffLight = generateNeumorphicShadow({
    size: height,
    lightColor: lightColor,
    darkColor: darkColor,
    outerOffsetRatio,
    outerBlurRatio,
    outerSpreadRatio,
    insetOffsetRatio: insetOffOffsetRatio,
    insetBlurRatio: insetOffBlurRatio,
    insetSpreadRatio: insetOffSpreadRatio,
    isDarkMode: false,
  });
  
  const shadowOnLight = generateNeumorphicShadow({
    size: height,
    lightColor: lightColor,
    darkColor: darkColor,
    outerOffsetRatio: outerOnOffsetRatio,
    outerBlurRatio: outerOnBlurRatio,
    outerSpreadRatio: outerOnSpreadRatio,
    insetOffsetRatio: insetOnOffsetRatio,
    insetBlurRatio: insetOnBlurRatio,
    insetSpreadRatio: insetOnSpreadRatio,
    isDarkMode: false,
  });

  // Dark mode shadows
  const shadowOffDark = generateNeumorphicShadow({
    size: height,
    lightColor: DARK_MODE.LIGHT_SHADOW,
    darkColor: DARK_MODE.DARK_SHADOW,
    outerOffsetRatio,
    outerBlurRatio,
    outerSpreadRatio,
    insetOffsetRatio: insetOffOffsetRatio,
    insetBlurRatio: insetOffBlurRatio,
    insetSpreadRatio: insetOffSpreadRatio,
    isDarkMode: true,
  });
  
  const shadowOnDark = generateNeumorphicShadow({
    size: height,
    lightColor: DARK_MODE.LIGHT_SHADOW,
    darkColor: DARK_MODE.DARK_SHADOW,
    outerOffsetRatio: outerOnOffsetRatio,
    outerBlurRatio: outerOnBlurRatio,
    outerSpreadRatio: outerOnSpreadRatio,
    insetOffsetRatio: insetOnOffsetRatio,
    insetBlurRatio: insetOnBlurRatio,
    insetSpreadRatio: insetOnSpreadRatio,
    isDarkMode: true,
  });

  const handleClick = () => {
    if (mode === 'action' && !disabled && onClick) {
      triggerBounce();
      onClick();
    }
  };
  
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (mode === 'indicator') {
      // Capture pointer to ensure we receive pointerup even if released outside element
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsHeld(true);
      initialPositionRef.current = { x: e.clientX, startIndex: activeDotIndex };
    }
  };
  
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (mode === 'indicator' && isHeld && dotsCount && dotsCount > 0 && initialPositionRef.current && onSlideSelect) {
      // Calculate delta from initial position
      const deltaX = e.clientX - initialPositionRef.current.x;
      
      // Calculate which segment based on delta from start position
      const collapsedWidth = calculateCollapsedWidth();
      if (typeof collapsedWidth === 'number' && collapsedWidth > 0) {
        const expandedWidth = collapsedWidth * 2;
        const segmentWidth = expandedWidth / dotsCount;
        
        // Calculate how many segments we've moved from the initial position
        const segmentsDelta = Math.round(deltaX / segmentWidth);
        const selectedIndex = initialPositionRef.current.startIndex + segmentsDelta;
        
        // Clamp to valid range
        const clampedIndex = Math.max(0, Math.min(dotsCount - 1, selectedIndex));
        
        if (clampedIndex !== activeDotIndex) {
          onSlideSelect(clampedIndex);
        }
      }
    }
  };
  
  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (mode === 'indicator') {
      // Release pointer capture
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setIsHeld(false);
      initialPositionRef.current = null;
    }
  };
  
  const handlePointerCancel = (e: React.PointerEvent<HTMLElement>) => {
    if (mode === 'indicator') {
      // Release pointer capture
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      setIsHeld(false);
      initialPositionRef.current = null;
    }
  };

  const isInteractive = mode === 'action' && !disabled;
  const Element = isInteractive ? 'button' : 'div';

  // Dots renderer for indicator mode
  const renderDots = () => {
    if (mode !== 'indicator' || dotsCount === 0) return null;
    
    const baseDotSize = height * 0.15;
    const collapsedWidth = calculateCollapsedWidth();
    const shadowBlur = baseDotSize; // Shadow blur equal to base dot size for more pronounced effect
    
    // Calculate gap based on current state
    let dotGap: number;
    if (isHeld && typeof collapsedWidth === 'number') {
      // When held, expand to 2x width - redistribute space between dots
      const expandedWidth = collapsedWidth * 2;
      // Calculate total dot width based on held state sizing
      // Account for mixed sizes: (dotsCount - 1) dots at 1.5x + 1 active dot at 2x
      const activeDotSize = baseDotSize * 2;
      const inactiveDotSize = baseDotSize * 1.5;
      const totalDotWidth = (dotsCount - 1) * inactiveDotSize + activeDotSize;
      const availableGapSpace = expandedWidth - totalDotWidth - (paddingX * 2);
      dotGap = availableGapSpace / (dotsCount - 1);
    } else {
      // Collapsed state - use standard gap
      dotGap = height * 0.12;
    }
    
    return (
      <div 
        className="flex items-center justify-center"
        style={{ 
          gap: `${dotGap}px`, 
          height: '100%',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          transition: 'gap 0.2s ease-in-out',
        }}
      >
        {Array.from({ length: dotsCount }).map((_, index) => {
          const isActive = index === activeDotIndex;
          // When held: all dots 1.5x, active dot 2x
          // When not held: all dots normal size
          let dotScale = 1;
          if (isHeld) {
            dotScale = isActive ? 2 : 1.5;
          }
          const dotSize = baseDotSize * dotScale;
          
          // Calculate distance from center for staggered animation
          const centerIndex = (dotsCount - 1) / 2;
          const distanceFromCenter = Math.abs(index - centerIndex);
          const appearDelay = distanceFromCenter * 0.05; // 50ms per step from center
          const pulseDelay = appearDelay + 0.3; // Start pulsing after appear animation completes
          
          // Combine animations: all dots appear from center, then active dot pulses
          const animation = isActive 
            ? `dotAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${appearDelay}s both, dotPulse 0.8s ease-in-out ${pulseDelay}s infinite`
            : `dotAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${appearDelay}s both`;
          
          return (
            <div
              key={`${index}-${dotsAnimationKey}`}
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                borderRadius: '50%',
                backgroundColor: isActive ? effectiveTextColor : `${effectiveTextColor}40`,
                transition: 'background-color 0.5s ease-in-out, width 0.2s ease-in-out, height 0.2s ease-in-out, filter 0.2s ease-in-out',
                animation,
                filter: isHeld ? `drop-shadow(0 0 ${shadowBlur}px rgba(0, 0, 0, 0.5))` : 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          );
        })}
      </div>
    );
  };

  // Calculate collapsed width for indicator mode
  const calculateCollapsedWidth = () => {
    if (mode !== 'indicator' || dotsCount === 0) return 'fit-content';
    
    const dotSize = height * 0.15;
    const dotGap = height * 0.12;
    const dotsWidth = dotsCount * dotSize;
    const gapsWidth = (dotsCount - 1) * dotGap;
    const totalWidth = paddingX * 2 + dotsWidth + gapsWidth;
    
    return totalWidth; // Return as number instead of string
  };

  // Calculate width based on mode and content
  const calculateWidth = () => {
    if (mode === 'indicator') {
      const collapsedWidth = calculateCollapsedWidth();
      if (typeof collapsedWidth === 'number') {
        return isHeld ? `${collapsedWidth * 2}px` : `${collapsedWidth}px`;
      }
      return collapsedWidth;
    }
    
    // For action mode with icon only, make it circular (square)
    if (mode === 'action' && icon && !label) {
      return `${height}px`;
    }
    
    // For action mode with text or text+icon, use fit-content
    return 'fit-content';
  };

  // Calculate padding based on mode and content
  const calculatePadding = () => {
    // For action mode with icon only (circular button), no horizontal padding
    if (mode === 'action' && icon && !label) {
      return { paddingLeft: 0, paddingRight: 0 };
    }
    
    // For all other cases, use standard padding
    return { paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` };
  };

  useEffect(() => {
    if (onHeldChange) {
      onHeldChange(isHeld);
    }
  }, [isHeld, onHeldChange]);

  // Trigger bounce animations on held state transitions
  useEffect(() => {
    const wasHeld = prevIsHeldRef.current;
    const isNowHeld = isHeld;
    
    if (mode === 'indicator' && wasHeld !== isNowHeld) {
      if (isNowHeld && !wasHeld) {
        // Transitioning to held state - trigger expand bounce
        const timer = setTimeout(() => {
          setShowExpandBounce(true);
          // Clear expand bounce after animation completes
          setTimeout(() => setShowExpandBounce(false), 300);
        }, 250);
        
        prevIsHeldRef.current = true;
        return () => clearTimeout(timer);
      } else if (!isNowHeld && wasHeld) {
        // Transitioning from held state - trigger collapse bounce
        const timer = setTimeout(() => {
          setShowCollapseBounce(true);
          // Clear collapse bounce after animation completes
          setTimeout(() => setShowCollapseBounce(false), 300);
        }, 250);
        
        prevIsHeldRef.current = false;
        return () => clearTimeout(timer);
      }
    }
    
    // Update ref for non-indicator modes or when no transition occurs
    prevIsHeldRef.current = isNowHeld;
  }, [isHeld, mode]);

  // Re-trigger dots animation when dotsCount changes
  useEffect(() => {
    if (dotsCount !== prevDotsCountRef.current) {
      setDotsAnimationKey(prev => prev + 1);
      prevDotsCountRef.current = dotsCount;
    }
  }, [dotsCount]);

  return (
    <Element
      className="rounded-full relative"
      style={{ 
        height: `${height}px`,
        ...calculatePadding(),
        width: calculateWidth(),
        backgroundColor: 'transparent',
        animation: isBouncing ? 'bounce 0.3s ease-out' : (showExpandBounce ? 'horizontalBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : (showCollapseBounce ? 'horizontalBounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none')),
        cursor: isInteractive ? 'pointer' : (mode === 'indicator' ? 'grab' : 'default'),
        pointerEvents: mode === 'indicator' ? 'auto' : (isInteractive ? 'auto' : 'none'),
        opacity: disabled ? 0.5 : 1,
        border: 'none',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: mode === 'indicator' ? 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        overflow: 'visible',
      }}
      onClick={handleClick}
      disabled={disabled && mode === 'action'}
      tabIndex={isInteractive ? 0 : -1}
      role={mode === 'indicator' ? 'status' : 'button'}
      aria-label={mode === 'action' ? label : undefined}
      aria-hidden={mode === 'indicator' ? undefined : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      // `Element` is dynamically 'button' | 'div' (see isInteractive above).
      // TypeScript's JSX checker requires a ref type satisfying BOTH
      // HTMLButtonElement and HTMLDivElement simultaneously for a
      // union-tag element, which is structurally inexpressible (it's an
      // impossible intersection, not a union). `ref` is attached but never
      // read (no `ref.current` usage in this file), so this is safe.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
    >
      {/* Light mode shadow layer */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: blinkColor || effectiveBackgroundColor,
          boxShadow: (pressed || (mode === 'indicator' && isHeld)) ? shadowOnLight : shadowOffLight,
          border: `${borderWidth}px solid ${borderColor}`,
          filter: `blur(${blurAmount}px)`,
          opacity: darkMode ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out, box-shadow 0.15s ease-in-out, filter 0.15s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
        }}
      />
      {/* Dark mode shadow layer */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: blinkColor || effectiveBackgroundColor,
          boxShadow: (pressed || (mode === 'indicator' && isHeld)) ? shadowOnDark : shadowOffDark,
          border: `${borderWidth}px solid ${effectiveBorderColor}`,
          filter: `blur(${blurAmount}px)`,
          opacity: darkMode ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out, box-shadow 0.15s ease-in-out, filter 0.15s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
        }}
      />
      <div 
        className="relative z-10"
        style={{ 
          color: effectiveTextColor, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          transition: 'color 0.5s ease-in-out',
        }}
      >
        {mode === 'indicator' ? renderDots() : (icon || label)}
      </div>
    </Element>
  );
}