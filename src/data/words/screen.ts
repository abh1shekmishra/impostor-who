import { buildWords } from './_builder';

export const hollywood = buildWords(
  'hollywood',
  { culture: 'west' },
  [
    {
      text: 'Titanic',
      tags: ['door debate', 'iceberg', 'romance', 'drawing', 'three hours', 'flute', 'ocean', 'sinking', 'classic', 'tears'],
      related: ['Avatar', 'The Notebook', 'Pearl Harbor'],
      clusters: ['blockbuster', 'romance'],
      difficulty: 'easy',
      year: 'retro',
      discussion: 84,
    },
    {
      text: 'Inception',
      tags: ['dream', 'confusing', 'spinning top', 'layers', 'rewatch', 'mind bend', 'ending debate', 'loud horn', 'heist', 'time'],
      related: ['Interstellar', 'Tenet', 'The Matrix'],
      clusters: ['mindbender', 'sci-fi'],
      difficulty: 'medium',
      discussion: 86,
    },
    {
      text: 'Avengers Endgame',
      tags: ['snap', 'theatre', 'whistle', 'time travel', 'goosebumps', 'portals', 'tears', 'finale', 'spoilers', 'assemble'],
      related: ['Infinity War', 'Iron Man', 'Thanos'],
      clusters: ['superhero', 'blockbuster'],
      difficulty: 'easy',
      year: 'modern',
    },
    {
      text: 'Joker',
      tags: ['stairs dance', 'makeup', 'society', 'dark', 'monologue', 'laugh', 'oscar', 'unsettling', 'meme', 'antihero'],
      related: ['Batman', 'Taxi Driver', 'The Dark Knight'],
      clusters: ['antihero', 'drama'],
      difficulty: 'medium',
    },
  ]
);

export const anime = buildWords(
  'anime',
  { culture: 'internet' },
  [
    {
      text: 'Naruto',
      tags: ['ramen', 'headband', 'running', 'believe it', 'ninja', 'filler', 'sasuke', 'childhood', 'hand signs', 'never give up'],
      related: ['Boruto', 'Bleach', 'One Piece'],
      clusters: ['shonen', 'classic-anime'],
      difficulty: 'easy',
      year: 'modern',
      discussion: 84,
    },
    {
      text: 'Attack on Titan',
      tags: ['walls', 'titans', 'plot twist', 'basement', 'freedom', 'dark', 'theory', 'finale debate', 'salute', 'ending'],
      related: ['Demon Slayer', 'Death Note', 'Vinland Saga'],
      clusters: ['shonen', 'dark-anime'],
      difficulty: 'medium',
    },
    {
      text: 'One Piece',
      tags: ['pirate', 'long', '1000 episodes', 'straw hat', 'treasure', 'crew', 'loyalty', 'gear', 'commitment', 'dream'],
      related: ['Naruto', 'Fairy Tail', 'Bleach'],
      clusters: ['shonen', 'epic-anime'],
      difficulty: 'medium',
    },
    {
      text: 'Doraemon',
      tags: ['gadget', 'pocket', 'nobita', 'homework', 'time machine', 'dorayaki', 'childhood', 'cartoon network', 'bell', 'helper'],
      related: ['Shinchan', 'Ninja Hattori', 'Pokemon'],
      clusters: ['kids-anime', 'nostalgia'],
      difficulty: 'easy',
      popularity: 90,
    },
  ]
);

export const cartoons = buildWords(
  'cartoons',
  { culture: 'global', year: 'retro' },
  [
    {
      text: 'Tom and Jerry',
      tags: ['chase', 'no dialogue', 'cheese', 'cat mouse', 'sunday', 'iron', 'classic', 'violence', 'childhood', 'wholesome'],
      related: ['Looney Tunes', 'Oggy', 'Mickey Mouse'],
      clusters: ['kids-cartoon', 'nostalgia'],
      difficulty: 'easy',
      popularity: 95,
      discussion: 82,
    },
    {
      text: 'Shinchan',
      tags: ['butt dance', 'crayon', 'mischief', 'action kamen', 'banned', 'cheeky', 'mom slipper', 'childhood', 'snacks', 'hindi dub'],
      related: ['Doraemon', 'Kiteretsu', 'Ninja Hattori'],
      clusters: ['kids-cartoon', 'nostalgia'],
      difficulty: 'easy',
    },
    {
      text: 'Scooby Doo',
      tags: ['mystery', 'van', 'snacks', 'ghost', 'mask reveal', 'meddling kids', 'gang', 'cowardly', 'clues', 'spooky'],
      related: ['Courage', 'Johnny Bravo', 'Dexter'],
      clusters: ['kids-cartoon', 'mystery'],
      difficulty: 'medium',
    },
  ]
);

export const screenWords = [...hollywood, ...anime, ...cartoons];
