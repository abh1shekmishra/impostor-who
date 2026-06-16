import type { CategoryId, Difficulty, WordEntry } from './content';

export type GameModeId =
  | 'classic'
  | 'double-impostor'
  | 'blind'
  | 'chaos'
  | 'reverse'
  | 'hot-seat'
  | 'rapid-fire'
  | 'one-word'
  | 'no-talking'
  | 'emoji-clues'
  | 'act-it-out';

/**
 * Declarative description of a game mode. Logic reads these flags rather than
 * branching on the mode id, so adding a mode never touches the engine.
 */
export interface GameMode {
  id: GameModeId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  rules: {
    /** Override the impostor count (else host's choice is used). */
    impostors?: number;
    /** Impostor gets NO decoy word and is told nothing about the word. */
    blindImpostor: boolean;
    /** Civilians get the secret word; impostor gets a *related* decoy word. */
    impostorGetsDecoy: boolean;
    /** Constrain how a player may give their clue. */
    clueStyle: 'word' | 'one-word' | 'emoji' | 'gesture' | 'silent';
    /** Recommended round timer in seconds (host can still override). */
    suggestedTimer: number;
    /** Bias the word selection toward higher chaos scores. */
    chaosBias: boolean;
    /** Reverse mode: civilians try to *avoid* revealing; impostor hunts. */
    reverseObjective: boolean;
    /** Hot seat: one player answers rapid questions. */
    hotSeat: boolean;
  };
}

export type Phase =
  | 'setup' // host configuring (Create Room)
  | 'lobby' // names entered, ready to deal
  | 'reveal' // passing the phone, each player sees their role
  | 'clue' // each player gives one clue, in order
  | 'discuss' // free discussion + timer
  | 'vote' // tally votes
  | 'reveal-vote' // show who was voted
  | 'impostor-guess' // surviving impostor's final word guess
  | 'result'; // outcome + scoreboard

export interface Player {
  id: string;
  name: string;
  /** Assigned each round. */
  role: 'civilian' | 'impostor';
  /** The word this player sees during reveal (decoy or civilian word, or null). */
  shownWord: string | null;
  /** Whether this player has completed their reveal tap this round. */
  hasRevealed: boolean;
  /** Whether this player has been voted out this round. */
  eliminated: boolean;
  /** Cumulative score across the match. */
  score: number;
  /** Per-player avatar accent (deterministic from id). */
  accent: number;
}

export interface RoundConfig {
  playerCount: number;
  impostorCount: number;
  timerSeconds: number | null; // null = unlimited
  categories: CategoryId[];
  difficulty: Difficulty[];
  modeId: GameModeId;
  familySafe: boolean;
  allowAdult: boolean;
  englishOnly: boolean;
  regional: boolean;
  mixEverything: boolean;
}

export interface VoteTally {
  /** playerId -> number of votes received. */
  counts: Record<string, number>;
  /** The player with the most votes, or null on a tie. */
  ejectedId: string | null;
  tie: boolean;
}

export interface RoundResult {
  outcome: 'civilians-win' | 'impostors-win';
  reason:
    | 'impostor-ejected'
    | 'impostor-survived'
    | 'impostor-guessed-word'
    | 'wrong-civilian-ejected';
  civilianWord: WordEntry;
  impostorIds: string[];
  ejectedId: string | null;
  guessedCorrectly?: boolean;
}

export interface RoundState {
  index: number; // 1-based round number within the match
  config: RoundConfig;
  word: WordEntry;
  decoy: WordEntry | null;
  players: Player[];
  /** Player order for the clue phase. */
  clueOrder: string[];
  /** Index into clueOrder during reveal & clue phases. */
  turnIndex: number;
  votes: Record<string, string>; // voterId -> votedForId
  tally: VoteTally | null;
  result: RoundResult | null;
}
