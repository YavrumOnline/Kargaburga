/**
 * Centralized Neumorphic Color Constants
 * 
 * All neumorphic component colors are defined here to ensure consistency
 * across the application and simplify theme changes.
 */

// ============================================================================
// TOPIC THEME COLORS
// ============================================================================

export const TOPIC_THEME_COLORS = {
  values: '#FF7800',      // Orange
  courses: '#0096FF',     // Cyan/Blue
  team: '#B428FF',        // Purple
  contact: '#32CD32',     // Darker Green (was #78FF50)
  login: '#FF2828',       // Red
} as const;

export const TOPIC_LIGHT_COLORS = {
  values: '#FFD9B3',      // Very Light Orange
  courses: '#B3E0FF',     // Very Light Cyan
  team: '#EBC4FF',        // Very Light Purple
  contact: '#D9FFCC',     // Very Light Green
  login: '#FFBDBD',       // Very Light Red
} as const;

// ============================================================================
// LIGHT MODE COLORS
// ============================================================================

export const LIGHT_MODE = {
  /** Primary background color for neumorphic surfaces */
  BACKGROUND: '#e9e9e9',
  
  /** Light shadow color (top-left highlight) */
  LIGHT_SHADOW: '#ffffff',
  
  /** Dark shadow color (bottom-right shadow) */
  DARK_SHADOW: '#bcbcbc',
  
  /** Border color for neumorphic elements */
  BORDER: 'white',
  
  /** Text color */
  TEXT: '#000000',
  
  /** Secondary background (e.g., forms, inputs) */
  SECONDARY_BG: '#f5f5f5',
  
  /** Secondary border */
  SECONDARY_BORDER: '#e0e0e0',
} as const;

// ============================================================================
// DARK MODE COLORS
// ============================================================================

export const DARK_MODE = {
  /** Primary background color for neumorphic surfaces */
  BACKGROUND: '#1a1a1a',
  
  /** Light shadow color (top-left highlight) */
  LIGHT_SHADOW: '#2a2a2a',
  
  /** Dark shadow color (bottom-right shadow) */
  DARK_SHADOW: '#0a0a0a',
  
  /** Border color for neumorphic elements */
  BORDER: '#2a2a2a',
  
  /** Text color */
  TEXT: '#FFFFFF',
  
  /** Secondary text color (dimmed) */
  TEXT_SECONDARY: '#d0d0d0',
  
  /** Secondary background (e.g., forms, inputs) */
  SECONDARY_BG: '#2a2a2a',
  
  /** Secondary border */
  SECONDARY_BORDER: '#3a3a3a',
} as const;

// ============================================================================
// HELPER FUNCTION
// ============================================================================

/**
 * Returns the appropriate color value based on dark mode state
 * 
 * @param darkMode - Whether dark mode is active
 * @param lightValue - Color value for light mode
 * @param darkValue - Color value for dark mode
 * @returns The appropriate color value
 */
export function getThemeColor(
  darkMode: boolean,
  lightValue: string,
  darkValue: string
): string {
  return darkMode ? darkValue : lightValue;
}

/**
 * Returns complete neumorphic color set based on dark mode state
 * 
 * @param darkMode - Whether dark mode is active
 * @returns Object containing all neumorphic colors for current theme
 */
export function getNeumorphicColors(darkMode: boolean) {
  return {
    background: getThemeColor(darkMode, LIGHT_MODE.BACKGROUND, DARK_MODE.BACKGROUND),
    lightShadow: getThemeColor(darkMode, LIGHT_MODE.LIGHT_SHADOW, DARK_MODE.LIGHT_SHADOW),
    darkShadow: getThemeColor(darkMode, LIGHT_MODE.DARK_SHADOW, DARK_MODE.DARK_SHADOW),
    border: getThemeColor(darkMode, LIGHT_MODE.BORDER, DARK_MODE.BORDER),
    text: getThemeColor(darkMode, LIGHT_MODE.TEXT, DARK_MODE.TEXT),
  };
}