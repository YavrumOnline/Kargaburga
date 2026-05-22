import { useState, ReactNode, useEffect } from 'react';
import { generateNeumorphicShadow, useBounceAnimation, DEFAULT_NEUMORPHIC_RATIOS } from '@/app/utils/neumorphicUtils';
import { LIGHT_MODE, DARK_MODE } from '@/constants/colors';

interface MasterToggleParams {
  // Base size (all other values calculated as proportions of this)
  size?: number; // in px
  
  // Icon content
  icon?: ReactNode;
  
  // Control props
  isActive?: boolean;
  onClick?: () => void;
  
  // Colors
  backgroundColor?: string;
  lightColor?: string;
  darkColor?: string;
  borderColor?: string;
  glowColor?: string; // Color for emissive glow when active
  darkMode?: boolean; // Dark mode flag
  
  // Proportional values (as ratio of size)
  borderWidthRatio?: number;
  blurAmountRatio?: number;
  
  // Shadow OFF (raised state) - outer shadows (as ratio of size)
  outerOffsetRatio?: number;
  outerBlurRatio?: number;
  outerSpreadRatio?: number;
  
  // Shadow OFF (raised state) - inset shadows (as ratio of size)
  insetOffOffsetRatio?: number;
  insetOffBlurRatio?: number;
  insetOffSpreadRatio?: number;
  
  // Shadow ON (pressed state) - inset shadows (as ratio of size)
  insetOnOffsetRatio?: number;
  insetOnBlurRatio?: number;
  insetOnSpreadRatio?: number;
  
  // Shadow ON (pressed state) - outer shadows (as ratio of size)
  outerOnOffsetRatio?: number;
  outerOnBlurRatio?: number;
  outerOnSpreadRatio?: number;
}

export function MasterToggle({
  size = 64,
  icon,
  isActive,
  onClick,
  backgroundColor = LIGHT_MODE.BACKGROUND,
  lightColor = LIGHT_MODE.LIGHT_SHADOW,
  darkColor = LIGHT_MODE.DARK_SHADOW,
  borderColor = LIGHT_MODE.BORDER,
  glowColor = '#ffcc00', // Default glow color
  darkMode = false,
  borderWidthRatio = DEFAULT_NEUMORPHIC_RATIOS.borderWidthRatio,
  blurAmountRatio = DEFAULT_NEUMORPHIC_RATIOS.blurAmountRatio,
  outerOffsetRatio = DEFAULT_NEUMORPHIC_RATIOS.outerOffsetRatio,
  outerBlurRatio = DEFAULT_NEUMORPHIC_RATIOS.outerBlurRatio,
  outerSpreadRatio = DEFAULT_NEUMORPHIC_RATIOS.outerSpreadRatio,
  insetOffOffsetRatio = DEFAULT_NEUMORPHIC_RATIOS.insetOffOffsetRatio,
  insetOffBlurRatio = DEFAULT_NEUMORPHIC_RATIOS.insetOffBlurRatio,
  insetOffSpreadRatio = DEFAULT_NEUMORPHIC_RATIOS.insetOffSpreadRatio,
  insetOnOffsetRatio = DEFAULT_NEUMORPHIC_RATIOS.insetOnOffsetRatio,
  insetOnBlurRatio = DEFAULT_NEUMORPHIC_RATIOS.insetOnBlurRatio,
  insetOnSpreadRatio = DEFAULT_NEUMORPHIC_RATIOS.insetOnSpreadRatio,
  outerOnOffsetRatio = DEFAULT_NEUMORPHIC_RATIOS.outerOnOffsetRatio,
  outerOnBlurRatio = DEFAULT_NEUMORPHIC_RATIOS.outerOnBlurRatio,
  outerOnSpreadRatio = DEFAULT_NEUMORPHIC_RATIOS.outerOnSpreadRatio,
}: MasterToggleParams = {}) {
  const [isToggled, setIsToggled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isBlinked, setIsBlinked] = useState(false);
  const { isBouncing, triggerBounce } = useBounceAnimation();
  
  // Use controlled state if provided, otherwise use internal state
  const isOn = isActive !== undefined ? isActive : isToggled;
  
  // Detect when isActive changes from false to true and trigger blink
  useEffect(() => {
    if (isOn) {
      setIsBlinked(true);
      const timer = setTimeout(() => setIsBlinked(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOn]);
  
  // Dark mode colors
  const effectiveBackgroundColor = darkMode ? DARK_MODE.BACKGROUND : backgroundColor;
  const effectiveLightColor = darkMode ? DARK_MODE.LIGHT_SHADOW : lightColor;
  const effectiveDarkColor = darkMode ? DARK_MODE.DARK_SHADOW : darkColor;
  const effectiveBorderColor = darkMode ? DARK_MODE.BORDER : borderColor;
  
  // Calculate actual pixel values from ratios
  const borderWidth = size * borderWidthRatio;
  const blurAmount = size * blurAmountRatio;
  
  // Light mode shadows
  const shadowOffLight = generateNeumorphicShadow({
    size,
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
    size,
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
    size,
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
    size,
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
    if (onClick) {
      onClick();
    } else {
      setIsToggled(!isToggled);
    }
    triggerBounce();
  };

  return (
    <button 
      className="rounded-full transition-all relative"
      style={{ 
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'transparent',
        animation: isBouncing ? 'bounce 0.3s ease-out' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
    >
      {/* Light mode shadow layer */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: effectiveBackgroundColor,
          boxShadow: (isOn || isPressed) ? shadowOnLight : shadowOffLight,
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
          backgroundColor: effectiveBackgroundColor,
          boxShadow: (isOn || isPressed) ? shadowOnDark : shadowOffDark,
          border: `${borderWidth}px solid ${effectiveBorderColor}`,
          filter: `blur(${blurAmount}px)`,
          opacity: darkMode ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out, box-shadow 0.15s ease-in-out, filter 0.15s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
        }}
      />
      
      {/* Icon layer with neon tube glow when toggled on */}
      <div 
        className="relative z-10"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          filter: isOn 
            ? `
              brightness(1.3)
              drop-shadow(0 0 ${size * 0.02}px rgba(255, 255, 255, 1))
              drop-shadow(0 0 ${size * 0.05}px rgba(255, 255, 255, 0.9))
              drop-shadow(0 0 ${size * 0.08}px rgba(255, 255, 255, 0.8))
              drop-shadow(0 0 ${size * 0.12}px ${glowColor}33)
              drop-shadow(0 0 ${size * 0.16}px ${glowColor}26)
            `.replace(/\s+/g, ' ').trim()
            : isPressed 
            ? 'invert(1)' 
            : 'none',
          transition: 'filter 0.2s ease-out',
          animation: isBlinked ? 'blink 0.4s ease-in-out' : 'none',
        }}
      >
        {icon}
      </div>
    </button>
  );
}