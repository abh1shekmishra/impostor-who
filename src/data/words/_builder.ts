import type {
  CategoryId,
  Culture,
  Difficulty,
  Language,
  WordEntry,
} from '@/types';

/**
 * Lightweight authoring helper.
 *
 * Hand-authoring 50k entries with every field is error-prone, so each word is
 * declared with its *meaningful* fields and the builder fills sensible,
 * category-aware defaults for the rest. This keeps the dataset DRY while every
 * emitted `WordEntry` remains fully populated and strictly typed.
 */
export interface WordSeed {
  text: string;
  short?: string;
  tags: string[];
  related?: string[];
  clusters?: string[];
  difficulty?: Difficulty;
  culture?: Culture;
  language?: Language;
  popularity?: number;
  year?: WordEntry['yearRelevance'];
  safe?: boolean;
  adult?: boolean;
  /** 0–100 scores; defaulted from difficulty + tag richness when omitted. */
  discussion?: number;
  chaos?: number;
  guess?: number;
}

const DIFFICULTY_GUESS: Record<Difficulty, number> = {
  easy: 30,
  medium: 50,
  hard: 70,
  evil: 88,
};

/** Deterministic slug so ids are stable across reloads. */
function slugify(category: CategoryId, text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return `${category}:${base}`;
}

export function buildWords(
  category: CategoryId,
  defaults: Partial<WordSeed>,
  seeds: WordSeed[]
): WordEntry[] {
  return seeds.map((seed) => {
    const merged = { ...defaults, ...seed };
    const difficulty = merged.difficulty ?? 'medium';
    const tagRichness = Math.min(100, 40 + merged.tags.length * 6);
    return {
      id: slugify(category, merged.text),
      text: merged.text,
      ...(merged.short ? { short: merged.short } : {}),
      category,
      difficulty,
      tags: merged.tags,
      related: merged.related ?? [],
      semanticClusters: merged.clusters ?? [],
      culture: merged.culture ?? 'global',
      language: merged.language ?? 'en',
      popularity: merged.popularity ?? 70,
      yearRelevance: merged.year ?? 'timeless',
      safe: merged.safe ?? true,
      ...(merged.adult ? { adult: true } : {}),
      discussionScore: merged.discussion ?? tagRichness,
      chaosScore: merged.chaos ?? (difficulty === 'evil' ? 70 : 45),
      guessDifficulty: merged.guess ?? DIFFICULTY_GUESS[difficulty],
      source: 'seed',
    } satisfies WordEntry;
  });
}
