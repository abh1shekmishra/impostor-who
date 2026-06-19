import { buildWords } from './_builder';

/**
 * Naughty — cheeky double-entendre words. Currently un-gated (fully safe) so
 * they are always playable, including in family-safe mode. Re-add
 * `adult: true` / `safe: false` to the defaults below to put them behind the
 * room's 18+ toggle again.
 */
export const naughtyWords = buildWords(
  'naughty',
  { culture: 'global', year: 'timeless' },
  [
    {
      text: 'Love Bite',
      tags: ['collar', 'mirror', 'morning', 'excuses', 'caught', 'embarrassed', 'coverup', 'smile', 'suspicious'],
      related: ['Date Night', 'Perfume', 'Selfie'],
      clusters: ['social', 'daily'],
      difficulty: 'medium', popularity: 88, discussion: 90, chaos: 71, guess: 58,
    },
    {
      text: 'Banana',
      tags: ['canteen', 'giggles', 'lunch break', 'yellow', 'friends', 'awkward', 'memes', 'pointing', 'laughter'],
      related: ['Cucumber', 'Ice Cream', 'Lollipop'],
      clusters: ['kitchen', 'social'],
      difficulty: 'easy', popularity: 95, discussion: 98, chaos: 75, guess: 50,
    },
    {
      text: 'Cucumber',
      tags: ['salad', 'summer', 'canteen', 'healthy', 'giggles', 'friends', 'awkward', 'fresh', 'market'],
      related: ['Banana', 'Carrot', 'Ice Cream'],
      clusters: ['kitchen', 'social'],
      difficulty: 'easy', popularity: 92, discussion: 96, chaos: 74, guess: 52,
    },
    {
      text: 'Lollipop',
      tags: ['childhood', 'sticky', 'school', 'sharing', 'playful', 'giggles', 'colorful', 'treat', 'fun'],
      related: ['Ice Cream', 'Candy', 'Chocolate'],
      clusters: ['nostalgia', 'social'],
      difficulty: 'easy', popularity: 94, discussion: 88, chaos: 68, guess: 48,
    },
    {
      text: 'Melons',
      tags: ['summer', 'market', 'sweet', 'family', 'picnic', 'fresh', 'weekend', 'happy', 'sharing'],
      related: ['Watermelon', 'Mango', 'Coconut'],
      clusters: ['kitchen', 'social'],
      difficulty: 'hard', popularity: 58, discussion: 90, chaos: 75, guess: 70,
    },
    {
      text: 'Missionary',
      tags: ['door knock', 'pamphlet', 'overseas', 'bicycle', 'suit', 'faith', 'charity', 'giggles', 'awkward', 'sunday'],
      related: ['Church', 'Charity', 'Pamphlet'],
      clusters: ['social', 'community'],
      difficulty: 'medium', popularity: 75, discussion: 88, chaos: 72, guess: 58,
    },
  ]
);
