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

const checkCorrectRange = (min, max) => {
  return !(min < 0 || max < 0 || min > max);
}

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (checkCorrectRange(min, max) && min !== max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return -1;
}

const getRandomDecimal = (min, max, decimalPlaces = 5) => {
  if (checkCorrectRange(min, max)) {
    return  (Math.random() * (max - min) + min).toFixed(decimalPlaces);
  }
  return -1;
}

const getRandomElementsArray = (source, length) => {
  const result = [];
  for (let i = 0; i <= length - 1; i++) {
    result.push(source[getRandomInteger(0, source.length - 1)]);
  }
  return result;
}

const getUniqueElementsArray = (source, length) => {
  if (source.length >= length) {
    return source.sort(() => Math.random() - 0.5).slice(0, length);
  }
  return -1;
}

const createAdvert = () => {
  return {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomInteger(1, 8) + '.png',
    },
    offer: {
      title: getRandomElementsArray(TITLE_OPTIONS, 1).toString(),
      address: [getRandomDecimal(35.65000, 35.70000), getRandomDecimal(139.70000, 139.80000)],
      price: getRandomInteger(1, MAX_PRICE),
      type: getRandomElementsArray(APARTMENT_TYPES, 1).toString(),
      rooms: getRandomInteger(1, MAX_ROOMS_COUNT),
      guests: getRandomInteger(1, MAX_GUESTS_COUNT),
      checkin: getRandomElementsArray(TIME_OPTIONS, 1).toString(),
      checkout: getRandomElementsArray(TIME_OPTIONS, 1).toString(),
      features: getUniqueElementsArray(APARTMENT_FEATURES, getRandomInteger(1, APARTMENT_FEATURES.length)),
      description: getRandomElementsArray(DESCRIPTION_OPTIONS, 1).toString(),
      photos: getRandomElementsArray(APARTMENT_PHOTOS, getRandomInteger(1, MAX_PHOTOS_COUNT)),
    },
    location: {
      x: getRandomDecimal(35.65000, 35.70000),
      y: getRandomDecimal(139.70000, 139.80000),
    },
  }
}

const similarAdverts = new Array(SIMILAR_ADVERTS_COUNT).fill(null).map(() => createAdvert());// eslint-disable-line