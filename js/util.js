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

export {getRandomInteger, getRandomDecimal};
