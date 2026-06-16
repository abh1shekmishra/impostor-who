import { useEffect } from 'react';

/** Minimal local shape so this compiles regardless of the configured DOM lib. */
interface WakeLockSentinelLike {
  release: () => Promise<void>;
}
interface WakeLockNavigator {
  wakeLock?: { request: (type: 'screen') => Promise<WakeLockSentinelLike> };
}

/**
 * Keeps the screen awake during active play (pass-and-play can have long gaps
 * between taps). Best-effort: silently no-ops where the Screen Wake Lock API is
 * unavailable, and re-acquires after the tab regains visibility.
 */
export function useWakeLock(active: boolean): void {
  useEffect(() => {
    if (!active) return undefined;
    const nav = navigator as unknown as WakeLockNavigator;
    if (!nav.wakeLock) return undefined;

    let sentinel: WakeLockSentinelLike | null = null;
    let released = false;

    const request = async () => {
      try {
        sentinel = (await nav.wakeLock!.request('screen')) ?? null;
      } catch {
        /* user agent may reject (e.g. low battery) — ignore */
      }
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible' && !released) void request();
    };

    void request();
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      released = true;
      document.removeEventListener('visibilitychange', onVisible);
      void sentinel?.release().catch(() => undefined);
    };
  }, [active]);
}
