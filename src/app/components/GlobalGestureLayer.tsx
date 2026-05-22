import { useEffect, ReactNode } from 'react';
import { useGlobalGesture } from '@/app/hooks/useGlobalGesture';

interface GlobalGestureLayerProps {
  children: ReactNode;
  onHorizontalSwipeLeft?: () => void;
  onHorizontalSwipeRight?: () => void;
  onVerticalSwipeUp?: () => void;
  onVerticalSwipeDown?: () => void;
  isEnabled?: boolean;
  isGestureBlocked?: boolean;
  isVerticalGestureBlocked?: boolean; // New prop to block only vertical gestures
}

export function GlobalGestureLayer({
  children,
  onHorizontalSwipeLeft,
  onHorizontalSwipeRight,
  onVerticalSwipeUp,
  onVerticalSwipeDown,
  isEnabled = true,
  isGestureBlocked = false,
  isVerticalGestureBlocked = false,
}: GlobalGestureLayerProps) {
  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  } = useGlobalGesture({
    horizontalThreshold: 50,
    verticalThreshold: 50,
    onHorizontalSwipeLeft,
    onHorizontalSwipeRight,
    onVerticalSwipeUp,
    onVerticalSwipeDown,
    isEnabled,
    isGestureBlocked,
    isVerticalGestureBlocked,
  });

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    window.addEventListener('pointermove', handlePointerMove, { capture: true });
    window.addEventListener('pointerup', handlePointerUp, { capture: true });
    window.addEventListener('pointercancel', handlePointerCancel, { capture: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      window.removeEventListener('pointermove', handlePointerMove, { capture: true });
      window.removeEventListener('pointerup', handlePointerUp, { capture: true });
      window.removeEventListener('pointercancel', handlePointerCancel, { capture: true });
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel]);

  return <>{children}</>;
}