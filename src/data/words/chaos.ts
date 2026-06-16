import { buildWords } from './_builder';

/**
 * Chaos words are deliberately abstract or absurd. They have high chaosScore
 * and high guessDifficulty: they produce unpredictable, funny clues and are
 * very hard for an impostor to fake. Used by Chaos Mode and the "Random Chaos"
 * category.
 */
export const chaosWords = buildWords(
  'chaos',
  { culture: 'global', chaos: 90, difficulty: 'hard' },
  [
    {
      text: 'The Last Slice',
      tags: ['politeness', 'nobody takes', 'awkward', 'offer', 'fridge', 'guilt', 'standoff', 'cut in half', 'manners', 'temptation'],
      related: ['Sharing', 'Pizza', 'Leftover'],
      clusters: ['abstract', 'social'],
      discussion: 88,
    },
    {
      text: 'That One Drawer',
      tags: ['cables', 'random', 'chaos', 'everything', 'mystery', 'old chargers', 'keys', 'never opened', 'household', 'junk'],
      related: ['Cupboard', 'Garage', 'Storage'],
      clusters: ['abstract', 'home'],
      discussion: 86,
    },
    {
      text: 'Phantom Vibration',
      tags: ['pocket', 'no notification', 'imagination', 'anxiety', 'check phone', 'ghost', 'habit', 'modern', 'addiction', 'paranoia'],
      related: ['Notification', 'Phone', 'Anxiety'],
      clusters: ['abstract', 'modern'],
      difficulty: 'evil',
      guess: 88,
    },
    {
      text: 'Pretending To Work',
      tags: ['boss walks by', 'alt tab', 'serious face', 'typing fast', 'spreadsheet open', 'busy', 'screen switch', 'meeting', 'survival', 'act'],
      related: ['Alt Tab', 'Office', 'Boss'],
      clusters: ['abstract', 'office'],
      discussion: 88,
    },
    {
      text: 'The Spinning Beach Ball',
      short: 'Loading Spinner',
      tags: ['frozen', 'patience', 'rainbow', 'crash fear', 'wait', 'mac', 'force quit', 'dread', 'unresponsive', 'stuck'],
      related: ['Buffering', 'Lag', 'Crash'],
      clusters: ['abstract', 'tech'],
      difficulty: 'evil',
      guess: 85,
    },
    {
      text: 'Walking Into A Room And Forgetting',
      short: 'Why Did I Come Here',
      tags: ['blank', 'doorway', 'memory', 'retrace', 'purpose lost', 'standing', 'confusion', 'relatable', 'brain', 'reset'],
      related: ['Forgot', 'Memory', 'Doorway'],
      clusters: ['abstract', 'relatable'],
      discussion: 90,
    },
  ]
);
