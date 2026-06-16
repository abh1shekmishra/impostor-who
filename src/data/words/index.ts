import type { WordEntry } from '@/types';
import { foodWords } from './food';
import { indiaWords } from './india';
import { screenWords } from './screen';
import { techWords } from './tech';
import { lifeWords } from './life';
import { worldWords } from './world';
import { webWords } from './web';
import { chaosWords } from './chaos';

/**
 * The complete seed corpus. New packs (including AI-generated ones) are simply
 * concatenated here; nothing else in the app needs to change. The corpus is
 * frozen at module load so it can be safely shared as an immutable index.
 */
export const ALL_WORDS: readonly WordEntry[] = Object.freeze([
  ...foodWords,
  ...indiaWords,
  ...screenWords,
  ...techWords,
  ...lifeWords,
  ...worldWords,
  ...webWords,
  ...chaosWords,
]);

/** Fast lookup by id (used by stats, decoy selection, AI dedupe checks). */
export const WORD_BY_ID: ReadonlyMap<string, WordEntry> = new Map(
  ALL_WORDS.map((w) => [w.id, w])
);
