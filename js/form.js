import {sendData} from './api.js';
import {isEscEvent} from './util.js';
import {defaultLocation} from './constants.js';
import {setDefaultLocation} from './map.js';

const advertForm = document.querySelector('.ad-form');
const advertFormAddress = advertForm.querySelector('#address');
const resetButton = advertForm.querySelector('.ad-form__reset');

const resetAdvertForm = () => {
  advertForm.reset();
  setDefaultLocation(advertFormAddress, defaultLocation);
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdvertForm();
});

const createPopup = (templateFragmentID, elementClassName) => {
  const templateFragment = document.querySelector(templateFragmentID).content;
  const template = templateFragment.querySelector(elementClassName);

  return template.cloneNode(true);
}

const submitErrorMassage = createPopup('#error', '.error');
const submitSuccessMassage = createPopup('#success', '.success');

const closeModal = (modal) => {
  modal.remove();
  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  })
}

const openModal = (modal, buttonCloseSelector) => {
  modal.style.zIndex = '9999';
  const main = document.querySelector('main');
  main.appendChild(modal);

  modal.addEventListener('click', () => {
    closeModal(modal);
  })

  if (buttonCloseSelector) {
    const modalCloseButton = modal.querySelector(buttonCloseSelector);
    modalCloseButton.addEventListener('click', () => {
      closeModal(modal);
    })
  }

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal(modal);
    }
  })
}

const successSendForm = (successMessage) => {
  openModal(successMessage);
  resetAdvertForm();
}

const advertFormSubmit = () => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => successSendForm(submitSuccessMassage),
      () => openModal(submitErrorMassage, '.error__button'),
      new FormData(evt.target),
    );
  })
}

export {advertFormSubmit};
