import { describe, expect, it } from 'vitest';
import type {
  GameMode,
  GameModeId,
  Player,
  RoundConfig,
  RoundState,
  VoteTally,
  WordEntry,
} from '@/types';
import {
  applyScores,
  clampImpostors,
  clampPlayers,
  dealRound,
  isGuessCorrect,
  makePlayer,
  resolveImpostorGuess,
  resolveVote,
  tallyVotes,
} from './game';

// factories
// Minimal, valid domain objects so each test states only what it cares about.

function word(id: string, text: string, extra: Partial<WordEntry> = {}): WordEntry {
  return {
    id,
    text,
    category: 'games',
    difficulty: 'medium',
    tags: [],
    related: [],
    semanticClusters: [],
    culture: 'global',
    language: 'en',
    popularity: 50,
    yearRelevance: 'timeless',
    safe: true,
    discussionScore: 50,
    chaosScore: 50,
    guessDifficulty: 50,
    ...extra,
  };
}

function mode(rules: Partial<GameMode['rules']> = {}, id: GameModeId = 'classic'): GameMode {
  return {
    id,
    name: 'Classic',
    emoji: '🎭',
    tagline: '',
    description: '',
    rules: {
      blindImpostor: false,
      impostorGetsDecoy: false,
      clueStyle: 'word',
      suggestedTimer: 90,
      chaosBias: false,
      reverseObjective: false,
      hotSeat: false,
      ...rules,
    },
  };
}

function config(extra: Partial<RoundConfig> = {}): RoundConfig {
  return {
    playerCount: 5,
    impostorCount: 1,
    timerSeconds: 90,
    categories: [],
    difficulty: ['medium'],
    modeId: 'classic',
    familySafe: true,
    allowAdult: false,
    mixEverything: true,
    groupVote: false,
    ...extra,
  };
}

function players(n: number): Player[] {
  return Array.from({ length: n }, (_, i) => makePlayer(`P${i + 1}`, i));
}

const impostorsOf = (r: RoundState) => r.players.filter((p) => p.role === 'impostor');
const civiliansOf = (r: RoundState) => r.players.filter((p) => p.role === 'civilian');

// clamps

describe('clampPlayers', () => {
  it('holds a valid count and rounds fractional input', () => {
    expect(clampPlayers(6)).toBe(6);
    expect(clampPlayers(6.4)).toBe(6);
  });

  it('enforces the 3–20 bounds', () => {
    expect(clampPlayers(1)).toBe(3);
    expect(clampPlayers(0)).toBe(3);
    expect(clampPlayers(99)).toBe(20);
  });
});

describe('clampImpostors', () => {
  it('never exceeds players - 1', () => {
    expect(clampImpostors(3, 3)).toBe(2);
    expect(clampImpostors(1, 2)).toBe(1);
  });

  it('is bounded to 1–3', () => {
    expect(clampImpostors(0, 6)).toBe(1);
    expect(clampImpostors(5, 6)).toBe(3);
  });
});

// makePlayer

describe('makePlayer', () => {
  it('starts every player as an unrevealed civilian with zero score', () => {
    const p = makePlayer('Ada', 0);
    expect(p).toMatchObject({
      name: 'Ada',
      role: 'civilian',
      shownWord: null,
      hasRevealed: false,
      eliminated: false,
      score: 0,
    });
  });

  it('falls back to a numbered name when blank and cycles the accent', () => {
    expect(makePlayer('   ', 2).name).toBe('Player 3');
    expect(makePlayer('x', 9).accent).toBe(9 % 8);
  });

  it('gives each player a unique id', () => {
    const ids = players(8).map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// dealRound

describe('dealRound', () => {
  it('assigns exactly the configured number of impostors', () => {
    const round = dealRound({
      players: players(6),
      config: config({ impostorCount: 2 }),
      mode: mode(),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 42,
    });
    expect(impostorsOf(round)).toHaveLength(2);
    expect(civiliansOf(round)).toHaveLength(4);
  });

  it('lets a mode override the impostor count declaratively', () => {
    const round = dealRound({
      players: players(6),
      config: config({ impostorCount: 1 }),
      mode: mode({ impostors: 2 }, 'double-impostor'),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 7,
    });
    expect(impostorsOf(round)).toHaveLength(2);
  });

  it('shows civilians the real word and gives the impostor the decoy when the mode says so', () => {
    const round = dealRound({
      players: players(5),
      config: config(),
      mode: mode({ impostorGetsDecoy: true }),
      word: word('w1', 'Pizza'),
      decoy: word('d1', 'Pasta'),
      roundIndex: 1,
      seed: 3,
    });
    for (const c of civiliansOf(round)) expect(c.shownWord).toBe('Pizza');
    for (const imp of impostorsOf(round)) expect(imp.shownWord).toBe('Pasta');
  });

  it('shows a blind impostor nothing', () => {
    const round = dealRound({
      players: players(5),
      config: config(),
      mode: mode({ blindImpostor: true, impostorGetsDecoy: false }),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 3,
    });
    for (const imp of impostorsOf(round)) expect(imp.shownWord).toBeNull();
  });

  it('is deterministic: the same seed deals identical roles', () => {
    const params = {
      players: players(6),
      config: config({ impostorCount: 2 }),
      mode: mode(),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 123,
    };
    const a = dealRound(params);
    const b = dealRound(params);
    const roles = (r: RoundState) => r.players.map((p) => `${p.id}:${p.role}`).join(',');
    expect(roles(a)).toBe(roles(b));
  });

  it('does not mutate the players passed in', () => {
    const input = players(5);
    dealRound({
      players: input,
      config: config(),
      mode: mode(),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 1,
    });
    expect(input.every((p) => p.role === 'civilian' && p.shownWord === null)).toBe(true);
  });
});

// tallyVotes

function roundWith(votes: Record<string, string>, seed = 1): RoundState {
  const base = dealRound({
    players: players(5),
    config: config(),
    mode: mode(),
    word: word('w1', 'Pizza'),
    decoy: null,
    roundIndex: 1,
    seed,
  });
  return { ...base, votes };
}

describe('tallyVotes', () => {
  it('ejects the clear plurality leader', () => {
    const r = roundWith({});
    const [p0, p1, p2] = r.players;
    const round: RoundState = {
      ...r,
      votes: { [p0!.id]: p2!.id, [p1!.id]: p2!.id, [p2!.id]: p0!.id },
    };
    const tally = tallyVotes(round);
    expect(tally.ejectedId).toBe(p2!.id);
    expect(tally.tie).toBe(false);
    expect(tally.counts[p2!.id]).toBe(2);
  });

  it('reports a tie when the top two are level', () => {
    const r = roundWith({});
    const [p0, p1] = r.players;
    const round: RoundState = { ...r, votes: { [p0!.id]: p1!.id, [p1!.id]: p0!.id } };
    const tally = tallyVotes(round);
    expect(tally.tie).toBe(true);
    expect(tally.ejectedId).toBeNull();
  });

  it('treats no votes as a tie with nobody ejected', () => {
    const tally = tallyVotes(roundWith({}));
    expect(tally.tie).toBe(true);
    expect(tally.ejectedId).toBeNull();
  });
});

// resolveVote

function tallyEjecting(id: string | null): VoteTally {
  return { counts: {}, ejectedId: id, tie: id === null };
}

describe('resolveVote', () => {
  it('ends the game for the civilians when the lone impostor is ejected', () => {
    const round = dealRound({
      players: players(5),
      config: config({ impostorCount: 1 }),
      mode: mode(),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 5,
    });
    const impostorId = impostorsOf(round)[0]!.id;
    const outcome = resolveVote(round, tallyEjecting(impostorId));
    expect(outcome.needsImpostorGuess).toBe(false);
    expect(outcome.result?.outcome).toBe('civilians-win');
    expect(outcome.result?.reason).toBe('impostor-ejected');
  });

  it('keeps playing when one of several impostors is ejected', () => {
    const round = dealRound({
      players: players(6),
      config: config({ impostorCount: 2 }),
      mode: mode(),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 9,
    });
    const impostorId = impostorsOf(round)[0]!.id;
    const outcome = resolveVote(round, tallyEjecting(impostorId));
    expect(outcome.needsImpostorGuess).toBe(true);
    expect(outcome.result).toBeNull();
  });

  it('hands the surviving impostor a final guess when a civilian is ejected', () => {
    const round = dealRound({
      players: players(5),
      config: config({ impostorCount: 1 }),
      mode: mode(),
      word: word('w1', 'Pizza'),
      decoy: null,
      roundIndex: 1,
      seed: 5,
    });
    const civilianId = civiliansOf(round)[0]!.id;
    const outcome = resolveVote(round, tallyEjecting(civilianId));
    expect(outcome.needsImpostorGuess).toBe(true);
    expect(outcome.result).toBeNull();
  });
});

// resolveImpostorGuess

describe('resolveImpostorGuess', () => {
  const round = dealRound({
    players: players(5),
    config: config(),
    mode: mode(),
    word: word('w1', 'Pizza'),
    decoy: null,
    roundIndex: 1,
    seed: 5,
  });
  const impostorId = impostorsOf(round)[0]!.id;
  const civilianId = civiliansOf(round)[0]!.id;

  it('lets the impostor steal the win with a correct guess', () => {
    const result = resolveImpostorGuess(round, true, civilianId);
    expect(result.outcome).toBe('impostors-win');
    expect(result.reason).toBe('impostor-guessed-word');
    expect(result.guessedCorrectly).toBe(true);
  });

  it('gives civilians the win when the guess is wrong and an impostor was ejected', () => {
    const result = resolveImpostorGuess(round, false, impostorId);
    expect(result.outcome).toBe('civilians-win');
    expect(result.reason).toBe('impostor-ejected');
  });

  it('gives impostors the win when the guess is wrong but a civilian was ejected', () => {
    const result = resolveImpostorGuess(round, false, civilianId);
    expect(result.outcome).toBe('impostors-win');
    expect(result.reason).toBe('wrong-civilian-ejected');
  });
});

// isGuessCorrect

describe('isGuessCorrect', () => {
  const target = word('w1', 'New York City', {
    short: 'NYC',
    related: ['Big Apple', 'Manhattan'],
  });

  it('matches case-insensitively and ignores punctuation/spacing', () => {
    expect(isGuessCorrect('new york city', target)).toBe(true);
    expect(isGuessCorrect('  New-York, City! ', target)).toBe(true);
  });

  it('accepts the short label and related words', () => {
    expect(isGuessCorrect('nyc', target)).toBe(true);
    expect(isGuessCorrect('manhattan', target)).toBe(true);
  });

  it('forgives a single-character typo on the primary word', () => {
    expect(isGuessCorrect('Pizzas', word('w2', 'Pizza'))).toBe(true); // 1 insertion
    expect(isGuessCorrect('Piza', word('w2', 'Pizza'))).toBe(true); // 1 deletion
  });

  it('rejects an unrelated guess and an empty guess', () => {
    expect(isGuessCorrect('Burger', target)).toBe(false);
    expect(isGuessCorrect('   ', target)).toBe(false);
  });
});

// applyScores

describe('applyScores', () => {
  const roster: Player[] = [
    { ...makePlayer('A', 0), id: 'a' },
    { ...makePlayer('B', 1), id: 'b' },
    { ...makePlayer('C', 2), id: 'c' },
  ];

  it('awards each civilian one point on a civilians-win', () => {
    const scored = applyScores(roster, {
      outcome: 'civilians-win',
      reason: 'impostor-ejected',
      civilianWord: word('w1', 'Pizza'),
      impostorIds: ['c'],
      ejectedId: 'c',
    });
    expect(scored.find((p) => p.id === 'a')!.score).toBe(1);
    expect(scored.find((p) => p.id === 'b')!.score).toBe(1);
    expect(scored.find((p) => p.id === 'c')!.score).toBe(0);
  });

  it('awards each impostor two points on an impostors-win', () => {
    const scored = applyScores(roster, {
      outcome: 'impostors-win',
      reason: 'impostor-guessed-word',
      civilianWord: word('w1', 'Pizza'),
      impostorIds: ['c'],
      ejectedId: null,
      guessedCorrectly: true,
    });
    expect(scored.find((p) => p.id === 'c')!.score).toBe(2);
    expect(scored.find((p) => p.id === 'a')!.score).toBe(0);
  });

  it('returns new player objects rather than mutating the input', () => {
    const before = roster.map((p) => p.score);
    applyScores(roster, {
      outcome: 'civilians-win',
      reason: 'impostor-ejected',
      civilianWord: word('w1', 'Pizza'),
      impostorIds: ['c'],
      ejectedId: 'c',
    });
    expect(roster.map((p) => p.score)).toEqual(before);
  });
});
