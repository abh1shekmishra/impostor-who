import type {
  GameMode,
  Player,
  RoundConfig,
  RoundResult,
  RoundState,
  VoteTally,
  WordEntry,
} from '@/types';
import { makeRng, pickIndices, shuffle, type Rng } from './random';

/** Clamp helpers used across setup so the engine never receives bad input. */
export const clampPlayers = (n: number) => Math.max(3, Math.min(20, Math.round(n)));
export const clampImpostors = (n: number, players: number) =>
  Math.max(1, Math.min(3, Math.min(n, players - 1)));

export function makePlayer(name: string, index: number): Player {
  return {
    id: `p${index}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim() || `Player ${index + 1}`,
    role: 'civilian',
    shownWord: null,
    hasRevealed: false,
    eliminated: false,
    score: 0,
    accent: index % 8,
  };
}

export interface DealParams {
  players: Player[];
  config: RoundConfig;
  mode: GameMode;
  word: WordEntry;
  decoy: WordEntry | null;
  roundIndex: number;
  seed?: number;
}

/**
 * Assign roles and the word each player will see, then build the initial
 * round state. Pure function — given the same seed it deals identically.
 */
export function dealRound(params: DealParams): RoundState {
  const { players, config, mode, word, decoy, roundIndex } = params;
  const rng: Rng = makeRng(params.seed);

  const impostorCount = clampImpostors(
    mode.rules.impostors ?? config.impostorCount,
    players.length
  );
  const impostorSlots = new Set(pickIndices(players.length, impostorCount, rng));

  const dealt: Player[] = players.map((p, i) => {
    const isImpostor = impostorSlots.has(i);
    const shownWord = isImpostor
      ? mode.rules.impostorGetsDecoy && decoy
        ? decoy.text
        : null
      : word.text;
    return {
      ...p,
      role: isImpostor ? 'impostor' : 'civilian',
      shownWord,
      hasRevealed: false,
      eliminated: false,
    };
  });

  // Clue order: shuffled so the first speaker varies; hot-seat reverses later.
  const clueOrder = shuffle(dealt, rng).map((p) => p.id);

  return {
    index: roundIndex,
    config,
    word,
    decoy,
    players: dealt,
    clueOrder,
    turnIndex: 0,
    votes: {},
    tally: null,
    result: null,
  };
}

/** Tally a complete or partial vote map into counts + a possible ejection. */
export function tallyVotes(round: RoundState): VoteTally {
  const counts: Record<string, number> = {};
  for (const p of round.players) {
    if (!p.eliminated) counts[p.id] = 0;
  }
  for (const votedForId of Object.values(round.votes)) {
    if (votedForId in counts) counts[votedForId] = (counts[votedForId] ?? 0) + 1;
  }
  let max = -1;
  let leaders: string[] = [];
  for (const [id, n] of Object.entries(counts)) {
    if (n > max) {
      max = n;
      leaders = [id];
    } else if (n === max) {
      leaders.push(id);
    }
  }
  const tie = leaders.length !== 1 || max <= 0;
  return {
    counts,
    ejectedId: tie ? null : leaders[0]!,
    tie,
  };
}

/**
 * Decide the round outcome from a tally.
 *
 * - If an impostor is ejected → civilians win (unless a surviving impostor can
 *   still guess; with one impostor, ejection ends it).
 * - If a civilian is ejected (or tie/no eject) → the impostor survives and gets
 *   the final word-guess chance.
 */
export interface ResolveOutcome {
  result: RoundResult | null;
  /** When true, the surviving impostor(s) get a final word guess. */
  needsImpostorGuess: boolean;
  ejectedId: string | null;
}

export function resolveVote(round: RoundState, tally: VoteTally): ResolveOutcome {
  const impostorIds = round.players.filter((p) => p.role === 'impostor').map((p) => p.id);
  const ejectedId = tally.ejectedId;
  const ejectedIsImpostor = ejectedId !== null && impostorIds.includes(ejectedId);

  if (ejectedIsImpostor) {
    const remainingImpostors = impostorIds.filter((id) => id !== ejectedId);
    if (remainingImpostors.length === 0) {
      return {
        ejectedId,
        needsImpostorGuess: false,
        result: {
          outcome: 'civilians-win',
          reason: 'impostor-ejected',
          civilianWord: round.word,
          impostorIds,
          ejectedId,
        },
      };
    }
    // More impostors remain → those who survived still get the guess chance.
    return { ejectedId, needsImpostorGuess: true, result: null };
  }

  // No impostor caught → surviving impostors get the final word guess.
  return { ejectedId, needsImpostorGuess: true, result: null };
}

/** Resolve the impostor's final word guess into a terminal result. */
export function resolveImpostorGuess(
  round: RoundState,
  guessCorrect: boolean,
  ejectedId: string | null
): RoundResult {
  const impostorIds = round.players.filter((p) => p.role === 'impostor').map((p) => p.id);
  if (guessCorrect) {
    return {
      outcome: 'impostors-win',
      reason: 'impostor-guessed-word',
      civilianWord: round.word,
      impostorIds,
      ejectedId,
      guessedCorrectly: true,
    };
  }
  const ejectedIsImpostor = ejectedId !== null && impostorIds.includes(ejectedId);
  return {
    outcome: ejectedIsImpostor ? 'civilians-win' : 'impostors-win',
    reason: ejectedIsImpostor ? 'impostor-ejected' : 'wrong-civilian-ejected',
    civilianWord: round.word,
    impostorIds,
    ejectedId,
    guessedCorrectly: false,
  };
}

/**
 * Fuzzy check whether the impostor's typed guess matches the secret word.
 * Forgiving of case, spacing, punctuation, and small typos.
 */
export function isGuessCorrect(guess: string, word: WordEntry): boolean {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  const g = norm(guess);
  if (!g) return false;
  const targets = [word.text, word.short ?? '', ...word.related].map(norm).filter(Boolean);
  if (targets.includes(g)) return true;
  // Allow a close match against the primary word (Levenshtein <= 1 for short).
  const primary = norm(word.text);
  if (g === primary) return true;
  if (Math.abs(g.length - primary.length) <= 1 && levenshtein(g, primary) <= 1) return true;
  return false;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1]! + 1, prev[j]! + 1, prev[j - 1]! + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n]!;
}

/** Apply a finished round's result to running match scores. */
export function applyScores(players: Player[], result: RoundResult): Player[] {
  const impostorSet = new Set(result.impostorIds);
  return players.map((p) => {
    let gained = 0;
    const isImpostor = impostorSet.has(p.id);
    if (result.outcome === 'civilians-win') {
      if (!isImpostor) gained += 1;
      // Bonus point to the civilian(s) who voted for an impostor.
    } else {
      if (isImpostor) gained += 2;
    }
    return { ...p, score: p.score + gained };
  });
}
