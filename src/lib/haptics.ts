/**
 * Haptic feedback wrapper around the Vibration API.
 *
 * Gracefully no-ops where unsupported (iOS Safari, desktop). The enabled flag
 * is set from settings so the whole app can mute haptics in one place.
 */
let enabled = true;

export function setHapticsEnabled(value: boolean): void {
  enabled = value;
}

function canVibrate(): boolean {
  return enabled && typeof navigator !== 'undefined' && 'vibrate' in navigator;
}

export type HapticPattern =
  | 'tap'
  | 'select'
  | 'success'
  | 'warning'
  | 'error'
  | 'reveal'
  | 'impostor';

const PATTERNS: Record<HapticPattern, number | number[]> = {
  tap: 8,
  select: 12,
  success: [10, 40, 14],
  warning: [16, 30, 16],
  error: [24, 40, 24, 40, 24],
  reveal: [6, 20, 18],
  impostor: [30, 30, 60],
};

export function haptic(pattern: HapticPattern = 'tap'): void {
  if (!canVibrate()) return;
  try {
    navigator.vibrate(PATTERNS[pattern]);
  } catch {
    /* ignore — vibration is best-effort */
  }
}
