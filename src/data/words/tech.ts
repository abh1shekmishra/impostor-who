import { buildWords } from './_builder';

export const technology = buildWords(
  'technology',
  { culture: 'global', year: 'modern' },
  [
    {
      text: 'AirPods',
      tags: ['lost one', 'nod', 'status', 'tiny', 'ignore people', 'case click', 'gym', 'pristine white', 'battery anxiety', 'gesture'],
      related: ['Earphones', 'Boat', 'Neckband'],
      clusters: ['gadget', 'audio'],
      difficulty: 'easy',
      popularity: 88,
      discussion: 82,
    },
    {
      text: 'QR Code',
      tags: ['scan', 'menu', 'payment', 'square', 'covid', 'shopkeeper', 'no cash', 'phone up', 'pixels', 'everywhere'],
      related: ['UPI', 'Barcode', 'NFC'],
      clusters: ['tech-life', 'payment'],
      difficulty: 'medium',
    },
    {
      text: 'Buffering',
      tags: ['spinning wheel', 'rage', 'cliffhanger', 'network', 'three dots', 'pause', 'rural', 'low quality', 'wait', 'frustration'],
      related: ['Loading', 'Lag', 'Wifi'],
      clusters: ['tech-life', 'internet'],
      difficulty: 'medium',
      discussion: 80,
    },
    {
      text: 'CAPTCHA',
      tags: ['traffic lights', 'are you human', 'blurry', 'crosswalk', 'fire hydrant', 'annoying', 'fail', 'robot', 'click', 'verify'],
      related: ['OTP', 'Login', 'Bot'],
      clusters: ['tech-life', 'security'],
      difficulty: 'medium',
    },
  ]
);

export const programming = buildWords(
  'programming',
  { culture: 'internet', year: 'modern' },
  [
    {
      text: 'Stack Overflow',
      tags: ['copy paste', 'closed as duplicate', 'savior', 'reputation', 'accepted answer', 'rude', 'desperate', 'green tick', 'snippet', 'salvation'],
      related: ['Google', 'GitHub', 'Documentation'],
      clusters: ['dev-life', 'tools'],
      difficulty: 'medium',
      discussion: 84,
    },
    {
      text: 'Merge Conflict',
      tags: ['panic', 'git', 'arrows', 'who touched this', 'friday evening', 'resolve', 'blame', 'rebase fear', 'red green', 'dread'],
      related: ['Pull Request', 'Rebase', 'Branch'],
      clusters: ['dev-life', 'git'],
      difficulty: 'hard',
      popularity: 55,
    },
    {
      text: 'It Works On My Machine',
      short: 'Works On My Machine',
      tags: ['excuse', 'docker', 'blame', 'environment', 'classic', 'shrug', 'deploy', 'bug', 'denial', 'meme'],
      related: ['Production', 'Bug', 'Docker'],
      clusters: ['dev-life', 'humour'],
      difficulty: 'medium',
      discussion: 86,
    },
    {
      text: 'Semicolon',
      tags: ['missing', 'tiny', 'error', 'hours wasted', 'javascript debate', 'syntax', 'punctuation', 'rage', 'overlooked', 'crucial'],
      related: ['Bracket', 'Indentation', 'Typo'],
      clusters: ['dev-life', 'syntax'],
      difficulty: 'hard',
    },
  ]
);

export const engineering = buildWords(
  'engineering',
  { culture: 'india', language: 'hinglish', year: 'modern' },
  [
    {
      text: 'KT (Backlog)',
      short: 'Backlog',
      tags: ['supplementary', 'fear', 'parents', 'reattempt', 'gpa drop', 'tension', 'clear it', 'red mark', 'sleepless', 'engineering'],
      related: ['Detention', 'Supply', 'Arrear'],
      clusters: ['college-life', 'engineering'],
      difficulty: 'hard',
      popularity: 50,
    },
    {
      text: 'Last Bench',
      tags: ['sleep', 'memes', 'phone', 'attendance proxy', 'gang', 'invisible', 'snacks', 'freedom', 'whispers', 'legend'],
      related: ['Proxy', 'Bunk', 'First Bench'],
      clusters: ['college-life', 'classroom'],
      difficulty: 'easy',
      discussion: 84,
    },
    {
      text: 'Viva',
      tags: ['external', 'sweat', 'blank mind', 'pass somehow', 'file', 'stammer', 'examiner', 'practical', 'nervous', 'memorize'],
      related: ['Practical', 'Lab', 'Submission'],
      clusters: ['college-life', 'exam'],
      difficulty: 'medium',
    },
    {
      text: 'Night Before Exam',
      tags: ['cramming', 'coffee', 'whole syllabus', 'panic', 'pdf', 'group call', 'important questions', 'no sleep', 'prayer', 'jugaad'],
      related: ['Maggi', 'Last Minute', 'Photocopy'],
      clusters: ['college-life', 'exam'],
      difficulty: 'easy',
      discussion: 88,
    },
  ]
);

export const office = buildWords(
  'office',
  { culture: 'global', year: 'modern' },
  [
    {
      text: 'This Could Have Been An Email',
      short: 'Pointless Meeting',
      tags: ['waste', 'agenda', 'mute', 'camera off', 'doodle', 'calendar', 'recurring', 'sigh', 'corporate', 'overrun'],
      related: ['Standup', 'Sync', 'Calendar'],
      clusters: ['office-life', 'meetings'],
      difficulty: 'medium',
      discussion: 88,
    },
    {
      text: 'Reply All',
      tags: ['regret', 'whole company', 'mistake', 'thread', 'apology', 'panic', 'embarrassment', 'recall', 'chaos', 'oops'],
      related: ['Email', 'CC', 'BCC'],
      clusters: ['office-life', 'email'],
      difficulty: 'medium',
    },
    {
      text: 'Appraisal',
      tags: ['hike', 'expectation', 'bell curve', 'disappointment', 'self review', 'rating', 'percentage', 'meeting', 'hope', 'inflation'],
      related: ['Bonus', 'Promotion', 'Hike'],
      clusters: ['office-life', 'career'],
      difficulty: 'medium',
      discussion: 84,
    },
    {
      text: 'Work From Home',
      tags: ['pajama', 'mute unmute', 'background', 'fridge', 'no commute', 'blurred', 'flexible', 'isolation', 'wifi', 'pajama top'],
      related: ['Zoom', 'Hybrid', 'Office'],
      clusters: ['office-life', 'remote'],
      difficulty: 'easy',
    },
    {
      text: 'Deadline',
      tags: ['clock', 'urgent', 'last minute', 'follow up', 'deliverable', 'late evening', 'tracker', 'red flag', 'submission', 'stress'],
      related: ['Due Date', 'Task', 'Escalation'],
      clusters: ['office-life', 'delivery'],
      difficulty: 'easy',
      popularity: 88,
      discussion: 82,
      chaos: 48,
      guess: 48,
    },
    {
      text: 'Promotion',
      tags: ['boss', 'new title', 'salary band', 'manager call', 'celebration', 'team lead', 'career ladder', 'performance cycle', 'expectation', 'announcement'],
      related: ['Appraisal', 'Hike', 'Role Change'],
      clusters: ['office-life', 'career'],
      difficulty: 'easy',
      popularity: 84,
      discussion: 80,
      chaos: 42,
      guess: 46,
    },
  ]
);

export const startup = buildWords(
  'startup',
  { culture: 'global', year: 'trending' },
  [
    {
      text: 'Pivot',
      tags: ['desperation', 'new direction', 'buzzword', 'investor', 'plan b', 'runway', 'reinvent', 'spin', 'survival', 'storytelling'],
      related: ['MVP', 'Burn Rate', 'Series A'],
      clusters: ['startup-life', 'jargon'],
      difficulty: 'hard',
      popularity: 55,
    },
    {
      text: 'Runway',
      tags: ['months left', 'cash', 'panic', 'layoffs', 'investor call', 'burn', 'extend', 'survival', 'spreadsheet', 'countdown'],
      related: ['Funding', 'Burn Rate', 'Bridge Round'],
      clusters: ['startup-life', 'finance'],
      difficulty: 'evil',
      popularity: 40,
      guess: 85,
    },
    {
      text: 'Disrupt',
      tags: ['buzzword', 'pitch deck', 'uber for', 'revolution', 'overused', 'innovation', 'cringe', 'investor', 'bold', 'cliche'],
      related: ['Synergy', 'Scale', 'Unicorn'],
      clusters: ['startup-life', 'jargon'],
      difficulty: 'hard',
    },
  ]
);

export const brands = buildWords(
  'brands',
  { culture: 'global' },
  [
    {
      text: 'IKEA',
      tags: ['assembly', 'allen key', 'meatballs', 'maze', 'flat pack', 'swedish names', 'couple fight', 'showroom', 'cheap', 'lost'],
      related: ['Pepperfry', 'Home Centre', 'Urban Ladder'],
      clusters: ['brand', 'retail'],
      difficulty: 'medium',
      discussion: 82,
    },
    {
      text: 'Nike',
      tags: ['swoosh', 'just do it', 'sneakers', 'hype', 'resale', 'sports', 'limited drop', 'tick', 'motivation', 'status'],
      related: ['Adidas', 'Puma', 'Jordan'],
      clusters: ['brand', 'fashion'],
      difficulty: 'easy',
    },
    {
      text: 'Amul',
      tags: ['butter', 'topical', 'mascot girl', 'billboard', 'utterly butterly', 'cooperative', 'india', 'ad', 'nostalgia', 'wit'],
      related: ['Mother Dairy', 'Britannia', 'Nestle'],
      clusters: ['brand', 'india'],
      culture: 'india',
      difficulty: 'medium',
    },
    {
      text: 'Oral-B',
      tags: ['morning ritual', 'buzz', 'two minutes', 'round head', 'dentist', 'gum bleed', 'replace head', 'minty', 'manual vs electric', 'guilt'],
      related: ['Colgate', 'Sensodyne', 'Listerine'],
      clusters: ['brand', 'dental'],
      difficulty: 'medium',
      popularity: 78,
      discussion: 70,
      chaos: 38,
      guess: 52,
    },
  ]
);

export const techWords = [
  ...technology,
  ...programming,
  ...engineering,
  ...office,
  ...startup,
  ...brands,
];
