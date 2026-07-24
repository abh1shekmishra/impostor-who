import type { CategoryGroup, CategoryId, CategoryMeta } from '@/types';
import { ALL_WORDS } from './words';

/** Display metadata for every category, in UI order, grouped for Create Room. */
export const CATEGORIES: CategoryMeta[] = [
  // Food
  { id: 'indian-food', label: 'Indian Food', emoji: '🍛', group: 'food', blurb: 'Golgappa to biryani' },
  { id: 'regional-food', label: 'Regional Food', emoji: '🥘', group: 'food', blurb: 'State by state' },
  { id: 'global-food', label: 'Global Food', emoji: '🍕', group: 'food', blurb: 'World on a plate' },
  // India
  { id: 'festivals', label: 'Festivals', emoji: '🪔', group: 'india', blurb: 'Lights & colours' },
  { id: 'bollywood', label: 'Bollywood', emoji: '🎬', group: 'india', blurb: 'Filmy feels' },
  { id: 'cricket', label: 'Cricket', emoji: '🏏', group: 'india', blurb: 'Gully to IPL' },
  // Screen
  { id: 'entertainment', label: 'Entertainment', emoji: '🎭', group: 'screen', blurb: 'Shows, songs, and streams' },
  { id: 'hollywood', label: 'Hollywood', emoji: '🎞️', group: 'screen', blurb: 'Big screen' },
  { id: 'anime', label: 'Anime', emoji: '🍙', group: 'screen', blurb: 'Believe it' },
  { id: 'cartoons', label: 'Cartoons', emoji: '📺', group: 'screen', blurb: 'Sunday mornings' },
  // Play
  { id: 'games', label: 'Games', emoji: '🎮', group: 'play', blurb: 'BGMI to Ludo' },
  { id: 'animals', label: 'Animals', emoji: '🐾', group: 'play', blurb: 'Wild & pets' },
  { id: 'music', label: 'Music', emoji: '🎧', group: 'play', blurb: 'Aux cord wars' },
  // Web
  { id: 'memes', label: 'Memes', emoji: '😂', group: 'web', blurb: 'Very online' },
  { id: 'internet', label: 'Internet', emoji: '🌐', group: 'web', blurb: 'Wifi & woes' },
  { id: 'social-media', label: 'Social Media', emoji: '📱', group: 'web', blurb: 'Stories & stalking' },
  { id: 'creators', label: 'Creators', emoji: '🎥', group: 'web', blurb: 'Like & subscribe' },
  // Work
  { id: 'technology', label: 'Technology', emoji: '💡', group: 'work', blurb: 'Gadgets & glitches' },
  { id: 'programming', label: 'Programming', emoji: '👨‍💻', group: 'work', blurb: 'Dev life' },
  { id: 'engineering', label: 'Engineering', emoji: '⚙️', group: 'work', blurb: 'KT to viva' },
  { id: 'office', label: 'Office', emoji: '🧑‍💼', group: 'work', blurb: 'Corporate life' },
  { id: 'startup', label: 'Startup', emoji: '🚀', group: 'work', blurb: 'Pivot & burn' },
  { id: 'brands', label: 'Brands', emoji: '🏷️', group: 'work', blurb: 'Logos we love' },
  // Life
  { id: 'relationships', label: 'Relationships', emoji: '💞', group: 'life', blurb: 'Seen zoned' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧', group: 'life', blurb: 'Log kya kahenge' },
  { id: 'college', label: 'College', emoji: '🎓', group: 'life', blurb: 'Hostel chaos' },
  { id: 'daily-life', label: 'Daily Life', emoji: '☕', group: 'life', blurb: 'Little moments' },
  { id: 'nostalgia', label: 'Nostalgia', emoji: '📼', group: 'life', blurb: '90s & 2000s' },
  // World
  { id: 'cities', label: 'Cities', emoji: '🏙️', group: 'world', blurb: 'Local to global' },
  { id: 'countries', label: 'Countries', emoji: '🌍', group: 'world', blurb: 'Around the world' },
  { id: 'travel', label: 'Travel', emoji: '✈️', group: 'world', blurb: 'Goa trip pending' },
  { id: 'science', label: 'Science', emoji: '🔬', group: 'world', blurb: 'Powerhouse of the cell' },
  { id: 'space', label: 'Space', emoji: '🚀', group: 'world', blurb: 'To the moon' },
  { id: 'history', label: 'History', emoji: '🏛️', group: 'world', blurb: 'Then & now' },
  // Wild
  { id: 'chaos', label: 'Random Chaos', emoji: '🌀', group: 'wild', blurb: 'Beautifully absurd' },
  // Spicy (18+)
  { id: 'naughty', label: 'Naughty', emoji: '🌶️', group: 'spicy', blurb: 'Wink wink' },
];

export const CATEGORY_BY_ID: ReadonlyMap<CategoryId, CategoryMeta> = new Map(
  CATEGORIES.map((c) => [c.id, c])
);

export const CATEGORY_GROUPS: { id: CategoryGroup; label: string; emoji: string }[] = [
  { id: 'food', label: 'Food', emoji: '🍽️' },
  { id: 'india', label: 'India', emoji: '🇮🇳' },
  { id: 'screen', label: 'Screen', emoji: '🎬' },
  { id: 'play', label: 'Play', emoji: '🎮' },
  { id: 'web', label: 'Internet', emoji: '🌐' },
  { id: 'work', label: 'Work', emoji: '💼' },
  { id: 'life', label: 'Life', emoji: '💫' },
  { id: 'world', label: 'World', emoji: '🌍' },
  { id: 'wild', label: 'Wild', emoji: '🌀' },
  { id: 'spicy', label: 'Spicy', emoji: '🌶️' },
];

/** All category ids — the full catalogue (built and unbuilt). */
export const ALL_CATEGORY_IDS: CategoryId[] = CATEGORIES.map((c) => c.id);

/** Authored word counts per category, computed once from the corpus. */
const WORD_COUNTS: Partial<Record<CategoryId, number>> = {};
for (const w of ALL_WORDS) {
  WORD_COUNTS[w.category] = (WORD_COUNTS[w.category] ?? 0) + 1;
}

export function categoryWordCount(id: CategoryId): number {
  return WORD_COUNTS[id] ?? 0;
}

/** All words in a category, alphabetically — powers the long-press preview. */
export function wordsForCategory(id: CategoryId): string[] {
  return ALL_WORDS.filter((w) => w.category === id)
    .map((w) => w.text)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * A category becomes "live" once it has enough words to be playable without
 * instant repeats. Below this it stays hidden from the UI and is never dealt.
 */
export const LIVE_MIN_WORDS = 5;

/**
 * Categories forced live regardless of word count — an explicit product
 * override of the LIVE_MIN_WORDS floor. These are exposed and dealt even when
 * thin, so they may repeat words within a match. Keep this list intentional.
 */
export const FORCE_LIVE_CATEGORY_IDS: ReadonlySet<CategoryId> = new Set<CategoryId>([
  'naughty',
]);

/**
 * Categories EXPOSED in the UI and the "Everything" pool, derived automatically
 * from word count — no manual allowlist to maintain. Gameplay selection also
 * respects this, so a thin/hidden category can never be dealt (even via a pack).
 * `FORCE_LIVE_CATEGORY_IDS` overrides the word-count floor.
 */
export const LIVE_CATEGORY_IDS: CategoryId[] = CATEGORIES.map((c) => c.id).filter(
  (id) => FORCE_LIVE_CATEGORY_IDS.has(id) || categoryWordCount(id) >= LIVE_MIN_WORDS
);

export const LIVE_CATEGORY_SET: ReadonlySet<CategoryId> = new Set(LIVE_CATEGORY_IDS);

/** Display metadata for the live categories only, in catalogue order. */
export const LIVE_CATEGORIES: CategoryMeta[] = CATEGORIES.filter((c) =>
  LIVE_CATEGORY_SET.has(c.id)
);
