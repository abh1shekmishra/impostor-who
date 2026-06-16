export type ThemePreference = 'light' | 'dark' | 'system';
export type LanguagePreference = 'en' | 'hi' | 'hinglish';

export interface Settings {
  theme: ThemePreference;
  sound: boolean;
  animations: boolean;
  haptics: boolean;
  language: LanguagePreference;
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
  fastestEjectionMs: number | null;
  favoriteCategory: string | null;
  /** category id -> times played, for the favorite computation. */
  categoryPlays: Record<string, number>;
  lastPlayedISO: string | null;
}
