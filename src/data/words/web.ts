import { buildWords } from './_builder';

export const memes = buildWords(
  'memes',
  { culture: 'internet', year: 'trending', language: 'hinglish' },
  [
    {
      text: 'Rasode Mein Kaun Tha',
      short: 'Rasode Mein Kaun',
      tags: ['serial', 'remix', 'kitchen', 'viral', 'aunty', 'beat', 'accusation', 'rashi kokila', 'song', 'meme'],
      related: ['Pawri', 'Binod', 'Bhide'],
      clusters: ['meme', 'india'],
      difficulty: 'medium',
      discussion: 84,
    },
    {
      text: 'Pawri Ho Rahi Hai',
      short: 'Pawri',
      tags: ['party', 'accent', 'remix', 'viral', 'pakistan', 'simple clip', 'trend', 'wholesome', 'sound', 'copy'],
      related: ['Rasode', 'Binod', 'Moye Moye'],
      clusters: ['meme', 'viral'],
      difficulty: 'medium',
    },
    {
      text: 'Side Eye Chrome Dino',
      short: 'Chill Guy',
      tags: ['nonchalant', 'whatever', 'unbothered', 'dog', 'trend', 'sticker', 'relatable', 'mood', 'cool', 'overused'],
      related: ['Doge', 'Pepe', 'Wojak'],
      clusters: ['meme', 'reaction'],
      difficulty: 'hard',
      popularity: 50,
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
