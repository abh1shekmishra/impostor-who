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
    {
      text: 'Dracula',
      tags: ['fangs', 'coffin', 'garlic', 'bats', 'cape', 'transylvania', 'blood', 'castle', 'spooky', 'no sunlight'],
      related: ['Frankenstein', 'Werewolf', 'Vampire'],
      clusters: ['horror', 'monster'],
      year: 'timeless',
      difficulty: 'easy',
      popularity: 88,
      discussion: 78,
      chaos: 52,
      guess: 42,
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

export const entertainment = buildWords(
  'entertainment',
  { culture: 'internet', year: 'modern' },
  [
    {
      text: 'Playlist',
      tags: ['mood', 'shuffle', 'commute', 'repeat', 'vibe', 'queue', 'favorite', 'late night', 'skip', 'headphones'],
      related: ['Song', 'Album', 'DJ'],
      clusters: ['music', 'daily-media'],
      difficulty: 'easy',
      popularity: 88,
      discussion: 80,
      chaos: 44,
      guess: 46,
    },
    {
      text: 'Instagram',
      tags: ['mark', 'stories', 'reel', 'dm', 'follow', 'streak', 'profile', 'highlight', 'explore', 'aesthetic'],
      related: ['Social Media', 'Reels', 'Stories'],
      clusters: ['social', 'app'],
      difficulty: 'easy',
      popularity: 94,
      discussion: 80,
      chaos: 46,
      guess: 42,
    },
    {
      text: 'Netflix',
      tags: ['binge', 'subscription', 'series night', 'account share', 'skip intro', 'watchlist', 'streaming', 'episode', 'couch', 'weekend'],
      related: ['Prime Video', 'Hotstar', 'Series'],
      clusters: ['streaming', 'shows'],
      difficulty: 'easy',
      popularity: 92,
      discussion: 82,
      chaos: 44,
      guess: 44,
    },
    {
      text: 'Series',
      tags: ['episode', 'season finale', 'spoiler', 'cliffhanger', 'watch together', 'theory', 'fanbase', 'slow burn', 'next episode', 'fandom'],
      related: ['Netflix', 'Web Show', 'Binge'],
      clusters: ['streaming', 'shows'],
      difficulty: 'easy',
      popularity: 86,
      discussion: 84,
      chaos: 42,
      guess: 48,
    },
    {
      text: 'Karaoke',
      tags: ['tunes', 'mic', 'off key', 'lyrics', 'friends night', 'stage', 'duet', 'cheering', 'spotlight', 'embarrassing'],
      related: ['Singing', 'Playlist', 'Party'],
      clusters: ['music', 'social'],
      difficulty: 'medium',
      popularity: 74,
      discussion: 82,
      chaos: 56,
      guess: 58,
    },
    {
      text: 'Meme',
      tags: ['caption', 'template', 'relatable', 'viral', 'inside joke', 'comment section', 'share', 'reaction', 'trend', 'humor'],
      related: ['Meme Page', 'Template', 'Reel'],
      clusters: ['internet', 'humour'],
      difficulty: 'easy',
      popularity: 90,
      discussion: 86,
      chaos: 56,
      guess: 44,
    },
    {
      text: 'Domino',
      tags: ['dots', 'half', 'tiles', 'chain', 'table game', 'falling pattern', 'counting', 'strategy', 'turns', 'match ends'],
      related: ['Board Game', 'Ludo', 'Cards'],
      clusters: ['game-night', 'social'],
      difficulty: 'medium',
      popularity: 64,
      discussion: 74,
      chaos: 50,
      guess: 58,
    },
  ]
);

export const screenWords = [...entertainment, ...hollywood, ...anime, ...cartoons];
