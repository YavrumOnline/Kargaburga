import { CSSProperties } from 'react';

// Transition constants
export const TRANSITIONS = {
  COLOR: 'color 0.5s ease-in-out',
  BACKGROUND: 'background-color 0.5s ease-in-out',
  BORDER: 'border-color 0.5s ease-in-out',
  OPACITY: 'opacity 0.5s ease-in-out',
  ALL_THEME: 'color 0.5s ease-in-out, background-color 0.5s ease-in-out, border-color 0.5s ease-in-out',
  COLOR_OPACITY: 'color 0.5s ease-in-out, opacity 0.5s ease-in-out',
} as const;

// Typography style generators
export const getHeadingStyle = (
  color: string,
  options?: {
    marginBottom?: string;
    textAlign?: CSSProperties['textAlign'];
  }
): CSSProperties => ({
  fontSize: '16px',
  fontWeight: 500,
  marginBottom: options?.marginBottom || '1.5rem',
  color,
  textAlign: options?.textAlign || 'center',
  transition: TRANSITIONS.COLOR,
});

export const getBodyTextStyle = (
  color: string,
  options?: {
    maxWidth?: string;
    textAlign?: CSSProperties['textAlign'];
    lineHeight?: number;
  }
): CSSProperties => ({
  fontSize: '14px',
  lineHeight: options?.lineHeight || 1.7,
  color,
  textAlign: options?.textAlign || 'center',
  maxWidth: options?.maxWidth || '38rem',
  margin: '0 auto',
  transition: TRANSITIONS.COLOR,
});

export const getLabelStyle = (
  color: string,
  options?: {
    marginBottom?: string;
  }
): CSSProperties => ({
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  color,
  marginBottom: options?.marginBottom || '0.5rem',
  transition: TRANSITIONS.COLOR,
});
