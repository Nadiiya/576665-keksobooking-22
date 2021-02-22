/* global L:readonly */
const FRACTION_DIGITS = 5;
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
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const similarAdvertIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const toggleDisable = (element, classname) => {
  const elementChildren = element.children;
  for (let i = 0; i < elementChildren.length; i++) {
    elementChildren[i].toggleAttribute('disabled');
  }
  element.classList.toggle(`${classname}--disabled`);
}

toggleDisable(adFormElement, 'ad-form');
toggleDisable(mapFiltersElement, 'map__filters');

const mapInit = (location) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      toggleDisable(adFormElement, 'ad-form');
      toggleDisable(mapFiltersElement, 'map__filters');
    })

  map.setView(location, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
}

const map = mapInit(defaultLocation);

const createMarker = (icon, location, draggable) => {
  const mainPinMarker = L.marker(
    location,
    {
      draggable: draggable,
      icon: icon,
    },
  );
  mainPinMarker.addTo(map);
  return mainPinMarker;
}

const mainPinMarker = createMarker(mainPinIcon, defaultLocation, true);

const createSimilarAdvertsMarkers = (adverts) => {
  adverts.forEach(element => {
    const marker = createMarker(similarAdvertIcon, Object.values(element.location), false);

    marker.addTo(map)
      .bindPopup(
        createCardItem(element.offer, element.author),
      );
  })
}

createSimilarAdvertsMarkers(similarAdverts);

const mainPinMoveHandler = (evt) => {
  const {lat, lng} = evt.target.getLatLng();

  addressInput.value = `${lat.toFixed(FRACTION_DIGITS)}, ${lng.toFixed(FRACTION_DIGITS)}`;
};

const setDefaultLocation = (input, defaultLocation) => {
  const {lat, lng} = defaultLocation;

  input.value = `${lat}, ${lng}`;
}

addressInput.readOnly = false;
setDefaultLocation(addressInput, defaultLocation);
mainPinMarker.on('moveend', mainPinMoveHandler);
