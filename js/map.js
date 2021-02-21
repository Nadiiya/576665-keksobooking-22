/* global L:readonly */
import {createSimilarAdverts} from './data.js';
import {createCardItem} from './card.js'

const adFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const addressInput = adFormElement.querySelector('#address');
const similarAdverts = createSimilarAdverts();
const defaultLocation = {
  lat: 35.68950,
  lng: 139.69171,
}

const toggleDisable = (element, classname) => {
  const elementChildren = element.children;
  for (let i = 0; i < elementChildren.length; i++) {
    elementChildren[i].toggleAttribute('disabled');
  }
  element.classList.toggle(`${classname}--disabled`);
}

toggleDisable(adFormElement, 'ad-form');
toggleDisable(mapFiltersElement, 'map__filters');

const map = L.map('map-canvas')
  .on('load', () => {
    toggleDisable(adFormElement, 'ad-form');
    toggleDisable(mapFiltersElement, 'map__filters');
  })
  .setView(defaultLocation, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createMainPinMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    defaultLocation,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  return mainPinMarker;
}

const mainPinMarker = createMainPinMarker();

const createSimilarAdvertsMarkers = (adverts) => {
  const similarAdvertIcon = L.marker({
    iconUrl: 'img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  })

  adverts.forEach(element => {
    const marker = L.marker({
      lat: element.location.x,
      lng: element.location.y,
    },
    {
      similarAdvertIcon,
    });
    marker
      .addTo(map)
      .bindPopup(
        createCardItem(element.offer, element.author),
      );
  });
}

createSimilarAdvertsMarkers(similarAdverts);

const getMainMarkerLocation = (mainMarker, defaultLocation) => {
  const location = `${defaultLocation.lat}, ${defaultLocation.lng}`;

  mainPinMarker.on('moveend', (evt) => {
    const loc = evt.target.getLatLng();
    addressInput.value = `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}`;
  });
  return location;
}

addressInput.setAttribute('readonly', '');
addressInput.value = getMainMarkerLocation(mainPinMarker, defaultLocation);
