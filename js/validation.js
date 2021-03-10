const advertForm = document.querySelector('.ad-form');
const advertFormPrice = advertForm.querySelector('#price');
const advertFormType = advertForm.querySelector('#type');
const advertFormRoomNumber = advertForm.querySelector('#room_number');
const advertFormCapacity = advertForm.querySelector('#capacity');
const advertFormTimeIn = advertForm.querySelector('#timein');
const advertFormTimeOut = advertForm.querySelector('#timeout');

const offerTypesToPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
}

const roomsNumberToCapacity = {
  1: ['1'],
  2: ['2', '1'],
  3: ['1', '2', '3'],
  100: ['0'],
}

const setMinPrice = () => {
  const currentOfferType = advertFormType.value;
  const minPrice = offerTypesToPrice[`${currentOfferType}`];
  advertFormPrice.setAttribute('placeholder', minPrice);
  advertFormPrice.setAttribute('min', minPrice);
}

const setCapacity = () => {
  const currentRoomsNumber = advertFormRoomNumber.value;
  const options = advertFormCapacity.querySelectorAll('option');
  const firstViable = roomsNumberToCapacity[currentRoomsNumber][0];

  for (let i = 0; i < options.length; i++) {
    if (options[i].hasAttribute('selected')) {
      options[i].removeAttribute('selected');
    }

    if (options[i].hasAttribute('disabled')) {
      options[i].removeAttribute('disabled');
    }

    //если значение опшина является первым возможным, добавить атрибут selected
    if (options[i].value === firstViable) {
      options[i].setAttribute('selected', '');
    }

    //если значение не нашлось среди возможных значений для текущего количества комнат, добавить атрибут disabled
    if (!roomsNumberToCapacity[currentRoomsNumber].includes(options[i].value)) {
      options[i].setAttribute('disabled', '');
    }
  }
}

const setTimeOut = (value) => {
  advertFormTimeOut.value = value;
  advertFormTimeOut.setAttribute('selected', '');
}

const setTimeIn = (value) => {
  advertFormTimeIn.value = value;
  advertFormTimeIn.setAttribute('selected', '');
}

const setValidityMessage = (input) => {
  const validity = input.validity;
  let invalidityMessages = [];

  if (validity.rangeOverflow) {
    const max = input.getAttribute('max');
    invalidityMessages.push(`Значение превышает допустимый максимум ${max}.`);
  }

  if (validity.rangeUnderflow) {
    const min = input.getAttribute('min');
    invalidityMessages.push(`Значение мешьше допустимого минимума ${min}.`);
  }

  if (validity.tooShort) {
    const minLength = input.getAttribute('minlength');
    invalidityMessages.push(`Слишком короткий текст. Минимальная длинна сообщения ${minLength} знаков.`);
  }

  if (validity.tooLong) {
    const maxLength = input.getAttribute('maxlength');
    invalidityMessages.push(`Слишком длинный текст. Максимальная длинна сообщения ${maxLength} знаков.`);
  }

  if (validity.valueMissing) {
    invalidityMessages.push('Это поле объязательно к заполнению');
  }

  const errorMessage = invalidityMessages.join('. \n');
  input.setCustomValidity(errorMessage);
  input.reportValidity();
}

const validateForm = (evt) => {
  const currentElement = evt.target;
  let currentElementId = currentElement.getAttribute('id');
  if (currentElementId === 'type') {
    setMinPrice();
    setValidityMessage(advertFormPrice);
  }
  if (currentElementId === 'room_number') {
    setCapacity();
  }
  if (currentElementId === 'timein') {
    setTimeOut(currentElement.value);
  }
  if (currentElementId === 'timeout') {
    setTimeIn(currentElement.value);
  }

  setValidityMessage(currentElement);
}

export {advertForm, validateForm}
