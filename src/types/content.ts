/**
 * Content domain model.
 *
 * The content system is the heart of the product. Every entry carries rich,
 * machine-readable metadata so that (a) the selection engine can balance
 * difficulty / freshness / safety, and (b) a future AI pipeline can generate,
 * score, and de-duplicate entries at the same quality bar.
 *
 * The metadata is intentionally descriptive rather than a literal "hint": tags
 * describe the *associations* a word evokes, which is what lets players produce
 * discussion-worthy clues instead of dead giveaways.
 */

export type Difficulty = 'easy' | 'medium' | 'hard' | 'evil';

export type Language = 'en' | 'hi' | 'hinglish';

export type Culture =
  | 'global'
  | 'india'
  | 'india-north'
  | 'india-south'
  | 'west'
  | 'internet';

/**
 * Stable category identifiers. Categories are grouped by `CategoryGroup`
 * for the Create Room UI (e.g. the "India" chip expands to several categories).
 */
export type CategoryId =
  | 'indian-food'
  | 'regional-food'
  | 'global-food'
  | 'festivals'
  | 'bollywood'
  | 'hollywood'
  | 'anime'
  | 'games'
  | 'memes'
  | 'internet'
  | 'technology'
  | 'programming'
  | 'engineering'
  | 'office'
  | 'startup'
  | 'brands'
  | 'cities'
  | 'countries'
  | 'travel'
  | 'cricket'
  | 'football'
  | 'sports'
  | 'relationships'
  | 'family'
  | 'college'
  | 'school'
  | 'science'
  | 'space'
  | 'history'
  | 'politics'
  | 'cars'
  | 'social-media'
  | 'creators'
  | 'music'
  | 'daily-life'
  | 'nostalgia'
  | 'cartoons'
  | 'animals'
  | 'chaos'
  | 'naughty';

/**
 * A single playable secret word.
 *
 * Scores are 0–100 and are used by the selection engine:
 *  - discussionScore: how much rich conversation the word tends to generate.
 *  - chaosScore: how absurd/unpredictable it plays.
 *  - guessDifficulty: how hard it is for an impostor to guess from clues.
 *  - popularity: how widely recognised the word is (gates "obscure" words).
 */
export interface WordEntry {
  id: string;
  /** The word shown to civilians. */
  text: string;
  /** Optional shorter label for very small screens. */
  short?: string;
  category: CategoryId;
  difficulty: Difficulty;
  /**
   * Associative tags. NOT hints. These describe the world around the word so
   * players speak about adjacent concepts. e.g. Maggi -> "hostel", "2 minutes".
   */
  tags: string[];
  /** Words that cluster semantically with this one (used for decoys / packs). */
  related: string[];
  /** Higher-level themes the word belongs to (for AI clustering & packs). */
  semanticClusters: string[];
  culture: Culture;
  language: Language;
  /** 0–100. */
  popularity: number;
  /** Era the word is most relevant to, for nostalgia / freshness weighting. */
  yearRelevance: 'timeless' | 'retro' | 'modern' | 'trending';
  /** True if appropriate for kids / family / classroom. */
  safe: boolean;
  /** True if the word is adult-oriented (only shown when 18+ is enabled). */
  adult?: boolean;
  discussionScore: number;
  chaosScore: number;
  guessDifficulty: number;
  /** Provenance — distinguishes hand-authored seed from AI-generated entries. */
  source?: 'seed' | 'ai' | 'community';
}

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  emoji: string;
  /** Group shown as a top-level chip in Create Room. */
  group: CategoryGroup;
  blurb: string;
}

export type CategoryGroup =
  | 'food'
  | 'india'
  | 'screen'
  | 'play'
  | 'web'
  | 'work'
  | 'life'
  | 'world'
  | 'wild'
  | 'spicy';

/**
 * A Content Pack is a curated or generated bundle of categories + filters,
 * surfaced in the Content Packs screen and selectable in Create Room.
 */
export interface ContentPack {
  id: string;
  name: string;
  emoji: string;
  description: string;
  categories: CategoryId[];
  accent: string; // tailwind-friendly rgb string
  /** Optional hard filters applied on top of the categories. */
  filter?: Partial<{
    difficulty: Difficulty[];
    culture: Culture[];
    safeOnly: boolean;
  }>;
  /** Marks AI/seasonal packs that a generation pipeline can refresh. */
  kind: 'core' | 'seasonal' | 'ai' | 'community';
  /** ISO date a seasonal pack is most relevant; powers "today's pack". */
  season?: { from: string; to: string };
}

/** A pairing handed to the round: the civilian word + the impostor's decoy. */
export interface WordPairing {
  civilian: WordEntry;
  /** In "blind" modes the impostor sees nothing; otherwise a related decoy. */
  decoy?: WordEntry;
}
