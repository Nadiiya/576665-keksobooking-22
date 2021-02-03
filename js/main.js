const checkCorrectRange = (min, max) => {
  return !(min < 0 || max < 0 || min > max);
}

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return checkCorrectRange(min, max) && min !== max ?  Math.floor(Math.random() * (max - min + 1)) + min : 'Incorrect range';
}

getRandomInteger (0, 7);
