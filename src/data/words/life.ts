import { buildWords } from './_builder';

export const relationships = buildWords(
  'relationships',
  { culture: 'global', year: 'modern' },
  [
    {
      text: 'Seen Zoned',
      tags: ['blue tick', 'typing', 'anxiety', 'no reply', 'ego', 'screenshot', 'overthink', 'last seen', 'silence', 'ouch'],
      related: ['Ghosting', 'Left on Read', 'Double Tick'],
      clusters: ['dating', 'digital'],
      difficulty: 'medium',
      discussion: 86,
    },
    {
      text: 'Situationship',
      tags: ['undefined', 'labels', 'confusion', 'gen z', 'almost', 'no title', 'whatever we are', 'commitment', 'modern', 'limbo'],
      related: ['Talking Stage', 'Ghosting', 'Soft Launch'],
      clusters: ['dating', 'gen-z'],
      difficulty: 'hard',
      popularity: 55,
    },
    {
      text: 'Long Distance',
      tags: ['timezone', 'video call', 'trust', 'airport', 'goodnight text', 'missing', 'screenshot', 'countdown', 'patience', 'reunion'],
      related: ['Reunion', 'Video Call', 'Visit'],
      clusters: ['relationship', 'commitment'],
      difficulty: 'medium',
    },
    {
      text: 'Couple Goals',
      tags: ['instagram', 'cringe', 'matching', 'envy', 'caption', 'staged', 'aww', 'comparison', 'public', 'aesthetic'],
      related: ['Soft Launch', 'Anniversary', 'PDA'],
      clusters: ['dating', 'social'],
      difficulty: 'easy',
    },
  ]
);

export const family = buildWords(
  'family',
  { culture: 'india', language: 'hinglish' },
  [
    {
      text: 'Indian Mom Slipper',
      short: 'Chappal',
      tags: ['flying', 'accuracy', 'threat', 'discipline', 'aim', 'fear', 'remote', 'legendary', 'speed', 'childhood'],
      related: ['Belan', 'Scale', 'Father Belt'],
      clusters: ['family-life', 'humour'],
      difficulty: 'easy',
      popularity: 90,
      discussion: 88,
    },
    {
      text: 'Log Kya Kahenge',
      tags: ['society', 'pressure', 'reputation', 'relatives', 'fear', 'parents', 'decisions', 'taunt', 'image', 'guilt'],
      related: ['Sharma Ji Ka Beta', 'Society', 'Reputation'],
      clusters: ['family-life', 'culture'],
      difficulty: 'medium',
      discussion: 90,
    },
    {
      text: 'Dad on WhatsApp',
      tags: ['good morning', 'forward', 'fake news', 'emoji overload', 'group admin', 'flowers', 'one finger typing', 'caps', 'quote', 'wholesome'],
      related: ['Family Group', 'Forward', 'Good Morning Image'],
      clusters: ['family-life', 'digital'],
      difficulty: 'medium',
    },
    {
      text: 'Bringing Marks Home',
      short: 'Report Card Day',
      tags: ['signature', 'forge', 'fear', 'comparison', 'pta meeting', 'red ink', 'silence', 'lecture', 'nervous', 'hide'],
      related: ['Report Card', 'PTA', 'Tuition'],
      clusters: ['family-life', 'school'],
      difficulty: 'easy',
    },
  ]
);

export const college = buildWords(
  'college',
  { culture: 'india', language: 'hinglish', year: 'modern' },
  [
    {
      text: 'Hostel Mess Food',
      short: 'Mess Food',
      tags: ['complaint', 'same dal', 'tray', 'protest', 'midnight maggi', 'survival', 'rumor', 'committee', 'homesick', 'budget'],
      related: ['Maggi', 'Canteen', 'Tiffin'],
      clusters: ['hostel-life', 'food'],
      difficulty: 'easy',
      discussion: 86,
    },
    {
      text: 'Proxy Attendance',
      short: 'Proxy',
      tags: ['present sir', 'voice change', 'friend', 'risk', '75 percent', 'roll number', 'sleep', 'jugaad', 'gratitude', 'fear'],
      related: ['Attendance', 'Bunk', 'Detained'],
      clusters: ['college-life', 'classroom'],
      difficulty: 'medium',
    },
    {
      text: 'Fresher Party',
      tags: ['stage fear', 'introduction', 'seniors', 'talent', 'awkward', 'mr fresher', 'crush spotting', 'dance', 'first impression', 'nervous'],
      related: ['Farewell', 'Cultural Fest', 'Ragging'],
      clusters: ['college-life', 'event'],
      difficulty: 'medium',
    },
    {
      text: 'Group Project',
      tags: ['one person works', 'free riders', 'last night', 'ppt', 'blame', 'whatsapp group', 'deadline', 'unequal', 'stress', 'submit'],
      related: ['Assignment', 'Presentation', 'Deadline'],
      clusters: ['college-life', 'academics'],
      difficulty: 'easy',
      discussion: 88,
    },
  ]
);

export const dailyLife = buildWords(
  'daily-life',
  { culture: 'global' },
  [
    {
      text: 'Snooze Button',
      tags: ['5 more minutes', 'lie', 'morning', 'regret', 'alarm war', 'late', 'guilt', 'cozy', 'repeat', 'denial'],
      related: ['Alarm', 'Oversleep', 'Monday'],
      clusters: ['daily', 'morning'],
      difficulty: 'easy',
      discussion: 80,
    },
    {
      text: 'Online Shopping Cart',
      short: 'Abandoned Cart',
      tags: ['wishlist', 'sale wait', 'never buy', 'midnight', 'window shopping', 'discount', 'regret', 'add remove', 'therapy', 'temptation'],
      related: ['Sale', 'Wishlist', 'COD'],
      clusters: ['daily', 'shopping'],
      difficulty: 'medium',
    },
    {
      text: 'Group Photo',
      tags: ['one blink', 'retake', 'who is taking', 'tall back', 'say cheese', 'self timer', 'crop someone', 'angle', 'patience', 'chaos'],
      related: ['Selfie', 'Candid', 'Boomerang'],
      clusters: ['daily', 'social'],
      difficulty: 'easy',
    },
  ]
);

export const nostalgia = buildWords(
  'nostalgia',
  { culture: 'india', language: 'hinglish', year: 'retro' },
  [
    {
      text: 'Camel Geometry Box',
      short: 'Geometry Box',
      tags: ['compass', 'school', 'sharpener', 'sword fight', 'protractor', 'rusty', 'rattling', 'childhood', 'eraser', 'metal'],
      related: ['Natraj Pencil', 'Compass', 'Ink Pen'],
      clusters: ['nostalgia', 'school'],
      difficulty: 'medium',
      discussion: 84,
    },
    {
      text: 'Snake Game',
      tags: ['nokia', 'pixel', 'high score', 'tail', 'old phone', 'bored', 'simple', 'addictive', 'green screen', 'classic'],
      related: ['Brick Game', 'Bounce', 'Nokia 1100'],
      clusters: ['nostalgia', 'games'],
      difficulty: 'medium',
    },
    {
      text: 'Cassette Pencil Rewind',
      short: 'Cassette Tape',
      tags: ['rewind', 'pencil', 'mixtape', 'walkman', 'tangle', 'side a', 'nostalgia', 'analog', 'songs', 'ribbon'],
      related: ['Walkman', 'CD', 'Radio'],
      clusters: ['nostalgia', 'music'],
      difficulty: 'hard',
      popularity: 50,
    },
  ]
);

export const lifeWords = [
  ...relationships,
  ...family,
  ...college,
  ...dailyLife,
  ...nostalgia,
];
