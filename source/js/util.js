const ALERT_SHOW_TIME = 10000;

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
  alertContainer.style.zIndex = '9999';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscEvent = (evt) => {
  return (evt.key === 'Escape' || evt.key === 'Esc');
};

export {appendContent, showAlert, isEscEvent};
