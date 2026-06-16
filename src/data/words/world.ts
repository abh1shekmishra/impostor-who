import { buildWords } from './_builder';

export const cities = buildWords(
  'cities',
  { culture: 'global' },
  [
    {
      text: 'Mumbai Local',
      tags: ['rush', 'footboard', 'time table', 'rain flood', 'crowd', 'dabbawala', 'pushing', 'lifeline', 'ladies coach', 'spirit'],
      related: ['Metro', 'Auto', 'BEST Bus'],
      clusters: ['city-life', 'mumbai'],
      culture: 'india',
      difficulty: 'medium',
      discussion: 86,
    },
    {
      text: 'Bangalore Traffic',
      tags: ['signal', 'silk board', 'rain', 'two hours', 'startup', 'horn', 'patience', 'weather', 'pubs', 'tech'],
      related: ['Silk Board', 'Metro', 'Outer Ring Road'],
      clusters: ['city-life', 'bangalore'],
      culture: 'india',
      difficulty: 'medium',
    },
    {
      text: 'Paris',
      tags: ['eiffel', 'romance', 'overrated debate', 'croissant', 'lights', 'art', 'fashion', 'expensive', 'pickpocket', 'photos'],
      related: ['London', 'Rome', 'Venice'],
      clusters: ['travel', 'europe'],
      culture: 'west',
      difficulty: 'easy',
    },
  ]
);

export const countries = buildWords(
  'countries',
  { culture: 'global' },
  [
    {
      text: 'Japan',
      tags: ['bullet train', 'discipline', 'anime', 'bow', 'tech', 'sushi', 'cherry blossom', 'clean', 'polite', 'vending machine'],
      related: ['Korea', 'China', 'Thailand'],
      clusters: ['country', 'asia'],
      difficulty: 'easy',
    },
    {
      text: 'Switzerland',
      tags: ['dream honeymoon', 'mountains', 'chocolate', 'expensive', 'ddlj', 'clean', 'trains', 'cheese', 'scenic', 'aspiration'],
      related: ['Austria', 'Norway', 'New Zealand'],
      clusters: ['travel', 'europe'],
      difficulty: 'easy',
    },
  ]
);

export const travel = buildWords(
  'travel',
  { culture: 'india', language: 'hinglish', year: 'modern' },
  [
    {
      text: 'Goa Trip',
      tags: ['plan that never happens', 'beach', 'budget split', 'bike', 'group', 'cancelled', 'reschedule', 'finally', 'sunset', 'memories'],
      related: ['Manali', 'Road Trip', 'Beach'],
      clusters: ['travel', 'india'],
      difficulty: 'easy',
      discussion: 88,
    },
    {
      text: 'Window Seat',
      tags: ['fight', 'view', 'breeze', 'photos', 'sleep', 'first dibs', 'aisle vs window', 'flight', 'train', 'priority'],
      related: ['Aisle Seat', 'Boarding', 'Sunrise'],
      clusters: ['travel', 'journey'],
      difficulty: 'easy',
    },
  ]
);

export const science = buildWords(
  'science',
  { culture: 'global' },
  [
    {
      text: 'Black Hole',
      tags: ['gravity', 'no escape', 'interstellar', 'mysterious', 'time', 'spaghettify', 'event horizon', 'space', 'theory', 'infinite'],
      related: ['Wormhole', 'Supernova', 'Singularity'],
      clusters: ['space', 'physics'],
      difficulty: 'medium',
    },
    {
      text: 'Mitochondria',
      tags: ['powerhouse', 'biology', 'meme', 'cell', 'exam', 'only thing remembered', 'energy', 'class 10', 'organelle', 'iconic'],
      related: ['Cell', 'DNA', 'Ribosome'],
      clusters: ['biology', 'school'],
      difficulty: 'medium',
      discussion: 84,
    },
  ]
);

export const space = buildWords(
  'space',
  { culture: 'global', year: 'trending' },
  [
    {
      text: 'Chandrayaan',
      tags: ['isro', 'moon', 'south pole', 'pride', 'soft landing', 'budget', 'live stream', 'india', 'cheer', 'history'],
      related: ['Mangalyaan', 'ISRO', 'Aditya'],
      clusters: ['space', 'india'],
      culture: 'india',
      difficulty: 'medium',
    },
    {
      text: 'Mars Rover',
      tags: ['red planet', 'selfie', 'lonely', 'dust', 'nasa', 'exploration', 'wheels', 'photos', 'curiosity', 'distant'],
      related: ['ISS', 'Curiosity', 'Perseverance'],
      clusters: ['space', 'exploration'],
      difficulty: 'medium',
    },
  ]
);

export const history = buildWords(
  'history',
  { culture: 'global', year: 'timeless' },
  [
    {
      text: 'Taj Mahal',
      tags: ['love', 'marble', 'agra', 'symmetry', 'tourist', 'monument', 'photo pose', 'wonder', 'mughal', 'white'],
      related: ['Qutub Minar', 'Red Fort', 'Hawa Mahal'],
      clusters: ['monument', 'india'],
      culture: 'india',
      difficulty: 'easy',
    },
    {
      text: 'Dinosaurs',
      tags: ['extinct', 'meteor', 'jurassic', 'museum', 'roar', 'fossils', 'kids obsession', 'giant', 'ancient', 'documentary'],
      related: ['Fossil', 'Mammoth', 'T-Rex'],
      clusters: ['history', 'prehistoric'],
      difficulty: 'easy',
    },
  ]
);

export const animals = buildWords(
  'animals',
  { culture: 'global' },
  [
    {
      text: 'Cat',
      tags: ['ignore', 'meme', 'box', 'aloof', 'internet', 'knock things', 'independent', 'purr', 'judgy', 'nine lives'],
      related: ['Dog', 'Kitten', 'Tiger'],
      clusters: ['animal', 'pet'],
      difficulty: 'easy',
    },
    {
      text: 'Pigeon',
      tags: ['balcony', 'nest', 'annoying', 'city', 'no fear', 'coo', 'eggs', 'judging', 'everywhere', 'chess meme'],
      related: ['Crow', 'Sparrow', 'Parrot'],
      clusters: ['animal', 'urban'],
      difficulty: 'medium',
      discussion: 80,
    },
  ]
);

export const worldWords = [
  ...cities,
  ...countries,
  ...travel,
  ...science,
  ...space,
  ...history,
  ...animals,
];
