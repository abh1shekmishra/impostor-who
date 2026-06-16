import { haptic, type HapticPattern } from './haptics';
import { sound, type SoundCue } from './sound';

/**
 * Unified feedback: fire a sound and a haptic together for a single
 * interaction. Components call `feedback('select')` instead of wiring both,
 * keeping cues consistent across the app.
 */
const MAP: Record<string, { sound: SoundCue; haptic: HapticPattern }> = {
  tap: { sound: 'tap', haptic: 'tap' },
  select: { sound: 'select', haptic: 'select' },
  flip: { sound: 'flip', haptic: 'tap' },
  reveal: { sound: 'reveal', haptic: 'reveal' },
  impostor: { sound: 'impostor', haptic: 'impostor' },
  vote: { sound: 'vote', haptic: 'select' },
  win: { sound: 'win', haptic: 'success' },
  lose: { sound: 'lose', haptic: 'warning' },
  pop: { sound: 'pop', haptic: 'tap' },
  tick: { sound: 'tick', haptic: 'tap' },
};

export type FeedbackCue = keyof typeof MAP;

export function feedback(cue: FeedbackCue): void {
  const m = MAP[cue];
  if (!m) return;
  sound(m.sound);
  haptic(m.haptic);
}
