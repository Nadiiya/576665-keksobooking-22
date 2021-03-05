const ALERT_SHOW_TIME = 10000;

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

const appendContent = (element, content, appendType) => {
  if (content) {
    switch (appendType) {
      case 'textContent':
        element.textContent = content;
        break;
      case 'innerHTML':
        element.innerHTML = '';
        element.innerHTML = content;
        break;
      default:
        throw new Error(`Unexpected appendType: ${appendType}`);
    }
  } else {
    element.remove();
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = '10px';
  alertContainer.style.left = '10px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#ff2900';
  alertContainer.style.backgroundColor = '#ffffff';
  alertContainer.style.border = '1px solid #ff2900';
  alertContainer.style.borderRadius = '8px';
  alertContainer.style.width = '300px';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export {getRandomInteger, getRandomDecimal, appendContent, showAlert, isEscEvent};
