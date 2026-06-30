export type ThemePreference = 'light' | 'dark' | 'system';

export interface Settings {
  theme: ThemePreference;
  sound: boolean;
  animations: boolean;
  haptics: boolean;
  /** Master toggle for the reveal "hold to view" safety affordance. */
  holdToReveal: boolean;
}

export interface MatchStats {
  gamesPlayed: number;
  roundsPlayed: number;
  civilianWins: number;
  impostorWins: number;
  timesImpostor: number;
  timesCaught: number; // impostor ejected
  impostorWordGuesses: number; // correct final guesses as impostor
  /** Current and best run of consecutive civilian wins. */
  currentStreak: number;
  bestStreak: number;
  fastestEjectionMs: number | null;
  favoriteCategory: string | null;
  /** category id -> times played, for the favorite computation. */
  categoryPlays: Record<string, number>;
  lastPlayedISO: string | null;
}
