/* global L:readonly */
/* global _:readonly */
import {getData} from './api.js';
import {createCardItem} from './card.js';
import {showAlert} from './util.js';
import {activateFilter, deactivateFilter, filterAdverts, setFilteredMarkers} from './filter.js';

const FRACTION_DIGITS = 5;
const RERENDER_DELAY = 300;
const MAP_ZOOM = 10;
const SIMILAR_ADVERTS_COUNT = 10;
const adFormElement = document.querySelector('.ad-form');
const addressInput = adFormElement.querySelector('#address');

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

const activateForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  for (let item of adFormElement.children) {
    item.disabled = false;
  }
}

const deactivateForm = () => {
  adFormElement.classList.add('ad-form--disabled');
  for (let item of adFormElement.children) {
    item.disabled = true;
  }
}

deactivateForm();
deactivateFilter();

const mapInit = (location) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      getData(
        (adverts) => initPage(adverts),
        (error) => showAlert(`Не удалось получить данные. Ошибка запроса. ${error}`),
      );
    })

  map.setView(location, MAP_ZOOM);
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

const advertsMarkers = [];

const removeMarkers = () => {
  advertsMarkers.forEach((marker) => map.removeLayer(marker));
}

const createSimilarAdvertsMarkers = (adverts) => {
  adverts.forEach(element => {
    const marker = createMarker(similarAdvertIcon, Object.values(element.location), false);
    advertsMarkers.push(marker);

    marker.addTo(map)
      .bindPopup(
        createCardItem(element.offer, element.author),
      );
  })
}

const renderAdvertsMarkers = (adverts) => {
  createSimilarAdvertsMarkers(adverts);
  setFilteredMarkers(_.debounce((evt) => {
    removeMarkers();
    const filteredAdverts = filterAdverts(adverts, evt.target);
    createSimilarAdvertsMarkers(filteredAdverts.slice(0, SIMILAR_ADVERTS_COUNT));
  }, RERENDER_DELAY));

}

const initPage = (adverts) => {
  renderAdvertsMarkers(adverts);
  activateFilter();
  activateForm();
}

const mainPinMoveHandler = (evt) => {
  const {lat, lng} = evt.target.getLatLng();

  addressInput.value = `${lat.toFixed(FRACTION_DIGITS)}, ${lng.toFixed(FRACTION_DIGITS)}`;
};

const setDefaultLocation = (input, defaultLocation) => {
  const {lat, lng} = defaultLocation;

  input.value = `${lat}, ${lng}`;
  mainPinMarker.setLatLng(defaultLocation);
}

addressInput.readOnly = false;
setDefaultLocation(addressInput, defaultLocation);
mainPinMarker.on('moveend', mainPinMoveHandler);

export {setDefaultLocation, defaultLocation}
