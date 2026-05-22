import { useMemo } from 'react';

export function Grain() {
  // Memoize grain overlay SVG to prevent re-creation
  const grainOverlay = useMemo(() => {
    return `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
  }, []);
  
  return (
    <div 
      className="fixed inset-0"
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 30,
        backgroundImage: grainOverlay,
        opacity: 0.3,
        mixBlendMode: 'multiply',
      }}
    />
  );
}