import { describe, expect, it } from 'vitest';
import {
  hashStr,
  makeRng,
  mulberry32,
  pickIndices,
  shuffle,
  weightedPick,
} from './random';

describe('mulberry32', () => {
  it('is deterministic for a given seed', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = Array.from({ length: 5 }, () => a());
    const seqB = Array.from({ length: 5 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it('produces different streams for different seeds', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });

  it('stays within the [0, 1) range', () => {
    const rng = mulberry32(99);
    for (let i = 0; i < 1000; i++) {
      const n = rng();
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(1);
    }
  });
});

describe('hashStr', () => {
  it('is stable for the same input', () => {
    expect(hashStr('pizza')).toBe(hashStr('pizza'));
  });

  it('separates different inputs', () => {
    expect(hashStr('pizza')).not.toBe(hashStr('pasta'));
  });
});

describe('shuffle', () => {
  it('returns a permutation without mutating the input', () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input, mulberry32(7));
    expect(out).toHaveLength(input.length);
    expect([...out].sort()).toEqual([...input].sort());
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  it('orders identically for the same seed', () => {
    const a = shuffle([1, 2, 3, 4, 5], mulberry32(7));
    const b = shuffle([1, 2, 3, 4, 5], mulberry32(7));
    expect(a).toEqual(b);
  });
});

describe('pickIndices', () => {
  it('returns n distinct in-range indices', () => {
    const idx = pickIndices(10, 3, mulberry32(4));
    expect(idx).toHaveLength(3);
    expect(new Set(idx).size).toBe(3);
    expect(idx.every((i) => i >= 0 && i < 10)).toBe(true);
  });

  it('never asks for more than exist', () => {
    expect(pickIndices(2, 5, mulberry32(4))).toHaveLength(2);
  });
});

describe('weightedPick', () => {
  it('always returns the only non-zero-weighted item', () => {
    const items = ['a', 'b', 'c'];
    const weight = (x: string) => (x === 'b' ? 1 : 0);
    for (let seed = 0; seed < 20; seed++) {
      expect(weightedPick(items, weight, mulberry32(seed))).toBe('b');
    }
  });

  it('falls back to a uniform pick when all weights are zero', () => {
    expect(weightedPick(['a', 'b'], () => 0, mulberry32(1))).toBeDefined();
  });

  it('returns undefined for an empty list', () => {
    expect(weightedPick([], () => 1, mulberry32(1))).toBeUndefined();
  });
});

describe('makeRng', () => {
  it('is reproducible when seeded', () => {
    expect(makeRng(5)()).toBe(makeRng(5)());
  });
});
