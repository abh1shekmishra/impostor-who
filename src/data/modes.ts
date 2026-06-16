import type { GameMode, GameModeId } from '@/types';

/**
 * Game modes are pure data. The engine reads the `rules` flags, so a new mode
 * is added here without touching any game logic.
 */
export const GAME_MODES: GameMode[] = [
  {
    id: 'classic',
    name: 'Classic',
    emoji: '🎭',
    tagline: 'The original',
    description:
      'Everyone gets the secret word except the impostor. Give clues, discuss, vote out the faker.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 60,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'double-impostor',
    name: 'Double Agents',
    emoji: '🕵️',
    tagline: 'Two liars',
    description:
      'Two impostors are hidden in the group. They don’t know each other. Trust no one.',
    rules: {
      impostors: 2,
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 75,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'blind',
    name: 'Blind Impostor',
    emoji: '🙈',
    tagline: 'No safety net',
    description:
      'The impostor gets zero hints — not even a category. Pure bluffing under pressure.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 60,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'chaos',
    name: 'Chaos',
    emoji: '🌀',
    tagline: 'Beautifully absurd',
    description:
      'Abstract, ridiculous words that are nearly impossible to fake. Expect loud arguments.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 90,
      chaosBias: true,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'reverse',
    name: 'Reverse',
    emoji: '🔄',
    tagline: 'Hunt the word',
    description:
      'The impostor secretly gets a close decoy word and must avoid being spotted while blending in.',
    rules: {
      blindImpostor: false,
      impostorGetsDecoy: true,
      clueStyle: 'word',
      suggestedTimer: 75,
      chaosBias: false,
      reverseObjective: true,
      hotSeat: false,
    },
  },
  {
    id: 'hot-seat',
    name: 'Hot Seat',
    emoji: '🔥',
    tagline: 'On the spot',
    description:
      'Clue order is reversed each turn and the timer is tight. Think fast, talk faster.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 30,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: true,
    },
  },
  {
    id: 'rapid-fire',
    name: 'Rapid Fire',
    emoji: '⚡',
    tagline: 'No overthinking',
    description: 'Short timer, quick clues, instant votes. Great for big, rowdy groups.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 30,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'one-word',
    name: 'One Word',
    emoji: '1️⃣',
    tagline: 'Pick wisely',
    description: 'Each player may give exactly ONE word as their clue. Choose it carefully.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'one-word',
      suggestedTimer: 45,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'no-talking',
    name: 'No Talking',
    emoji: '🤫',
    tagline: 'Silence is golden',
    description: 'Clues are given silently — gestures and expressions only. No words allowed.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'silent',
      suggestedTimer: 60,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'emoji-clues',
    name: 'Emoji Clues',
    emoji: '😶‍🌫️',
    tagline: 'Speak in symbols',
    description: 'Describe your word using only emojis, out loud or typed in your head.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'emoji',
      suggestedTimer: 60,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'act-it-out',
    name: 'Act It Out',
    emoji: '🎬',
    tagline: 'Charades energy',
    description: 'Give your clue by acting it out. The impostor has to improvise convincingly.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'gesture',
      suggestedTimer: 75,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
];

export const MODE_BY_ID: ReadonlyMap<GameModeId, GameMode> = new Map(
  GAME_MODES.map((m) => [m.id, m])
);

export const DEFAULT_MODE: GameModeId = 'classic';
