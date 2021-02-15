const createFeaturesListFrom = (array) => {
  const total = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    const newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add(`popup__feature--${array[i]}`);
    total.appendChild(newElement);
  }
  return total;
}

const createCardGalleryFrom = (array) => {
  const total = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    const newElement = document.createElement('img');
    newElement.src = array[i];
    newElement.classList.add('popup__photo');
    newElement.alt = 'Фотография жилья';
    newElement.width = '45';
    newElement.height = '40';
    total.appendChild(newElement);
  }
  return total;
}

const createTypeNameFrom = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира'
    case 'bungalow':
      return 'Бунгало'
    case 'house':
      return 'Дом'
    case 'palace':
      return 'Дворец'
    default:
      return ''
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

  cardFeatures.innerHTML = '';
  cardPhotos.innerHTML = '';

  if (offer.title) {
    cardTitle.textContent = offer.title;
  } else {
    cardTitle.remove();
  }
  if (offer.address) {
    cardAddress.textContent = offer.address;
  } else {
    cardAddress.remove();
  }
  if (offer.price) {
    cardPrice.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  } else {
    cardPrice.remove();
  }
  if (offer.type) {
    cardType.textContent = createTypeNameFrom(offer.type);
  } else {
    cardType.remove();
  }
  if (offer.rooms && offer.guests) {
    cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    cardCapacity.remove();
  }
  if (offer.checkin && offer.checkout) {
    cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    cardTime.remove();
  }
  if (offer.features) {
    cardFeatures.appendChild(createFeaturesListFrom(offer.features));
  } else {
    cardFeatures.remove();
  }
  if (offer.description) {
    cardDescription.textContent = offer.description;
  } else {
    cardDescription.remove();
  }
  if (offer.photos) {
    cardPhotos.appendChild(createCardGalleryFrom(offer.photos));
  } else {
    cardPhotos.remove();
  }
  if (author.avatar) {
    cardAvatar.src = author.avatar;
  } else {
    cardAvatar.remove();
  }
  return cardItem;
}

const createCardsList = (parent, data) => {
  const fragment = document.createDocumentFragment();

  data.forEach(({offer, author}) => {
    let newCard = createCardItem(offer, author);
    fragment.appendChild(newCard);
  });

  return parent.appendChild(fragment);
}

export {createCardsList};
