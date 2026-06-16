import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MatchStats, RoundResult, RoundState } from '@/types';

interface StatsState extends MatchStats {
  recordRound: (round: RoundState, result: RoundResult, ejectionMs: number | null) => void;
  recordGameStart: () => void;
  reset: () => void;
}

const EMPTY: MatchStats = {
  gamesPlayed: 0,
  roundsPlayed: 0,
  civilianWins: 0,
  impostorWins: 0,
  timesImpostor: 0,
  timesCaught: 0,
  impostorWordGuesses: 0,
  fastestEjectionMs: null,
  favoriteCategory: null,
  categoryPlays: {},
  lastPlayedISO: null,
};

function computeFavorite(plays: Record<string, number>): string | null {
  let best: string | null = null;
  let max = -1;
  for (const [cat, n] of Object.entries(plays)) {
    if (n > max) {
      max = n;
      best = cat;
    }
  }
  return best;
}

export const useStats = create<StatsState>()(
  persist(
    (set) => ({
      ...EMPTY,
      recordGameStart: () =>
        set((s) => ({
          gamesPlayed: s.gamesPlayed + 1,
          lastPlayedISO: new Date().toISOString(),
        })),
      recordRound: (round, result, ejectionMs) =>
        set((s) => {
          const categoryPlays = {
            ...s.categoryPlays,
            [round.word.category]: (s.categoryPlays[round.word.category] ?? 0) + 1,
          };
          const impostorEjected = result.reason === 'impostor-ejected';
          const fastest =
            impostorEjected && ejectionMs != null
              ? s.fastestEjectionMs == null
                ? ejectionMs
                : Math.min(s.fastestEjectionMs, ejectionMs)
              : s.fastestEjectionMs;
          return {
            roundsPlayed: s.roundsPlayed + 1,
            civilianWins: s.civilianWins + (result.outcome === 'civilians-win' ? 1 : 0),
            impostorWins: s.impostorWins + (result.outcome === 'impostors-win' ? 1 : 0),
            timesImpostor: s.timesImpostor + result.impostorIds.length,
            timesCaught: s.timesCaught + (impostorEjected ? 1 : 0),
            impostorWordGuesses:
              s.impostorWordGuesses + (result.guessedCorrectly ? 1 : 0),
            fastestEjectionMs: fastest,
            categoryPlays,
            favoriteCategory: computeFavorite(categoryPlays),
            lastPlayedISO: new Date().toISOString(),
          };
        }),
      reset: () => set({ ...EMPTY }),
    }),
    {
      name: 'uc.stats',
      partialize: (s): MatchStats => ({
        gamesPlayed: s.gamesPlayed,
        roundsPlayed: s.roundsPlayed,
        civilianWins: s.civilianWins,
        impostorWins: s.impostorWins,
        timesImpostor: s.timesImpostor,
        timesCaught: s.timesCaught,
        impostorWordGuesses: s.impostorWordGuesses,
        fastestEjectionMs: s.fastestEjectionMs,
        favoriteCategory: s.favoriteCategory,
        categoryPlays: s.categoryPlays,
        lastPlayedISO: s.lastPlayedISO,
      }),
    }
  )
);
