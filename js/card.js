import {appendContent} from './util.js';

const offerTypesToLabels = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const createFeatureElement = (element, content) => {
  if (content) {
    const featureElement = document.createDocumentFragment();
    for (let i = 0; i < content.length; i++) {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add(`popup__feature--${content[i]}`);
      featureElement.appendChild(featureItem);
    }
    element.innerHTML = '';
    element.appendChild(featureElement);
  } else {
    element.remove();
  }
};

const createGalleryElement = (element, content) => {
  if (content) {
    const galleryElement = document.createDocumentFragment();
    for (let i = 0; i < content.length; i++) {
      const galleryItem = document.createElement('img');
      galleryItem.src = content[i];
      galleryItem.classList.add('popup__photo');
      galleryItem.alt = 'Фотография жилья';
      galleryItem.width = 45;
      galleryItem.height = 40;
      galleryElement.appendChild(galleryItem);
    }
    element.innerHTML = '';
    element.appendChild(galleryElement);
  } else {
    element.remove();
  }
};

const createCapacityElement = (element, rooms, guests) => {
  if (rooms && guests) {
    element.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else if (rooms && !guests) {
    element.textContent = `${rooms} комнаты`;
  } else if (!rooms && guests) {
    element.textContent = `Для ${guests} гостей`;
  } else {
    element.remove();
  }
}

const createTimesElement = (element, checkin, checkout) => {
  if (checkin && checkout) {
    element.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else if (checkin && !checkout) {
    element.textContent = `Заезд после ${checkin}`;
  } else if (!checkin && checkout) {
    element.textContent = `Выезд до ${checkout}`;
  } else {
    element.remove();
  }
}

const createAvatar = (element, content) => {
  if (content) {
    element.src = content;
  } else {
    element.remove();
  }
}

const createCardItem = (offer, author) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const cardItem = template.cloneNode(true);

  const cardTitle = cardItem.querySelector('.popup__title');
  const cardAddress = cardItem.querySelector('.popup__text--address');
  const cardPrice = cardItem.querySelector('.popup__text--price');
  const cardType = cardItem.querySelector('.popup__type');
  const cardCapacity = cardItem.querySelector('.popup__text--capacity');
  const cardTime = cardItem.querySelector('.popup__text--time');
  const cardFeatures = cardItem.querySelector('.popup__features');
  const cardDescription = cardItem.querySelector('.popup__description');
  const cardPhotos = cardItem.querySelector('.popup__photos');
  const cardAvatar = cardItem.querySelector('.popup__avatar');

  appendContent(cardTitle, offer.title, 'textContent');
  appendContent(cardAddress, offer.address, 'textContent');
  appendContent(cardAddress, offer.address, 'textContent');
  appendContent(cardPrice, `${offer.price} <span>₽/ночь</span>`, 'innerHTML');
  appendContent(cardType, offerTypesToLabels[offer.type], 'textContent');
  createCapacityElement(cardCapacity, offer.rooms, offer.guests);
  createTimesElement(cardTime, offer.checkin, offer.checkout);
  createFeatureElement(cardFeatures, offer.features);
  appendContent(cardDescription, offer.description, 'textContent');
  createGalleryElement(cardPhotos, offer.photos);
  createAvatar(cardAvatar, author.avatar);

  return cardItem;
}

export {createCardItem};
