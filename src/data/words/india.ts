import { buildWords } from './_builder';

export const festivals = buildWords(
  'festivals',
  { culture: 'india', language: 'hinglish' },
  [
    {
      text: 'Diwali',
      tags: ['lights', 'cleaning', 'sweets', 'gambling', 'new clothes', 'crackers', 'family', 'bonus', 'rangoli', 'pollution'],
      related: ['Holi', 'Dhanteras', 'Bhai Dooj'],
      clusters: ['festival', 'lights'],
      difficulty: 'easy',
      popularity: 96,
      discussion: 90,
    },
    {
      text: 'Holi',
      tags: ['colors', 'water', 'bhang', 'thandai', 'old clothes', 'gujiya', 'chaos', 'wet', 'gang', 'spring'],
      related: ['Diwali', 'Rangpanchami', 'Lathmar'],
      clusters: ['festival', 'colors'],
      difficulty: 'easy',
      popularity: 94,
      discussion: 88,
    },
    {
      text: 'Ganesh Chaturthi',
      tags: ['mumbai', 'visarjan', 'modak', 'pandal', 'dhol', 'eco', 'crowd', 'idol', 'ten days', 'devotion'],
      related: ['Navratri', 'Dahi Handi', 'Lalbaugcha Raja'],
      clusters: ['festival', 'maharashtra'],
      difficulty: 'medium',
    },
    {
      text: 'Onam',
      tags: ['kerala', 'sadya', 'banana leaf', 'pookalam', 'boat race', 'king', 'feast', 'harvest', 'white kasavu', 'unity'],
      related: ['Pongal', 'Vishu', 'Sadya'],
      clusters: ['festival', 'south'],
      culture: 'india-south',
      difficulty: 'hard',
      popularity: 60,
    },
    {
      text: 'Karwa Chauth',
      tags: ['fast', 'moon', 'sargi', 'sieve', 'mehendi', 'wife', 'drama', 'serial', 'wait', 'romance'],
      related: ['Teej', 'Diwali', 'Sargi'],
      clusters: ['festival', 'ritual'],
      difficulty: 'medium',
      discussion: 80,
    },
  ]
);

export const bollywood = buildWords(
  'bollywood',
  { culture: 'india', language: 'hinglish' },
  [
    {
      text: 'Sholay',
      tags: ['friendship', 'water tank', 'dialogue', 'villain', 'classic', 'horse', 'revenge', 'iconic', 'rerun', 'gabbar'],
      related: ['DDLJ', 'Deewar', 'Mughal-e-Azam'],
      clusters: ['classic-film', 'cult'],
      difficulty: 'medium',
      year: 'retro',
      discussion: 86,
    },
    {
      text: 'DDLJ',
      tags: ['train', 'europe', 'romance', 'maratha mandir', 'palat', 'mustard fields', 'father', 'classic', 'iconic', 'srk'],
      related: ['Sholay', 'Kuch Kuch Hota Hai', 'Veer-Zaara'],
      clusters: ['romance-film', 'cult'],
      difficulty: 'medium',
      year: 'retro',
    },
    {
      text: '3 Idiots',
      tags: ['engineering', 'pressure', 'all is well', 'friendship', 'rancho', 'exam', 'parents', 'suicide', 'viral', 'inspiration'],
      related: ['Munna Bhai', 'Taare Zameen Par', 'PK'],
      clusters: ['modern-film', 'youth'],
      difficulty: 'easy',
      year: 'modern',
      discussion: 88,
    },
    {
      text: 'KGF',
      tags: ['gold', 'mass', 'mother', 'rocky bhai', 'slow motion', 'dust', 'south', 'pan india', 'attitude', 'cigarette'],
      related: ['Pushpa', 'Bahubali', 'Salaar'],
      clusters: ['mass-film', 'action'],
      difficulty: 'easy',
      year: 'trending',
    },
    {
      text: 'Gangs of Wasseypur',
      tags: ['coal', 'revenge', 'generations', 'cult', 'dialogue', 'bihar', 'gritty', 'two parts', 'quotable', 'mafia'],
      related: ['Sacred Games', 'Mirzapur', 'Paan Singh Tomar'],
      clusters: ['cult-film', 'crime'],
      difficulty: 'hard',
      popularity: 65,
    },
  ]
);

export const cricket = buildWords(
  'cricket',
  { culture: 'india', language: 'hinglish' },
  [
    {
      text: 'IPL Auction',
      tags: ['paddle', 'crores', 'bidding war', 'uncapped', 'rtm', 'drama', 'overpaid', 'franchise', 'night', 'speculation'],
      related: ['Mega Auction', 'Draft', 'Retention'],
      clusters: ['cricket-event', 'ipl'],
      difficulty: 'medium',
      year: 'trending',
      discussion: 84,
    },
    {
      text: 'Last Ball Six',
      tags: ['heart attack', 'stadium', 'roar', 'equation', 'hero', 'pressure', 'replay', 'goosebumps', 'celebration', 'clutch'],
      related: ['Super Over', 'Run Chase', 'Yorker'],
      clusters: ['cricket-moment', 'drama'],
      difficulty: 'medium',
      discussion: 82,
    },
    {
      text: 'Gully Cricket',
      tags: ['one tip one hand', 'tennis ball', 'window', 'aunty ball', 'parking', 'summer', 'rules', 'bat fight', 'street', 'childhood'],
      related: ['Box Cricket', 'Book Cricket', 'Tennis Ball'],
      clusters: ['cricket-life', 'nostalgia'],
      difficulty: 'easy',
      popularity: 88,
      discussion: 90,
    },
    {
      text: 'DRS',
      tags: ['umpires call', 'review', 'snicko', 'hawkeye', 'suspense', 'finger', 'replay', 'tension', 'technology', 'debate'],
      related: ['LBW', 'Third Umpire', 'Hot Spot'],
      clusters: ['cricket-tech', 'rules'],
      difficulty: 'hard',
      popularity: 60,
    },
    {
      text: 'Maidan',
      tags: ['sunday', 'coaching', 'mud', 'whites', 'dreams', 'early morning', 'mumbai', 'practice', 'shared pitch', 'grassroots'],
      related: ['Nets', 'Academy', 'Ranji'],
      clusters: ['cricket-life', 'grassroots'],
      difficulty: 'hard',
      popularity: 50,
    },
  ]
);

export const indianCulture = buildWords(
  'daily-life',
  { culture: 'india', language: 'hinglish' },
  [
    {
      text: 'UPSC',
      tags: ['dream', 'pressure', 'library', 'attempt', 'optional', 'delhi', 'parents', 'newspaper', 'waiting', 'discipline'],
      related: ['IAS', 'Coaching', 'Mains'],
      clusters: ['exam', 'aspiration'],
      difficulty: 'medium',
      discussion: 92,
    },
    {
      text: 'Sharma Ji Ka Beta',
      tags: ['comparison', 'parents', 'topper', 'pressure', 'neighbor', 'taunt', 'mythical', 'standard', 'guilt', 'family function'],
      related: ['Board Exam', 'Marks', 'Relatives'],
      clusters: ['indian-life', 'humour'],
      difficulty: 'easy',
      popularity: 88,
      discussion: 90,
    },
    {
      text: 'Shaadi Season',
      tags: ['buffet', 'sangeet', 'relatives', 'when is yours', 'dance', 'gift', 'matching outfits', 'crowd', 'late dinner', 'drama'],
      related: ['Sangeet', 'Baraat', 'Reception'],
      clusters: ['indian-life', 'wedding'],
      difficulty: 'easy',
      discussion: 88,
    },
    {
      text: 'Load Shedding',
      tags: ['inverter', 'summer', 'candle', 'heat', 'mosquito', 'terrace', 'manual fan', 'darkness', 'nostalgia', 'village'],
      related: ['Power Cut', 'Generator', 'Inverter'],
      clusters: ['indian-life', 'nostalgia'],
      difficulty: 'medium',
    },
    {
      text: 'Antakshari',
      tags: ['road trip', 'bus', 'last letter', 'family', 'teams', 'songs', 'cheating', 'la la la', 'nostalgia', 'fun'],
      related: ['Dumb Charades', 'Housie', 'Passing the Parcel'],
      clusters: ['indian-life', 'game'],
      difficulty: 'easy',
    },
  ]
);

export const indiaWords = [
  ...festivals,
  ...bollywood,
  ...cricket,
  ...indianCulture,
];
