import type { GameMode, GameModeId } from '@/types';

/**
 * Game modes are pure data. The engine reads the `rules` flags, so a new mode
 * is added here without touching any game logic.
 *
 * The Undercover.dc design ships three modes. We reuse stable ids from the
 * existing union so persisted configs stay valid:
 *  - `classic`          → Classic  (impostor gets a believable decoy)
 *  - `blind`            → Blackout (impostor gets nothing)
 *  - `double-impostor`  → Rivals   (two impostors, both decoyed)
 */
export const GAME_MODES: GameMode[] = [
  {
    id: 'classic',
    name: 'Classic',
    emoji: '🎭',
    tagline: 'The original',
    description: 'Everyone gets the word. The impostor gets a believable decoy.',
    rules: {
      blindImpostor: false,
      impostorGetsDecoy: true,
      clueStyle: 'word',
      suggestedTimer: 90,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'blind',
    name: 'Blackout',
    emoji: '🌑',
    tagline: 'Nothing but nerve',
    description: 'Civilians share a word. The impostor gets nothing but nerve.',
    rules: {
      blindImpostor: true,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 90,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
    },
  },
  {
    id: 'double-impostor',
    name: 'Rivals',
    emoji: '🔪',
    tagline: 'Trust no one',
    description: 'More impostors, more decoys. Trust absolutely no one.',
    rules: {
      blindImpostor: false,
      impostorGetsDecoy: true,
      clueStyle: 'word',
      suggestedTimer: 90,
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
