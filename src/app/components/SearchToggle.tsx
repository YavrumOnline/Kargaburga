import { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import { Search } from 'lucide-react';
import { generateNeumorphicShadow, DEFAULT_NEUMORPHIC_RATIOS } from '@/app/utils/neumorphicUtils';
import { LIGHT_MODE, DARK_MODE } from '@/constants/colors';

interface SearchToggleProps {
  height?: number;
  darkMode?: boolean;
  onSearchChange?: (value: string) => void;
  onExpandedChange?: (expanded: boolean) => void;
  onRequestCollapse?: () => void;
}

export const SearchToggle = forwardRef<HTMLDivElement, SearchToggleProps>(function SearchToggle({ 
  height = 48, 
  darkMode = false,
  onSearchChange,
  onExpandedChange,
  onRequestCollapse
}, ref) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleClickOutside = useCallback(() => {
    setIsExpanded(false);
    if (searchValue) {
      setSearchValue('');
      onSearchChange?.('');
    }
  }, [searchValue, onSearchChange]);

  // Click outside to collapse
  useEffect(() => {
    if (!isExpanded) return;

    const currentRef = containerRef.current;
    if (!currentRef) return;

    const handleClick = (event: MouseEvent) => {
      if (!currentRef.contains(event.target as Node)) {
        handleClickOutside();
      }
    };

    // Small delay to prevent immediate collapse on expansion click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isExpanded, handleClickOutside]);

  const handleToggle = () => {
    if (isExpanded && searchValue) {
      // If expanded with text, clear and collapse
      setSearchValue('');
      onSearchChange?.('');
      setIsExpanded(false);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  // Notify parent of expanded state changes
  useEffect(() => {
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  // Handle external collapse request
  useEffect(() => {
    if (!onRequestCollapse) return;
    
    const handleCollapse = () => {
      handleClickOutside();
    };
    
    // Store the handler reference
    (window as any).__searchToggleCollapse = handleCollapse;
    
    return () => {
      delete (window as any).__searchToggleCollapse;
    };
  }, [onRequestCollapse, handleClickOutside]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  };

  const handleBlur = () => {
    // Collapse when clicking outside if no search value
    if (!searchValue) {
      setIsExpanded(false);
    }
  };

  // Calculate dimensions
  const collapsedWidth = height;
  const expandedWidth = height * 4; // Quadruple width
  const currentWidth = isExpanded ? expandedWidth : collapsedWidth;
  
  // Proportional values (matching MasterToggle pattern)
  const borderWidth = height * DEFAULT_NEUMORPHIC_RATIOS.borderWidthRatio;
  const blurAmount = height * DEFAULT_NEUMORPHIC_RATIOS.blurAmountRatio;
  const borderRadius = height / 2; // Perfect circle/pill
  const paddingX = height * (16/64);
  const iconSize = height * (20/48);

  // Colors (matching MasterToggle pattern)
  const backgroundColor = darkMode ? DARK_MODE.BACKGROUND : LIGHT_MODE.BACKGROUND;
  const lightColorLight = LIGHT_MODE.LIGHT_SHADOW;
  const darkColorLight = LIGHT_MODE.DARK_SHADOW;
  const borderColorLight = LIGHT_MODE.BORDER;
  const lightColorDark = DARK_MODE.LIGHT_SHADOW;
  const darkColorDark = DARK_MODE.DARK_SHADOW;
  const borderColorDark = DARK_MODE.BORDER;
  const textColor = darkMode ? DARK_MODE.TEXT : '#3A3A3A';

  // Generate shadows for light mode - OFF state (raised)
  const shadowOffLight = generateNeumorphicShadow({
    size: height,
    lightColor: lightColorLight,
    darkColor: darkColorLight,
    outerOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOffsetRatio,
    outerBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.outerBlurRatio,
    outerSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.outerSpreadRatio,
    insetOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffOffsetRatio,
    insetBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffBlurRatio,
    insetSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffSpreadRatio,
    isDarkMode: false,
  });

  // Generate shadows for light mode - ON state (pressed)
  const shadowOnLight = generateNeumorphicShadow({
    size: height,
    lightColor: lightColorLight,
    darkColor: darkColorLight,
    outerOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOnOffsetRatio,
    outerBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOnBlurRatio,
    outerSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOnSpreadRatio,
    insetOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOnOffsetRatio,
    insetBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOnBlurRatio,
    insetSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOnSpreadRatio,
    isDarkMode: false,
  });

  // Generate shadows for dark mode - OFF state (raised)
  const shadowOffDark = generateNeumorphicShadow({
    size: height,
    lightColor: lightColorDark,
    darkColor: darkColorDark,
    outerOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOffsetRatio,
    outerBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.outerBlurRatio,
    outerSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.outerSpreadRatio,
    insetOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffOffsetRatio,
    insetBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffBlurRatio,
    insetSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffSpreadRatio,
    isDarkMode: true,
  });

  // Generate shadows for dark mode - ON state (pressed)
  const shadowOnDark = generateNeumorphicShadow({
    size: height,
    lightColor: lightColorDark,
    darkColor: darkColorDark,
    outerOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOnOffsetRatio,
    outerBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOnBlurRatio,
    outerSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOnSpreadRatio,
    insetOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOnOffsetRatio,
    insetBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOnBlurRatio,
    insetSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOnSpreadRatio,
    isDarkMode: true,
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: `${height}px`,
        width: `${currentWidth}px`,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        {/* Light mode shadow layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor,
            boxShadow: (isExpanded || isPressed) ? shadowOnLight : shadowOffLight,
            border: `${borderWidth}px solid ${borderColorLight}`,
            filter: `blur(${blurAmount}px)`,
            borderRadius: `${borderRadius}px`,
            pointerEvents: 'none',
            opacity: darkMode ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out, box-shadow 0.15s ease-in-out, filter 0.15s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
          }}
        />

        {/* Dark mode shadow layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor,
            boxShadow: (isExpanded || isPressed) ? shadowOnDark : shadowOffDark,
            border: `${borderWidth}px solid ${borderColorDark}`,
            filter: `blur(${blurAmount}px)`,
            borderRadius: `${borderRadius}px`,
            pointerEvents: 'none',
            opacity: darkMode ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out, box-shadow 0.15s ease-in-out, filter 0.15s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
          }}
        />

        {/* Content layer */}
        <div
          onClick={handleToggle}
          onPointerDown={() => setIsPressed(true)}
          onPointerUp={() => setIsPressed(false)}
          onPointerLeave={() => setIsPressed(false)}
          onPointerCancel={() => setIsPressed(false)}
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          {/* Search icon button */}
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: textColor,
              transition: 'opacity 0.2s ease-out',
              flexShrink: 0,
              pointerEvents: 'none',
            }}
          >
            <Search size={iconSize} strokeWidth={2} />
          </button>

          {/* Input field (visible when expanded) */}
          {isExpanded && (
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Ara..."
              onClick={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                marginLeft: `${paddingX / 2}px`,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: textColor,
                fontSize: `${Math.max(16, height * (14/48))}px`, // Minimum 16px to prevent mobile zoom
                fontFamily: 'inherit',
                width: '100%',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});