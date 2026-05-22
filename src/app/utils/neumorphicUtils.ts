import { useState } from 'react';

// Default neumorphic shadow ratios (based on 64px reference size)
export const DEFAULT_NEUMORPHIC_RATIOS = {
  borderWidthRatio: 2/64,
  blurAmountRatio: 1/64,
  // Shadow OFF (raised state) - outer shadows
  outerOffsetRatio: 6/64,
  outerBlurRatio: 12/64,
  outerSpreadRatio: 2/64,
  // Shadow OFF (raised state) - inset shadows
  insetOffOffsetRatio: 1/64,
  insetOffBlurRatio: 1/64,
  insetOffSpreadRatio: 1/64,
  // Shadow ON (pressed state) - inset shadows
  insetOnOffsetRatio: 6/64,
  insetOnBlurRatio: 8/64,
  insetOnSpreadRatio: 2/64,
  // Shadow ON (pressed state) - outer shadows
  outerOnOffsetRatio: 1/64,
  outerOnBlurRatio: 1/64,
  outerOnSpreadRatio: 2/64,
} as const;

export interface NeumorphicShadowParams {
  size: number;
  lightColor: string;
  darkColor: string;
  outerOffsetRatio: number;
  outerBlurRatio: number;
  outerSpreadRatio: number;
  insetOffsetRatio: number;
  insetBlurRatio: number;
  insetSpreadRatio: number;
  isDarkMode?: boolean;
}

export function generateNeumorphicShadow({
  size,
  lightColor,
  darkColor,
  outerOffsetRatio,
  outerBlurRatio,
  outerSpreadRatio,
  insetOffsetRatio,
  insetBlurRatio,
  insetSpreadRatio,
  isDarkMode,
}: NeumorphicShadowParams): string {
  const outerOffsetX = size * outerOffsetRatio;
  const outerOffsetY = size * outerOffsetRatio;
  const outerBlur = size * outerBlurRatio;
  const outerSpread = size * outerSpreadRatio;
  const insetOffsetX = size * insetOffsetRatio;
  const insetOffsetY = size * insetOffsetRatio;
  const insetBlur = size * insetBlurRatio;
  const insetSpread = size * insetSpreadRatio;

  return `
    -${outerOffsetX}px -${outerOffsetY}px ${outerBlur}px ${outerSpread}px ${lightColor},
    ${outerOffsetX}px ${outerOffsetY}px ${outerBlur}px ${outerSpread}px ${darkColor},
    inset -${insetOffsetX}px -${insetOffsetY}px ${insetBlur}px ${insetSpread}px ${lightColor},
    inset ${insetOffsetX}px ${insetOffsetY}px ${insetBlur}px ${insetSpread}px ${darkColor}
  `.replace(/\s+/g, ' ').trim();
}

export function useBounceAnimation() {
  const [isBouncing, setIsBouncing] = useState(false);

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  };

  return { isBouncing, triggerBounce };
}