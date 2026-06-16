import type { ContentPack } from '@/types';

/**
 * Curated content packs. `core` packs are always available; `seasonal` and
 * `ai` packs model the future generation pipeline (daily packs, IPL packs,
 * festival packs) — they carry a `season` window so the app can surface
 * "today's pack" automatically.
 */
export const CONTENT_PACKS: ContentPack[] = [
  {
    id: 'everything',
    name: 'Everything',
    emoji: '✨',
    description: 'The full library. Maximum variety, maximum chaos.',
    categories: [],
    accent: '129 132 255',
    kind: 'core',
  },
  {
    id: 'desi-special',
    name: 'Desi Special',
    emoji: '🇮🇳',
    description: 'Golgappa, UPSC, Sharma ji ka beta. Peak India.',
    categories: ['indian-food', 'regional-food', 'festivals', 'bollywood', 'cricket', 'family', 'daily-life'],
    accent: '245 158 66',
    filter: { culture: ['india', 'india-north', 'india-south'] },
    kind: 'core',
  },
  {
    id: 'office-survival',
    name: 'Office Survival',
    emoji: '💼',
    description: 'For the team offsite. Meetings, appraisals, reply-all regret.',
    categories: ['office', 'startup', 'programming', 'engineering', 'technology'],
    accent: '52 199 142',
    kind: 'core',
  },
  {
    id: 'gen-z-energy',
    name: 'Gen Z Energy',
    emoji: '🧃',
    description: 'Situationships, doomscrolling, very online brainrot.',
    categories: ['memes', 'social-media', 'internet', 'relationships', 'creators'],
    accent: '236 72 153',
    filter: { difficulty: ['easy', 'medium', 'hard'] },
    kind: 'core',
  },
  {
    id: 'family-friendly',
    name: 'Family Night',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Squeaky clean. Safe for kids, grandparents, and everyone in between.',
    categories: ['cartoons', 'animals', 'global-food', 'festivals', 'nostalgia', 'science'],
    accent: '99 102 241',
    filter: { safeOnly: true },
    kind: 'core',
  },
  {
    id: 'hostel-nights',
    name: 'Hostel Nights',
    emoji: '🌙',
    description: 'Maggi at 2am, proxy attendance, mess food protests.',
    categories: ['college', 'engineering', 'indian-food', 'memes', 'games'],
    accent: '167 139 250',
    kind: 'core',
  },
  {
    id: 'pure-chaos',
    name: 'Pure Chaos',
    emoji: '🌀',
    description: 'Abstract, absurd, argument-starting. Not for the faint-hearted.',
    categories: ['chaos'],
    accent: '255 99 112',
    filter: { difficulty: ['hard', 'evil'] },
    kind: 'core',
  },
  // ── Seasonal / AI-style packs (refreshable by a generation pipeline) ──
  {
    id: 'ipl-mania',
    name: 'IPL Mania',
    emoji: '🏏',
    description: 'Auction drama, last-ball sixes, gully cricket. Refreshes every season.',
    categories: ['cricket'],
    accent: '245 184 74',
    kind: 'seasonal',
    season: { from: '03-20', to: '05-30' },
  },
  {
    id: 'festival-lights',
    name: 'Festival Lights',
    emoji: '🪔',
    description: 'A rotating festival pack that lights up around the calendar.',
    categories: ['festivals', 'indian-food'],
    accent: '245 158 66',
    kind: 'seasonal',
    season: { from: '10-15', to: '11-15' },
  },
  {
    id: 'daily-mix',
    name: 'Daily Mix',
    emoji: '🎲',
    description: 'A fresh hand-picked blend every day, generated to stay surprising.',
    categories: ['daily-life', 'memes', 'relationships', 'global-food', 'chaos'],
    accent: '129 132 255',
    kind: 'ai',
  },
];

export const PACK_BY_ID: ReadonlyMap<string, ContentPack> = new Map(
  CONTENT_PACKS.map((p) => [p.id, p])
);

/**
 * Returns the seasonal pack whose window contains today's MM-DD, if any.
 * Powers the "Today's pack" highlight on the Content Packs screen.
 */
export function getSeasonalPackForToday(date = new Date()): ContentPack | null {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
  for (const pack of CONTENT_PACKS) {
    if (pack.kind !== 'seasonal' || !pack.season) continue;
    const { from, to } = pack.season;
    const inWindow =
      from <= to ? mmdd >= from && mmdd <= to : mmdd >= from || mmdd <= to;
    if (inWindow) return pack;
  }
  return null;
}
