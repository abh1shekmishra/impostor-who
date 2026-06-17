import type {
  CategoryId,
  Difficulty,
  GameMode,
  RoundConfig,
  WordEntry,
  WordPairing,
} from '@/types';
import { ALL_WORDS } from '@/data/words';
import { ALL_CATEGORY_IDS } from '@/data/categories';
import { hashStr, makeRng, pick, shuffle, weightedPick, type Rng } from './random';

/**
 * The content selection engine.
 *
 * Responsibilities:
 *  1. Filter the corpus down to what the round's config allows (categories,
 *     difficulty, safe-mode, language, adult gating).
 *  2. Score the candidates so the chosen word matches the *mode* (e.g. Chaos
 *     biases toward chaosScore) while avoiding recent repeats.
 *  3. Find a high-quality decoy for "reverse"-style modes — a word that's
 *     semantically close but distinct, so the impostor can plausibly blend in.
 */

export interface SelectionOptions {
  config: RoundConfig;
  mode: GameMode;
  /** Ids used recently this match — strongly de-prioritised to avoid repeats. */
  recentIds?: readonly string[];
  seed?: number;
}

function resolveCategories(config: RoundConfig): Set<CategoryId> {
  if (config.mixEverything || config.categories.length === 0) {
    return new Set(ALL_CATEGORY_IDS);
  }
  return new Set(config.categories);
}

export function filterCorpus(config: RoundConfig, mode: GameMode): WordEntry[] {
  const cats = resolveCategories(config);
  const difficulties = new Set<Difficulty>(
    config.difficulty.length ? config.difficulty : (['easy', 'medium', 'hard', 'evil'] as Difficulty[])
  );

  return ALL_WORDS.filter((w) => {
    if (!cats.has(w.category)) return false;
    if (!difficulties.has(w.difficulty)) return false;
    // Family-safe hides anything not explicitly safe.
    if (config.familySafe && !w.safe) return false;
    // Adult content only when explicitly allowed.
    if (w.adult && !config.allowAdult) return false;
    // English-only excludes hindi/hinglish entries.
    if (config.englishOnly && w.language !== 'en') return false;
    // Chaos mode prefers chaos category but still allows others as fallback.
    if (mode.rules.chaosBias && w.chaosScore < 55 && cats.size > 1) return false;
    return true;
  });
}

function scoreWord(w: WordEntry, mode: GameMode, recent: Set<string>): number {
  let score = 1;
  // Reward discussion richness — the core of a good round.
  score += w.discussionScore * 0.6;
  if (mode.rules.chaosBias) score += w.chaosScore * 1.2;
  if (mode.rules.reverseObjective) {
    // Reverse rewards medium guessability so decoys feel close but fair.
    score += (100 - Math.abs(w.guessDifficulty - 55)) * 0.4;
  }
  // Gently prefer recognizable words so clues land for everyone in the room.
  score += w.popularity * 0.25;
  // Hard penalty for very recent repeats.
  if (recent.has(w.id)) score *= 0.03;
  return Math.max(0.01, score);
}

export function selectWord(opts: SelectionOptions): WordEntry | null {
  const { config, mode } = opts;
  const rng: Rng = makeRng(opts.seed);
  const recent = new Set(opts.recentIds ?? []);
  let candidates = filterCorpus(config, mode);
  if (candidates.length === 0) {
    // Graceful fallback: ignore difficulty/safe filters before giving up.
    candidates = ALL_WORDS.filter((w) => resolveCategories(config).has(w.category));
  }
  if (candidates.length === 0) candidates = [...ALL_WORDS];
  // If everything is "recent", clear the constraint so play never stalls.
  const fresh = candidates.filter((w) => !recent.has(w.id));
  const pool = fresh.length > 0 ? fresh : candidates;
  return weightedPick(pool, (w) => scoreWord(w, mode, recent), rng) ?? pool[0] ?? null;
}

/**
 * Choose a decoy for the impostor in reverse/decoy modes: a different word that
 * shares semantic clusters or related links with the secret word, ideally in
 * the same category and difficulty band.
 */
export function selectDecoy(
  word: WordEntry,
  config: RoundConfig,
  mode: GameMode,
  seed?: number
): WordEntry | null {
  if (!mode.rules.impostorGetsDecoy) return null;
  const rng = makeRng(seed ? seed + 7 : undefined);
  const corpus = filterCorpus(config, mode).filter((w) => w.id !== word.id);
  const clusters = new Set(word.semanticClusters);
  const related = new Set(word.related.map((r) => r.toLowerCase()));

  const scored = corpus.map((w) => {
    let s = 0;
    if (w.category === word.category) s += 3;
    if (w.difficulty === word.difficulty) s += 1;
    s += w.semanticClusters.filter((c) => clusters.has(c)).length * 4;
    if (related.has(w.text.toLowerCase())) s += 5;
    if (w.related.some((r) => r.toLowerCase() === word.text.toLowerCase())) s += 5;
    return { w, s };
  });

  const close = scored.filter((x) => x.s >= 4).sort((a, b) => b.s - a.s);
  if (close.length > 0) {
    // Pick from the top handful for variety while staying "close".
    const top = close.slice(0, Math.min(5, close.length)).map((x) => x.w);
    return pick(top, rng) ?? close[0]!.w;
  }
  // Fallback: any same-category word.
  const sameCat = corpus.filter((w) => w.category === word.category);
  return pick(sameCat.length ? sameCat : corpus, rng) ?? null;
}

export function selectPairing(opts: SelectionOptions): WordPairing | null {
  const civilian = selectWord(opts);
  if (!civilian) return null;
  const decoy = selectDecoy(civilian, opts.config, opts.mode, opts.seed) ?? undefined;
  return { civilian, ...(decoy ? { decoy } : {}) };
}

/** Count of words currently playable under a config — shown in Create Room. */
export function countPlayable(config: RoundConfig, mode: GameMode): number {
  return filterCorpus(config, mode).length;
}

/**
 * The impostor's hint: a SINGLE evocative descriptor of the word (e.g. Maggi →
 * "yellow", Golgappa → "crunch", UPSC → "dream"). One word only — enough to
 * sense the vibe and bluff a clue, never enough to be handed talking points.
 *
 * It's drawn from the word's associative tags + broader semantic clusters, with
 * any tag that echoes the word itself removed so we never give it away. Seeded
 * by the word + round, so it's stable while the impostor peeks yet re-rolls
 * every round for freshness.
 */
export function impostorVibeHint(word: WordEntry, roundIndex = 0): string {
  const rng = makeRng(hashStr(`${word.id}#${roundIndex}`));
  const prettify = (s: string) => s.replace(/[-_]/g, ' ').trim();

  const wordTokens = word.text
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  const isGiveaway = (tag: string) => {
    const t = tag.toLowerCase();
    return wordTokens.some((tok) => t.includes(tok) || tok.includes(t));
  };

  const pool = [...word.tags, ...word.semanticClusters]
    .map(prettify)
    .filter((t) => t && !isGiveaway(t));

  return pick(shuffle(pool, rng), rng) ?? prettify(word.tags[0] ?? word.category);
}
