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
import { track } from '@/lib/analytics';
import { useStats } from './statsStore';

export type Route =
  | 'library'
  | 'home'
  | 'glyph'
  | 'create'
  | 'play'
  | 'settings'
  | 'stats'
  | 'packs'
  | 'people'
  | 'how-to';

const DEFAULT_CONFIG: RoundConfig = {
  playerCount: 6,
  impostorCount: 1,
  timerSeconds: 90,
  categories: [],
  difficulty: ['medium'],
  modeId: DEFAULT_MODE,
  familySafe: true,
  allowAdult: false,
  mixEverything: true,
  groupVote: false,
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
  /** Running civilians-vs-impostors tally for the current match (Result screen). */
  matchScore: { civ: number; imp: number };

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
  redealRound: () => void;
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
      route: 'library',
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
      matchScore: { civ: 0, imp: 0 },

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
        set((s) => ({ config: { ...s.config, difficulty: [d] } })),

      setMode: (id) =>
        set((s) => {
          const mode = MODE_BY_ID.get(id);
          if (!mode) return {};
          // Mirror the design: picking a mode resets the impostor default
          // (Rivals → 2, everything else → 1). The stepper stays adjustable.
          const impostorCount = clampImpostors(id === 'double-impostor' ? 2 : 1, s.config.playerCount);
          return { config: { ...s.config, modeId: id, impostorCount } };
        }),

      setPlayerNames: (names) => set({ playerNames: names }),

      startMatch: () => {
        const { config, playerNames } = get();
        const names = sanitizeNames(playerNames, config.playerCount);
        const players = names.map((n, i) => makePlayer(n, i));
        track('game_created', {
          player_count: config.playerCount,
          impostor_count: config.impostorCount,
          mode_id: config.modeId,
          timer_seconds: config.timerSeconds,
          group_vote: config.groupVote,
        });
        useStats.getState().recordGameStart();
        set({
          players,
          playerNames: names,
          route: 'play',
          recentWordIds: [],
          matchScore: { civ: 0, imp: 0 },
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
        track('round_started', {
          round_index: round.index,
          mode_id: config.modeId,
          player_count: round.players.length,
          impostor_count: round.players.filter((p) => p.role === 'impostor').length,
          category_count: config.categories.length,
          mix_everything: config.mixEverything,
          group_vote: config.groupVote,
          timer_seconds: config.timerSeconds,
          civilian_word_id: pairing.civilian.id,
          decoy_word_id: pairing.decoy?.id ?? null,
        });
      },

      // Re-deal the *current* round during the reveal: a fresh word/role
      // assignment without advancing the round counter. Used when a word repeats
      // or the table doesn't like it and wants a do-over before clues begin. The
      // outgoing word stays in `recentWordIds`, so the new draw won't repeat it.
      redealRound: () => {
        const { config, players, recentWordIds, round } = get();
        if (!round) return;
        const mode = MODE_BY_ID.get(config.modeId)!;
        const pairing = selectPairing({ config, mode, recentIds: recentWordIds });
        if (!pairing) return;
        const fresh = dealRound({
          players,
          config,
          mode,
          word: pairing.civilian,
          decoy: pairing.decoy ?? null,
          roundIndex: round.index,
        });
        set({
          round: fresh,
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
          const ms = get().matchScore;
          set({
            round: finished,
            players: players.map((p) => ({ ...p })),
            phase: 'result',
            pendingEjectedId: outcome.ejectedId,
            matchScore:
              outcome.result.outcome === 'civilians-win'
                ? { civ: ms.civ + 1, imp: ms.imp }
                : { civ: ms.civ, imp: ms.imp + 1 },
          });
          track('round_completed', {
            round_index: finished.index,
            outcome: outcome.result.outcome,
            reason: outcome.result.reason,
            ejected_id: outcome.ejectedId,
            vote_tie: tally.tie,
            needs_impostor_guess: false,
          });
        } else {
          set({
            round: withTally,
            phase: 'impostor-guess',
            needsImpostorGuess: true,
            pendingEjectedId: outcome.ejectedId,
          });
          track('round_completed', {
            round_index: withTally.index,
            outcome: 'pending-impostor-guess',
            reason: 'impostor-survived',
            ejected_id: outcome.ejectedId,
            vote_tie: tally.tie,
            needs_impostor_guess: true,
          });
        }
      },

      submitImpostorGuess: (text) => {
        const { round, pendingEjectedId, discussionStartedAt } = get();
        if (!round) return;
        const correct = isGuessCorrect(text, round.word);
        track('impostor_guess', {
          round_index: round.index,
          guess: text,
          correct,
        });
        const result = resolveImpostorGuess(round, correct, pendingEjectedId);
        const ejectionMs = discussionStartedAt ? Date.now() - discussionStartedAt : null;
        const finished: RoundState = { ...round, result };
        const players = applyScores(get().players, result);
        useStats.getState().recordRound(finished, result, ejectionMs);
        const ms = get().matchScore;
        set({
          round: finished,
          players: players.map((p) => ({ ...p })),
          phase: 'result',
          lastGuessCorrect: correct,
          needsImpostorGuess: false,
          matchScore:
            result.outcome === 'civilians-win'
              ? { civ: ms.civ + 1, imp: ms.imp }
              : { civ: ms.civ, imp: ms.imp + 1 },
        });
        track('round_completed', {
          round_index: finished.index,
          outcome: result.outcome,
          reason: result.reason,
          ejected_id: result.ejectedId,
          guessed_correctly: !!result.guessedCorrectly,
          needs_impostor_guess: false,
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
      // v6: added the games library as the app's landing route; every launch now
      // opens on 'library'. Bumped so stale persisted routes reset to the hub.
      version: 6,
      migrate: (_persistedState, _version) => {
        const migrated: {
          config: RoundConfig;
          playerNames: string[];
          players: Player[];
          round: RoundState | null;
          phase: Phase;
          route: Route;
          recentWordIds: string[];
          revealIndex: number;
          clueIndex: number;
          voterIndex: number;
          needsImpostorGuess: boolean;
          pendingEjectedId: string | null;
          lastGuessCorrect: boolean | null;
          matchScore: { civ: number; imp: number };
        } = {
          config: DEFAULT_CONFIG,
          playerNames: [],
          players: [],
          round: null,
          phase: 'setup' as Phase,
          route: 'library' as Route,
          recentWordIds: [],
          revealIndex: 0,
          clueIndex: 0,
          voterIndex: 0,
          needsImpostorGuess: false,
          pendingEjectedId: null,
          lastGuessCorrect: null,
          matchScore: { civ: 0, imp: 0 },
        };
        return migrated;
      },
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
        matchScore: s.matchScore,
      }),
    }
  )
);
