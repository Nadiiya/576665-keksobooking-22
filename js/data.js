import {getRandomInteger, getRandomDecimal} from './util.js';

const SIMILAR_ADVERTS_COUNT = 10;

const MAX_PHOTOS_COUNT = 10;

const MAX_ROOMS_COUNT = 30;

const MAX_GUESTS_COUNT = 30;

const MAX_PRICE = 1000000;

const TIME_OPTIONS = [
  '12:00',
  '13:00',
  '14:00',
];

const TITLE_OPTIONS = [
  'Mountain Residence Apartments',
  'Sea Your Only View',
  'The Best Beach Apartments',
];

const DESCRIPTION_OPTIONS = [
  'An array of activities can be enjoyed on site or in the surroundings, including fishing, diving and windsurfing.',
  'Cycle hire, horse riding and golf can be arranged.',
  'A tennis court is also available.',
]

const APARTMENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const APARTMENT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const APARTMENT_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

const getRandomElementsFrom = (array, length) => {
  const result = [];
  for (let i = 0; i <= length - 1; i++) {
    result.push(array[getRandomInteger(0, array.length - 1)]);
  }
  return result;
}

const getUniqueElementsFrom = (array, length) => {
  if (array.length >= length) {
    return array.sort(() => Math.random() - 0.5).slice(0, length);
  }
  return [];
}

const createAdvert = () => {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`,
    },
    offer: {
      title: getRandomElementsFrom(TITLE_OPTIONS, 1).toString(),
      address: [getRandomDecimal(35.65000, 35.70000), getRandomDecimal(139.70000, 139.80000)],
      price: getRandomInteger(1, MAX_PRICE),
      type: getRandomElementsFrom(APARTMENT_TYPES, 1).toString(),
      rooms: getRandomInteger(1, MAX_ROOMS_COUNT),
      guests: getRandomInteger(1, MAX_GUESTS_COUNT),
      checkin: getRandomElementsFrom(TIME_OPTIONS, 1).toString(),
      checkout: getRandomElementsFrom(TIME_OPTIONS, 1).toString(),
      features: getUniqueElementsFrom(APARTMENT_FEATURES, getRandomInteger(1, APARTMENT_FEATURES.length)),
      description: getRandomElementsFrom(DESCRIPTION_OPTIONS, 1).toString(),
      photos: getRandomElementsFrom(APARTMENT_PHOTOS, getRandomInteger(1, MAX_PHOTOS_COUNT)),
    },
    location: {
      x: getRandomDecimal(35.65000, 35.70000),
      y: getRandomDecimal(139.70000, 139.80000),
    },
  }
}

const createSimilarAdverts = (count) => {
  return new Array(count).fill(null).map(() => createAdvert());
};

createSimilarAdverts(SIMILAR_ADVERTS_COUNT);
