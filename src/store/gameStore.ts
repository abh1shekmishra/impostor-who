import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CategoryId,
  Difficulty,
  GameModeId,
  Phase,
  Player,
  RoundConfig,
  RoundState,
} from '@/types';
import { DEFAULT_MODE, MODE_BY_ID } from '@/data/modes';
import { selectPairing } from '@/lib/content';
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
} from '@/lib/game';
import { useStats } from './statsStore';

export type Route =
  | 'home'
  | 'create'
  | 'play'
  | 'settings'
  | 'stats'
  | 'packs'
  | 'people'
  | 'how-to';

const DEFAULT_CONFIG: RoundConfig = {
  playerCount: 5,
  impostorCount: 1,
  timerSeconds: 60,
  categories: [],
  difficulty: ['easy', 'medium'],
  modeId: DEFAULT_MODE,
  familySafe: false,
  allowAdult: false,
  englishOnly: false,
  regional: false,
  mixEverything: true,
};

interface GameState {
  route: Route;
  phase: Phase;
  config: RoundConfig;
  playerNames: string[];
  players: Player[];
  round: RoundState | null;
  recentWordIds: string[];
  /** Reveal pass-and-play cursor (over `players` in seating order). */
  revealIndex: number;
  /** Clue pass-and-play cursor (over `round.clueOrder`). */
  clueIndex: number;
  /** The voter currently casting in pass-and-play voting. */
  voterIndex: number;
  needsImpostorGuess: boolean;
  pendingEjectedId: string | null;
  /** Wall-clock at which discussion began, for "fastest ejection" stat. */
  discussionStartedAt: number | null;
  lastGuessCorrect: boolean | null;

  // ── navigation ──
  navigate: (route: Route) => void;

  // ── setup ──
  patchConfig: (patch: Partial<RoundConfig>) => void;
  toggleCategory: (id: CategoryId) => void;
  setCategories: (ids: CategoryId[]) => void;
  toggleDifficulty: (d: Difficulty) => void;
  setMode: (id: GameModeId) => void;
  setPlayerNames: (names: string[]) => void;

  // ── match lifecycle ──
  startMatch: () => void;
  dealNext: () => void;
  revealCurrent: () => void;
  advanceReveal: () => void;
  startClues: () => void;
  nextClue: () => void;
  startDiscussion: () => void;
  startVote: () => void;
  castVote: (votedForId: string) => void;
  finalizeVotes: () => void;
  submitImpostorGuess: (text: string) => void;
  nextRound: () => void;
  endMatch: () => void;
  quitToHome: () => void;
}

function sanitizeNames(names: string[], count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push((names[i] ?? '').trim() || `Player ${i + 1}`);
  }
  return out;
}

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      route: 'home',
      phase: 'setup',
      config: DEFAULT_CONFIG,
      playerNames: [],
      players: [],
      round: null,
      recentWordIds: [],
      revealIndex: 0,
      clueIndex: 0,
      voterIndex: 0,
      needsImpostorGuess: false,
      pendingEjectedId: null,
      discussionStartedAt: null,
      lastGuessCorrect: null,

      navigate: (route) => set({ route }),

      patchConfig: (patch) =>
        set((s) => {
          const merged = { ...s.config, ...patch };
          merged.playerCount = clampPlayers(merged.playerCount);
          merged.impostorCount = clampImpostors(
            merged.impostorCount,
            merged.playerCount
          );
          return { config: merged };
        }),

      toggleCategory: (id) =>
        set((s) => {
          const has = s.config.categories.includes(id);
          const categories = has
            ? s.config.categories.filter((c) => c !== id)
            : [...s.config.categories, id];
          return {
            config: { ...s.config, categories, mixEverything: categories.length === 0 },
          };
        }),

      setCategories: (ids) =>
        set((s) => ({
          config: { ...s.config, categories: ids, mixEverything: ids.length === 0 },
        })),

      toggleDifficulty: (d) =>
        set((s) => {
          const has = s.config.difficulty.includes(d);
          let difficulty = has
            ? s.config.difficulty.filter((x) => x !== d)
            : [...s.config.difficulty, d];
          if (difficulty.length === 0) difficulty = [d]; // never empty
          return { config: { ...s.config, difficulty } };
        }),

      setMode: (id) =>
        set((s) => {
          const mode = MODE_BY_ID.get(id);
          if (!mode) return {};
          const patch: Partial<RoundConfig> = { modeId: id };
          if (mode.rules.impostors) patch.impostorCount = mode.rules.impostors;
          // Adopt the mode's suggested timer if the host hasn't set unlimited.
          if (s.config.timerSeconds !== null) {
            patch.timerSeconds = mode.rules.suggestedTimer;
          }
          return { config: { ...s.config, ...patch } };
        }),

      setPlayerNames: (names) => set({ playerNames: names }),

      startMatch: () => {
        const { config, playerNames } = get();
        const names = sanitizeNames(playerNames, config.playerCount);
        const players = names.map((n, i) => makePlayer(n, i));
        useStats.getState().recordGameStart();
        set({
          players,
          playerNames: names,
          route: 'play',
          recentWordIds: [],
        });
        get().dealNext();
      },

      dealNext: () => {
        const { config, players, recentWordIds } = get();
        const mode = MODE_BY_ID.get(config.modeId)!;
        const pairing = selectPairing({ config, mode, recentIds: recentWordIds });
        if (!pairing) return;
        const roundIndex = (get().round?.index ?? 0) + 1;
        const round = dealRound({
          players,
          config,
          mode,
          word: pairing.civilian,
          decoy: pairing.decoy ?? null,
          roundIndex,
        });
        set({
          round,
          phase: 'reveal',
          revealIndex: 0,
          clueIndex: 0,
          voterIndex: 0,
          needsImpostorGuess: false,
          pendingEjectedId: null,
          discussionStartedAt: null,
          lastGuessCorrect: null,
          recentWordIds: [pairing.civilian.id, ...recentWordIds].slice(0, 40),
        });
      },

      revealCurrent: () =>
        set((s) => {
          if (!s.round) return {};
          const player = s.round.players[s.revealIndex];
          if (!player) return {};
          const players = s.round.players.map((p) =>
            p.id === player.id ? { ...p, hasRevealed: true } : p
          );
          return { round: { ...s.round, players } };
        }),

      advanceReveal: () =>
        set((s) => {
          if (!s.round) return {};
          const next = s.revealIndex + 1;
          if (next >= s.round.players.length) {
            return { phase: 'clue', revealIndex: next, clueIndex: 0 };
          }
          return { revealIndex: next };
        }),

      startClues: () => set({ phase: 'clue', clueIndex: 0 }),

      nextClue: () =>
        set((s) => {
          if (!s.round) return {};
          const next = s.clueIndex + 1;
          if (next >= s.round.clueOrder.length) {
            return {
              phase: 'discuss',
              clueIndex: next,
              discussionStartedAt: Date.now(),
            };
          }
          return { clueIndex: next };
        }),

      startDiscussion: () =>
        set({ phase: 'discuss', discussionStartedAt: Date.now() }),

      startVote: () => set({ phase: 'vote', voterIndex: 0 }),

      castVote: (votedForId) =>
        set((s) => {
          if (!s.round) return {};
          const voters = s.round.players.filter((p) => !p.eliminated);
          const voter = voters[s.voterIndex];
          if (!voter) return {};
          const votes = { ...s.round.votes, [voter.id]: votedForId };
          return { round: { ...s.round, votes }, voterIndex: s.voterIndex + 1 };
        }),

      finalizeVotes: () => {
        const { round, discussionStartedAt } = get();
        if (!round) return;
        const tally = tallyVotes(round);
        const outcome = resolveVote(round, tally);
        const withTally: RoundState = { ...round, tally };
        if (outcome.result) {
          const ejectionMs = discussionStartedAt
            ? Date.now() - discussionStartedAt
            : null;
          const finished: RoundState = { ...withTally, result: outcome.result };
          const players = applyScores(get().players, outcome.result);
          useStats.getState().recordRound(finished, outcome.result, ejectionMs);
          set({
            round: finished,
            players: players.map((p) => ({ ...p })),
            phase: 'result',
            pendingEjectedId: outcome.ejectedId,
          });
        } else {
          set({
            round: withTally,
            phase: 'impostor-guess',
            needsImpostorGuess: true,
            pendingEjectedId: outcome.ejectedId,
          });
        }
      },

      submitImpostorGuess: (text) => {
        const { round, pendingEjectedId, discussionStartedAt } = get();
        if (!round) return;
        const correct = isGuessCorrect(text, round.word);
        const result = resolveImpostorGuess(round, correct, pendingEjectedId);
        const ejectionMs = discussionStartedAt ? Date.now() - discussionStartedAt : null;
        const finished: RoundState = { ...round, result };
        const players = applyScores(get().players, result);
        useStats.getState().recordRound(finished, result, ejectionMs);
        set({
          round: finished,
          players: players.map((p) => ({ ...p })),
          phase: 'result',
          lastGuessCorrect: correct,
          needsImpostorGuess: false,
        });
      },

      nextRound: () => {
        // Running `players` already carries updated scores; dealNext reuses it
        // (dealRound spreads each player, preserving score) and re-rolls roles.
        get().dealNext();
      },

      endMatch: () =>
        set({
          route: 'home',
          phase: 'setup',
          round: null,
          players: [],
          revealIndex: 0,
          clueIndex: 0,
          voterIndex: 0,
        }),

      quitToHome: () =>
        set({
          route: 'home',
          phase: 'setup',
          round: null,
          revealIndex: 0,
          clueIndex: 0,
          voterIndex: 0,
        }),
    }),
    {
      name: 'uc.game',
      partialize: (s) => ({
        config: s.config,
        playerNames: s.playerNames,
        players: s.players,
        round: s.round,
        phase: s.phase,
        route: s.route,
        recentWordIds: s.recentWordIds,
        revealIndex: s.revealIndex,
        clueIndex: s.clueIndex,
        voterIndex: s.voterIndex,
        needsImpostorGuess: s.needsImpostorGuess,
        pendingEjectedId: s.pendingEjectedId,
        lastGuessCorrect: s.lastGuessCorrect,
      }),
    }
  )
);
