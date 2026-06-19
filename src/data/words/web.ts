import { buildWords } from './_builder';

export const memes = buildWords(
  'memes',
  { culture: 'internet', year: 'trending', language: 'hinglish' },
  [
    {
      text: 'Rasode',
      tags: ['serial', 'remix', 'kitchen', 'viral', 'aunty', 'beat', 'accusation', 'rashi kokila', 'song', 'autotune'],
      related: ['Pawri', 'Binod', 'Bhide'],
      clusters: ['meme', 'india'],
      difficulty: 'medium', popularity: 76, discussion: 84, chaos: 58, guess: 58,
    },
    {
      text: 'Pawri',
      tags: ['party', 'accent', 'remix', 'viral', 'pakistan', 'simple clip', 'trend', 'wholesome', 'sound', 'copy'],
      related: ['Rasode', 'Binod', 'Moye Moye'],
      clusters: ['meme', 'viral'],
      difficulty: 'medium', popularity: 74, discussion: 80, chaos: 58, guess: 58,
    },
    {
      text: 'Chill Guy',
      tags: ['nonchalant', 'whatever', 'unbothered', 'dog', 'trend', 'sticker', 'relatable', 'mood', 'cool', 'overused'],
      related: ['Doge', 'Pepe', 'Wojak'],
      clusters: ['meme', 'reaction'],
      difficulty: 'hard', popularity: 50, discussion: 78, chaos: 60, guess: 66,
    },
    // ── Expansion batch 1 ──
    {
      text: 'Binod',
      tags: ['comment', 'random', 'youtube', '2020', 'viral', 'name', 'spam', 'wholesome', 'support', 'sudden'],
      related: ['Pawri', 'Moye Moye', 'Slytherin'],
      clusters: ['meme', 'india'],
      culture: 'india', year: 'modern', difficulty: 'medium', popularity: 64, discussion: 80, chaos: 64, guess: 60,
    },
    {
      text: 'Moye Moye',
      tags: ['serbian', 'doom', 'sudden', 'reels', 'funny', 'viral', 'impending', 'dance', 'trend', 'sad'],
      related: ['Pawri', 'Binod', 'Kacha Badam'],
      clusters: ['meme', 'india'],
      culture: 'india', difficulty: 'medium', popularity: 70, discussion: 78, chaos: 64, guess: 60,
    },
    {
      text: 'Mauka Mauka',
      tags: ['cricket', 'india pakistan', 'firecracker', 'ad', 'world cup', 'rivalry', 'star sports', 'tease', 'fan', 'before match'],
      related: ['World Cup', 'India Pakistan', 'Star Sports'],
      clusters: ['meme', 'cricket'],
      culture: 'india', year: 'modern', difficulty: 'medium', popularity: 72, discussion: 82, chaos: 56, guess: 58,
    },
    {
      text: 'Kacha Badam',
      tags: ['bengal', 'vendor', 'autotune', 'viral', 'reels', 'seller', 'catchy', 'dance', 'street', 'remix'],
      related: ['Moye Moye', 'Pawri', 'Tunak Tunak'],
      clusters: ['meme', 'india'],
      culture: 'india', year: 'modern', difficulty: 'medium', popularity: 66, discussion: 76, chaos: 60, guess: 62,
    },
    {
      text: 'Thug Life',
      tags: ['sunglasses', 'savage', 'swag', 'rebel', 'gangsta', 'snoop', 'attitude', 'glasses drop', 'comeback', 'cool'],
      related: ['Deal With It', 'Sigma', 'Gigachad'],
      clusters: ['meme', 'reaction'],
      year: 'modern', difficulty: 'easy', popularity: 78, discussion: 74, chaos: 58, guess: 54,
    },
    {
      text: 'Distracted Boyfriend',
      tags: ['stock photo', 'girlfriend', 'jealous', 'wandering eye', 'labels', 'choice', 'temptation', 'pointing', 'classic', 'relatable'],
      related: ['Drake Meme', 'Two Buttons', 'Woman Yelling'],
      clusters: ['meme', 'format'],
      year: 'modern', difficulty: 'medium', popularity: 76, discussion: 80, chaos: 56, guess: 60,
    },
    {
      text: 'Drake Meme',
      tags: ['no yes', 'reject', 'approve', 'panel', 'two choice', 'hand', 'prefer', 'comparison', 'format', 'rapper'],
      related: ['Distracted Boyfriend', 'Two Buttons', 'Galaxy Brain'],
      clusters: ['meme', 'format'],
      year: 'modern', difficulty: 'easy', popularity: 80, discussion: 76, chaos: 54, guess: 54,
    },
    {
      text: 'Surprised Pikachu',
      tags: ['shocked', 'obvious', 'consequence', 'open mouth', 'pokemon', 'reaction', 'predictable', 'face', 'yellow', 'realization'],
      related: ['Drake Meme', 'Crying Jordan', 'Thug Life'],
      clusters: ['meme', 'reaction'],
      year: 'modern', difficulty: 'easy', popularity: 82, discussion: 76, chaos: 56, guess: 52,
    },
    {
      text: 'Galaxy Brain',
      tags: ['expanding', 'genius', 'enlightened', 'sarcasm', 'levels', 'glowing', 'iq', 'tiers', 'overthink', 'ascend'],
      related: ['Drake Meme', 'Stonks', 'Big Brain'],
      clusters: ['meme', 'format'],
      year: 'modern', difficulty: 'medium', popularity: 68, discussion: 78, chaos: 60, guess: 62,
    },
    {
      text: 'Coffin Dance',
      tags: ['ghana', 'pallbearers', 'fail', 'music', 'astronomia', 'funeral', 'beat drop', 'viral', 'dancing', 'epic'],
      related: ['Rickroll', 'Crab Rave', 'Moye Moye'],
      clusters: ['meme', 'format'],
      year: 'modern', difficulty: 'easy', popularity: 78, discussion: 74, chaos: 60, guess: 56,
    },
    {
      text: 'Rickroll',
      tags: ['bait', 'link', 'astley', 'never gonna', 'prank', '80s', 'redirect', 'classic', 'troll', 'song'],
      related: ['Bait', 'Clickbait', 'Coffin Dance'],
      clusters: ['meme', 'prank'],
      year: 'modern', difficulty: 'easy', popularity: 76, discussion: 74, chaos: 58, guess: 56,
    },
    {
      text: 'Stonks',
      tags: ['investing', 'profit', 'arrow up', 'market', 'crash', 'suit', 'meme man', 'finance', 'misspelled', 'greed'],
      related: ['Galaxy Brain', 'Doge', 'HODL'],
      clusters: ['meme', 'format'],
      year: 'modern', difficulty: 'medium', popularity: 70, discussion: 76, chaos: 58, guess: 60,
    },
    {
      text: 'Sus',
      tags: ['among us', 'impostor', 'vent', 'emergency', 'crewmate', 'accusation', 'red', 'task', 'eject', 'doubt'],
      related: ['Amogus', 'NPC', 'Imposter'],
      clusters: ['meme', 'gaming'],
      difficulty: 'easy', popularity: 80, discussion: 78, chaos: 60, guess: 54,
    },
    {
      text: 'NPC',
      tags: ['video game', 'background', 'scripted', 'blank', 'tiktok', 'robotic', 'livestream', 'no choice', 'crowd', 'automated'],
      related: ['Sus', 'Sigma', 'Brainrot'],
      clusters: ['meme', 'gaming'],
      difficulty: 'medium', popularity: 68, discussion: 78, chaos: 62, guess: 62,
    },
    {
      text: 'Gigachad',
      tags: ['jawline', 'alpha', 'gym', 'grayscale', 'masculine', 'sigma', 'perfect', 'statue', 'flex', 'ideal'],
      related: ['Sigma', 'Thug Life', 'Mewing'],
      clusters: ['meme', 'reaction'],
      difficulty: 'medium', popularity: 66, discussion: 76, chaos: 60, guess: 62,
    },
    {
      text: 'Karen',
      tags: ['manager', 'complaint', 'entitled', 'haircut', 'refund', 'suburban', 'rant', 'privilege', 'viral video', 'demand'],
      related: ['NPC', 'Boomer', 'Main Character'],
      clusters: ['meme', 'archetype'],
      difficulty: 'easy', popularity: 78, discussion: 80, chaos: 56, guess: 56,
    },
    {
      text: 'Rizz',
      tags: ['charm', 'flirt', 'game', 'smooth', 'gen z', 'pickup', 'confidence', 'aura', 'unspoken', 'w'],
      related: ['Sigma', 'Aura', 'Glow Up'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'easy', popularity: 72, discussion: 78, chaos: 58, guess: 58,
    },
    {
      text: 'Sigma',
      tags: ['lone wolf', 'grindset', 'alpha', 'male', 'hustle', 'mindset', 'patrick bateman', 'independent', 'cold', 'rules'],
      related: ['Gigachad', 'Rizz', 'NPC'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'medium', popularity: 68, discussion: 78, chaos: 60, guess: 62,
    },
    {
      text: 'Skibidi',
      tags: ['toilet', 'brainrot', 'kids', 'youtube', 'nonsense', 'gen alpha', 'catchy', 'viral', 'cameraman', 'weird'],
      related: ['Ohio', 'NPC', 'Brainrot'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'medium', popularity: 66, discussion: 76, chaos: 66, guess: 64,
    },
    {
      text: 'Ohio',
      tags: ['cursed', 'weird', 'only in', 'state', 'chaotic', 'gen alpha', 'sus', 'random', 'final boss', 'brainrot'],
      related: ['Skibidi', 'Sus', 'Backrooms'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'hard', popularity: 56, discussion: 76, chaos: 70, guess: 70,
    },
    {
      text: 'No Cap',
      tags: ['truth', 'no lie', 'fr', 'honest', 'swear', 'gen z', 'real', 'believe', 'frfr', 'serious'],
      related: ['Rizz', 'Based', 'Bet'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'medium', popularity: 68, discussion: 72, chaos: 56, guess: 62,
    },
    {
      text: 'Touch Grass',
      tags: ['outside', 'chronically online', 'gamer', 'reality', 'sunlight', 'log off', 'insult', 'nature', 'basement', 'break'],
      related: ['NPC', 'Skill Issue', 'Doomer'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'medium', popularity: 66, discussion: 80, chaos: 60, guess: 62,
    },
    {
      text: 'Skill Issue',
      tags: ['git gud', 'blame', 'gaming', 'cope', 'your fault', 'dismiss', 'rage', 'loss', 'gatekeep', 'insult'],
      related: ['Touch Grass', 'Sus', 'Cope'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'hard', popularity: 58, discussion: 76, chaos: 60, guess: 66,
    },
    {
      text: 'Glow Up',
      tags: ['transformation', 'before after', 'puberty', 'confidence', 'makeover', 'revenge', 'progress', 'reveal', 'aesthetic', 'blossom'],
      related: ['Rizz', 'Main Character', 'Aura'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'easy', popularity: 72, discussion: 78, chaos: 54, guess: 56,
    },
    {
      text: 'Main Character',
      tags: ['protagonist', 'romanticize', 'spotlight', 'aesthetic', 'playlist', 'delusion', 'center', 'energy', 'syndrome', 'life'],
      related: ['Glow Up', 'Karen', 'NPC'],
      clusters: ['slang', 'gen-z'],
      difficulty: 'medium', popularity: 68, discussion: 80, chaos: 58, guess: 62,
    },
  ]
);

export const internet = buildWords(
  'internet',
  { culture: 'internet', year: 'modern' },
  [
    {
      text: 'Wifi Password',
      tags: ['guest', 'caps lock', 'sticker on router', 'ask host', 'secret', 'special characters', 'forgotten', 'shame', 'sharing', 'connect'],
      related: ['Router', 'Hotspot', 'Data Pack'],
      clusters: ['internet', 'home'],
      difficulty: 'easy',
      discussion: 82,
    },
    {
      text: 'Unsubscribe',
      tags: ['fine print', 'tiny link', 'still emails', 'regret', 'spam', 'guilt trip', 'are you sure', 'newsletter', 'escape', 'persistent'],
      related: ['Spam', 'Newsletter', 'Promotions'],
      clusters: ['internet', 'email'],
      difficulty: 'medium',
    },
    {
      text: 'Incognito Mode',
      tags: ['private', 'gift shopping', 'sus', 'no history', 'spy glasses', 'secret', 'research', 'deniability', 'tab', 'hidden'],
      related: ['Browser History', 'VPN', 'Cookies'],
      clusters: ['internet', 'privacy'],
      difficulty: 'medium',
      discussion: 84,
    },
  ]
);

export const socialMedia = buildWords(
  'social-media',
  { culture: 'internet', year: 'trending' },
  [
    {
      text: 'Close Friends',
      tags: ['green ring', 'select few', 'unfiltered', 'rant', 'instagram', 'exclusive', 'who made it', 'private', 'real', 'gossip'],
      related: ['Story', 'Broadcast', 'Finsta'],
      clusters: ['social', 'instagram'],
      difficulty: 'medium',
    },
    {
      text: 'Story Viewers List',
      short: 'Story Views',
      tags: ['stalk', 'order', 'who watched', 'crush', 'first viewer', 'mystery', 'algorithm', 'check', 'obsession', 'silent'],
      related: ['Close Friends', 'DM', 'Seen'],
      clusters: ['social', 'instagram'],
      difficulty: 'hard',
      popularity: 60,
    },
    {
      text: 'Doomscrolling',
      tags: ['reels', 'time gone', '3am', 'thumb', 'one more', 'regret', 'algorithm', 'dopamine', 'endless', 'guilt'],
      related: ['Reels', 'Shorts', 'For You Page'],
      clusters: ['social', 'gen-z'],
      difficulty: 'medium',
      discussion: 86,
    },
  ]
);

export const games = buildWords(
  'games',
  { culture: 'internet', year: 'modern' },
  [
    {
      text: 'BGMI',
      tags: ['drop hot', 'gulag', 'squad', 'voice chat', 'noob', 'ban', 'chicken dinner', 'rush', 'camp', 'addiction'],
      related: ['Free Fire', 'Valorant', 'COD Mobile'],
      clusters: ['game', 'battle-royale'],
      difficulty: 'easy',
      discussion: 84,
    },
    {
      text: 'Ludo',
      tags: ['lockdown', 'family fight', 'six needed', 'cut', 'luck', 'cheating dice', 'four colors', 'comeback', 'rage', 'online'],
      related: ['Snakes and Ladders', 'Carrom', 'Chess'],
      clusters: ['game', 'board'],
      difficulty: 'easy',
      discussion: 86,
    },
    {
      text: 'Minecraft',
      tags: ['blocks', 'creeper', 'survival', 'creative', 'pixels', 'build', 'diamond', 'night mobs', 'sandbox', 'endless'],
      related: ['Roblox', 'Terraria', 'Lego'],
      clusters: ['game', 'sandbox'],
      difficulty: 'easy',
    },
    {
      text: 'GTA San Andreas',
      tags: ['cheat codes', 'cj', 'nostalgia', 'pc', 'here we go again', 'cousin bowling', 'map', 'freedom', 'classic', 'mods'],
      related: ['GTA V', 'Vice City', 'Saints Row'],
      clusters: ['game', 'open-world'],
      difficulty: 'medium',
      year: 'retro',
    },
    {
      text: 'Roleplay',
      tags: ['gta server', 'dnd', 'dungeon master', 'dice', 'backstory', 'voice acting', 'immersion', 'in character', 'cringe', 'fantasy'],
      related: ['GTA San Andreas', 'Minecraft', 'Cosplay'],
      clusters: ['game', 'community'],
      year: 'trending',
      difficulty: 'medium',
      popularity: 60,
      discussion: 78,
      chaos: 60,
      guess: 62,
    },
  ]
);

export const creators = buildWords(
  'creators',
  { culture: 'internet', year: 'trending', language: 'hinglish' },
  [
    {
      text: 'Unboxing Video',
      tags: ['scissors', 'plastic', 'satisfying', 'sponsor', 'first impressions', 'review', 'hype', 'asmr', 'package', 'reveal'],
      related: ['Review', 'Haul', 'GRWM'],
      clusters: ['youtube', 'content'],
      difficulty: 'medium',
    },
    {
      text: 'Like Share Subscribe',
      tags: ['outro', 'bell icon', 'beg', 'algorithm', 'catchphrase', 'channel', 'reminder', 'engagement', 'loyal', 'ritual'],
      related: ['Subscriber', 'Notification', 'Comment'],
      clusters: ['youtube', 'content'],
      difficulty: 'easy',
      discussion: 80,
    },
  ]
);

export const music = buildWords(
  'music',
  { culture: 'global', year: 'modern' },
  [
    {
      text: 'Aux Cord',
      tags: ['responsibility', 'judgement', 'road trip', 'taste', 'skip', 'one song', 'control', 'pressure', 'playlist', 'dj'],
      related: ['Playlist', 'Bluetooth', 'Speaker'],
      clusters: ['music', 'social'],
      difficulty: 'medium',
      discussion: 84,
    },
    {
      text: 'Spotify Wrapped',
      tags: ['december', 'exposed', 'top artist', 'minutes', 'share', 'embarrassing', 'aesthetic', 'annual', 'data', 'flex'],
      related: ['Playlist', 'On Repeat', 'Wrapped'],
      clusters: ['music', 'social'],
      difficulty: 'medium',
      year: 'trending',
    },
  ]
);

export const webWords = [
  ...memes,
  ...internet,
  ...socialMedia,
  ...games,
  ...creators,
  ...music,
];
