/**
 * Small, dependency-free random utilities.
 *
 * `mulberry32` gives a deterministic, seedable PRNG so rounds can be made
 * reproducible for testing while gameplay defaults to a time-based seed.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

export function makeRng(seed?: number): Rng {
  return mulberry32(seed ?? (Date.now() ^ (Math.random() * 0x100000000)) >>> 0);
}

/** In-place Fisher–Yates returning a new array (input untouched). */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const a = out[i]!;
    const b = out[j]!;
    out[i] = b;
    out[j] = a;
  }
  return out;
}

export function pick<T>(items: readonly T[], rng: Rng = Math.random): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(rng() * items.length)];
}

/** Pick `n` distinct indices from [0, length). */
export function pickIndices(length: number, n: number, rng: Rng = Math.random): number[] {
  const idx = Array.from({ length }, (_, i) => i);
  return shuffle(idx, rng).slice(0, Math.min(n, length));
}

/**
 * Weighted pick. `weight` maps an item to a non-negative number; higher weight
 * means higher chance. Falls back to uniform if all weights are zero.
 */
export function weightedPick<T>(
  items: readonly T[],
  weight: (item: T) => number,
  rng: Rng = Math.random
): T | undefined {
  if (items.length === 0) return undefined;
  let total = 0;
  const weights = items.map((it) => {
    const w = Math.max(0, weight(it));
    total += w;
    return w;
  });
  if (total <= 0) return pick(items, rng);
  let r = rng() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i]!;
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}
