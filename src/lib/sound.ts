/**
 * Tiny synthesized sound engine.
 *
 * Sounds are generated with the Web Audio API rather than shipped as audio
 * files — this keeps the bundle minimal, works fully offline, and lets every
 * cue stay short and pleasant. Lazily creates the AudioContext on first use so
 * we respect browser autoplay policies (first sound follows a user gesture).
 */
let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(value: boolean): void {
  enabled = value;
}

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

interface Note {
  freq: number;
  start: number; // seconds offset
  dur: number;
  gain?: number;
  type?: OscillatorType;
}

function play(notes: Note[]): void {
  if (!enabled) return;
  const audio = getCtx();
  if (!audio) return;
  const now = audio.currentTime;
  for (const n of notes) {
    const osc = audio.createOscillator();
    const g = audio.createGain();
    osc.type = n.type ?? 'sine';
    osc.frequency.value = n.freq;
    const peak = n.gain ?? 0.12;
    const t0 = now + n.start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.dur);
    osc.connect(g).connect(audio.destination);
    osc.start(t0);
    osc.stop(t0 + n.dur + 0.02);
  }
}

export type SoundCue =
  | 'tap'
  | 'select'
  | 'flip'
  | 'reveal'
  | 'impostor'
  | 'tick'
  | 'vote'
  | 'win'
  | 'lose'
  | 'pop';

const CUES: Record<SoundCue, Note[]> = {
  tap: [{ freq: 660, start: 0, dur: 0.06, gain: 0.06 }],
  select: [{ freq: 880, start: 0, dur: 0.07, gain: 0.07 }],
  pop: [{ freq: 520, start: 0, dur: 0.05, gain: 0.08, type: 'triangle' }],
  flip: [
    { freq: 420, start: 0, dur: 0.08, gain: 0.06 },
    { freq: 720, start: 0.05, dur: 0.1, gain: 0.07 },
  ],
  reveal: [
    { freq: 523.25, start: 0, dur: 0.16, gain: 0.09, type: 'triangle' },
    { freq: 659.25, start: 0.08, dur: 0.18, gain: 0.09, type: 'triangle' },
    { freq: 783.99, start: 0.16, dur: 0.22, gain: 0.1, type: 'triangle' },
  ],
  impostor: [
    { freq: 220, start: 0, dur: 0.22, gain: 0.12, type: 'sawtooth' },
    { freq: 174.61, start: 0.12, dur: 0.3, gain: 0.1, type: 'sawtooth' },
  ],
  tick: [{ freq: 1200, start: 0, dur: 0.03, gain: 0.05 }],
  vote: [{ freq: 740, start: 0, dur: 0.09, gain: 0.08, type: 'triangle' }],
  win: [
    { freq: 523.25, start: 0, dur: 0.14, gain: 0.1, type: 'triangle' },
    { freq: 659.25, start: 0.12, dur: 0.14, gain: 0.1, type: 'triangle' },
    { freq: 783.99, start: 0.24, dur: 0.16, gain: 0.1, type: 'triangle' },
    { freq: 1046.5, start: 0.36, dur: 0.28, gain: 0.11, type: 'triangle' },
  ],
  lose: [
    { freq: 392, start: 0, dur: 0.18, gain: 0.1, type: 'sawtooth' },
    { freq: 311.13, start: 0.16, dur: 0.34, gain: 0.09, type: 'sawtooth' },
  ],
};

export function sound(cue: SoundCue): void {
  play(CUES[cue]);
}
