import {sendData} from './api.js';
import {isEscEvent} from './util.js';
import {setDefaultLocation, defaultLocation} from './map.js';
import {advertForm, validateForm} from './validation.js';
import {mapFilter} from './filter.js';
import {setDefaultHousePreview, setDefaultAvatarPreview} from './picture.js';

const advertFormAddress = advertForm.querySelector('#address');
const resetButton = advertForm.querySelector('.ad-form__reset');
const main = document.querySelector('main');

const resetForms = () => {
  advertForm.reset();
  mapFilter.reset();
  setDefaultLocation(advertFormAddress, defaultLocation);
  setDefaultHousePreview();
  setDefaultAvatarPreview();
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

const popupKeyDownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const createPopup = (templateFragmentID, elementClassName) => {
  const templateFragment = document.querySelector(templateFragmentID).content;
  const template = templateFragment.querySelector(elementClassName);

  return template.cloneNode(true);
}

const submitErrorMessage = createPopup('#error', '.error');
const submitSuccessMessage = createPopup('#success', '.success');

const closeModal = () => {
  if (main.contains(submitErrorMessage)) {
    submitErrorMessage.remove();
  }

  if (main.contains(submitSuccessMessage)) {
    submitSuccessMessage.remove()
  }

  document.removeEventListener('keydown', popupKeyDownHandler);
}

const openErrorModal = () => {
  submitErrorMessage.style.zIndex = '9999';
  const errorButton = submitErrorMessage.querySelector('.error__button');
  main.appendChild(submitErrorMessage);

  submitErrorMessage.addEventListener('click', closeModal);
  errorButton.addEventListener('click', closeModal);

  document.addEventListener('keydown', popupKeyDownHandler);
}

const openSuccessModal = () => {
  submitSuccessMessage.style.zIndex = '9999';
  main.appendChild(submitSuccessMessage);
  submitSuccessMessage.addEventListener('click', closeModal);
  resetForms();

  document.addEventListener('keydown', popupKeyDownHandler)
}

advertForm.addEventListener('input', validateForm);

const advertFormSubmit = () => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => openSuccessModal(),
      () => openErrorModal(),
      new FormData(evt.target),
    );
  })
}

export {advertFormSubmit};
