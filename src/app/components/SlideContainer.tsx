import { CSSProperties, ReactNode } from 'react';

interface SlideContainerProps {
  children: ReactNode;
  padding?: string;
  justifyContent?: 'center';
}

export function SlideContainer({ 
  children, 
  padding = '2rem',
  justifyContent,
}: SlideContainerProps) {
  const style: CSSProperties = {
    flex: '0 0 100%',
    minWidth: 0,
    width: '100%',
    boxSizing: 'border-box',
    padding,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'pan-y',
  };

  if (justifyContent) {
    style.justifyContent = justifyContent;
  }

  return (
    <div
      className="embla__slide slide-content"
      style={style}
    >
      {children}
    </div>
  );
}
