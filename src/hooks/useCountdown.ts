import { useCallback, useEffect, useRef, useState } from 'react';

interface CountdownControls {
  /** Whole seconds remaining. */
  remaining: number;
  running: boolean;
  /** 0–1 fraction elapsed, for progress rings. */
  progress: number;
  start: () => void;
  pause: () => void;
  reset: (seconds?: number) => void;
  toggle: () => void;
}

/**
 * A drift-free countdown driven by timestamps (not interval accumulation), so
 * backgrounding the tab or a slow frame never desyncs the clock. `null`
 * duration means "unlimited" — it counts up instead and never expires.
 */
export function useCountdown(
  durationSeconds: number | null,
  onExpire?: () => void
): CountdownControls {
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(durationSeconds ?? 0);
  const endRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const tick = useCallback(() => {
    if (durationSeconds === null) {
      // Count up; never expires.
      setRemaining((r) => r);
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const msLeft = endRef.current - Date.now();
    const secLeft = Math.max(0, Math.ceil(msLeft / 1000));
    setRemaining(secLeft);
    if (msLeft <= 0) {
      setRunning(false);
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
      }
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [durationSeconds]);

  const start = useCallback(() => {
    if (durationSeconds === null) {
      setRunning(true);
      return;
    }
    expiredRef.current = false;
    endRef.current = Date.now() + remaining * 1000;
    setRunning(true);
  }, [durationSeconds, remaining]);

  const pause = useCallback(() => {
    setRunning(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = useCallback(
    (seconds?: number) => {
      cancelAnimationFrame(rafRef.current);
      expiredRef.current = false;
      setRunning(false);
      setRemaining(seconds ?? durationSeconds ?? 0);
    },
    [durationSeconds]
  );

  const toggle = useCallback(() => {
    setRunning((r) => !r);
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    if (durationSeconds !== null) {
      endRef.current = Date.now() + remaining * 1000;
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, tick]);

  const progress =
    durationSeconds && durationSeconds > 0
      ? 1 - remaining / durationSeconds
      : 0;

  return { remaining, running, progress, start, pause, reset, toggle };
}
