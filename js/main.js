const checkCorrectRange = (min, max) => {
  return !(min < 0 || max < 0 || min > max);
}

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return checkCorrectRange(min, max) && min !== max ?  Math.floor(Math.random() * (max - min + 1)) + min : 'Incorrect range';
}

getRandomInteger (0, 7);


const getRandomDecimal = (min, max, decimalPlaces = 5) => {
  return checkCorrectRange(min, max) ? (Math.random() * (max - min) + min).toFixed(decimalPlaces) : 'Incorrect range';
}

getRandomDecimal(1.1, 2.5, 4);
