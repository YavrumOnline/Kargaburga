import { useRef, useCallback, useEffect } from 'react';

interface GestureState {
  isActive: boolean;
  axis: 'horizontal' | 'vertical' | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  hasPreventedDefault: boolean;
  lastGestureTime: number;
}

interface UseGlobalGestureOptions {
  horizontalThreshold?: number;
  verticalThreshold?: number;
  onHorizontalSwipeLeft?: () => void;
  onHorizontalSwipeRight?: () => void;
  onVerticalSwipeUp?: () => void;
  onVerticalSwipeDown?: () => void;
  isEnabled?: boolean;
  isGestureBlocked?: boolean;
  isVerticalGestureBlocked?: boolean; // New option to block only vertical gestures
}

export function useGlobalGesture({
  horizontalThreshold = 50,
  verticalThreshold = 50,
  onHorizontalSwipeLeft,
  onHorizontalSwipeRight,
  onVerticalSwipeUp,
  onVerticalSwipeDown,
  isEnabled = true,
  isGestureBlocked = false,
  isVerticalGestureBlocked = false,
}: UseGlobalGestureOptions) {
  const gestureStateRef = useRef<GestureState>({
    isActive: false,
    axis: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    hasPreventedDefault: false,
    lastGestureTime: 0,
  });

  // Cooldown to prevent multiple swipes from single gesture (in milliseconds)
  const GESTURE_COOLDOWN = 400;
  const lastActionTimeRef = useRef<number>(0);

  // Store callbacks in refs to avoid recreating handlers
  const callbacksRef = useRef({
    onHorizontalSwipeLeft,
    onHorizontalSwipeRight,
    onVerticalSwipeUp,
    onVerticalSwipeDown,
  });

  const isEnabledRef = useRef(isEnabled);
  const isGestureBlockedRef = useRef(isGestureBlocked);
  const isVerticalGestureBlockedRef = useRef(isVerticalGestureBlocked);

  // Update refs in effect
  useEffect(() => {
    callbacksRef.current = {
      onHorizontalSwipeLeft,
      onHorizontalSwipeRight,
      onVerticalSwipeUp,
      onVerticalSwipeDown,
    };
  }, [onHorizontalSwipeLeft, onHorizontalSwipeRight, onVerticalSwipeUp, onVerticalSwipeDown]);

  useEffect(() => {
    isEnabledRef.current = isEnabled;
  }, [isEnabled]);

  useEffect(() => {
    isGestureBlockedRef.current = isGestureBlocked;
  }, [isGestureBlocked]);

  useEffect(() => {
    isVerticalGestureBlockedRef.current = isVerticalGestureBlocked;
  }, [isVerticalGestureBlocked]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    if (!isEnabledRef.current || isGestureBlockedRef.current) return;

    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('[data-gesture-exclude]')
    ) {
      return;
    }

    gestureStateRef.current = {
      isActive: true,
      axis: null,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      hasPreventedDefault: false,
      lastGestureTime: Date.now(),
    };
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isEnabledRef.current || isGestureBlockedRef.current) return;

    const state = gestureStateRef.current;
    if (!state.isActive) return;

    state.currentX = e.clientX;
    state.currentY = e.clientY;

    // Calculate deltas
    const deltaX = Math.abs(state.currentX - state.startX);
    const deltaY = Math.abs(state.currentY - state.startY);

    // If axis not yet locked, determine it
    if (!state.axis) {
      if (deltaX >= 10 && deltaX > deltaY * 1.5) {
        state.axis = 'horizontal';
      } else if (deltaY >= 10 && deltaY > deltaX * 1.5) {
        if (!isVerticalGestureBlockedRef.current) {
          state.axis = 'vertical';
        } else {
          gestureStateRef.current = {
            isActive: false,
            axis: null,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            hasPreventedDefault: false,
            lastGestureTime: 0,
          };
          return;
        }
      }
    }

    // Once axis is locked, prevent default to override browser behavior
    if (state.axis && !state.hasPreventedDefault) {
      e.preventDefault();
      state.hasPreventedDefault = true;
    }
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!isEnabledRef.current || isGestureBlockedRef.current) return;

    const state = gestureStateRef.current;
    if (!state.isActive) return;

    // Check cooldown to prevent multiple actions from single swipe
    const now = Date.now();
    const timeSinceLastAction = now - lastActionTimeRef.current;
    if (timeSinceLastAction < GESTURE_COOLDOWN) {
      gestureStateRef.current = {
        isActive: false,
        axis: null,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        hasPreventedDefault: false,
        lastGestureTime: 0,
      };
      return;
    }

    state.currentX = e.clientX;
    state.currentY = e.clientY;

    const deltaX = state.currentX - state.startX;
    const deltaY = state.currentY - state.startY;

    let actionTriggered = false;

    if (state.axis === 'horizontal') {
      if (deltaX < -horizontalThreshold) {
        callbacksRef.current.onHorizontalSwipeLeft?.();
        actionTriggered = true;
      } else if (deltaX > horizontalThreshold) {
        callbacksRef.current.onHorizontalSwipeRight?.();
        actionTriggered = true;
      }
    } else if (state.axis === 'vertical') {
      if (!isVerticalGestureBlockedRef.current) {
        if (deltaY < -verticalThreshold) {
          callbacksRef.current.onVerticalSwipeUp?.();
          actionTriggered = true;
        } else if (deltaY > verticalThreshold) {
          callbacksRef.current.onVerticalSwipeDown?.();
          actionTriggered = true;
        }
      }
    }

    // Update last action time only if an action was triggered
    if (actionTriggered) {
      lastActionTimeRef.current = now;
    }

    // Reset state
    gestureStateRef.current = {
      isActive: false,
      axis: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      hasPreventedDefault: false,
      lastGestureTime: 0,
    };
  }, [horizontalThreshold, verticalThreshold]);

  const handlePointerCancel = useCallback(() => {
    gestureStateRef.current = {
      isActive: false,
      axis: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      hasPreventedDefault: false,
      lastGestureTime: 0,
    };
  }, []);

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  };
}