const mapFilter = document.querySelector('.map__filters');
const filterType = mapFilter.querySelector('#housing-type');
const filterPrice = mapFilter.querySelector('#housing-price');
const filterRoomsNumber = mapFilter.querySelector('#housing-rooms');
const filterGuestsNumber = mapFilter.querySelector('#housing-guests');
const filterFeaturesFieldset = mapFilter.querySelector('#housing-features');

const DEFAULT_SELECT_VALUE = 'any';

const MiddlePriceRange = {
  MIN: 10000,
  MAX: 50000,
}

const activateFilter = () => {
  mapFilter.classList.remove('map__filters--disabled');
  for (const item of mapFilter.children) {
    item.disabled = false;
  }
}

const deactivateFilter = () => {
  mapFilter.classList.add('disabled');
  for (const item of mapFilter.children) {
    item.disabled = true;
  }
}

const filterByType = (property) => {
  return (filterType.value === DEFAULT_SELECT_VALUE || property === filterType.value);
}

const filterByPrice = (property) => {
  switch (filterPrice.value) {
    case 'low':
      return (property <= MiddlePriceRange.MIN);
    case 'high':
      return (property >= MiddlePriceRange.MAX);
    case 'middle':
      return (property > MiddlePriceRange.MIN && property < MiddlePriceRange.MIN);
    default:
      return (filterPrice.value === DEFAULT_SELECT_VALUE);
  }
}

const filterByRooms = (property) => {
  return (filterRoomsNumber.value === DEFAULT_SELECT_VALUE || property === Number(filterRoomsNumber.value));
}

const filterByGuests = (property) => {
  return (filterGuestsNumber.value === DEFAULT_SELECT_VALUE || property === Number(filterGuestsNumber.value));
}

const getMatchCount = (arrayA, arrayB) => {
  return arrayA.filter(item => arrayB.includes(item)).length
}

const filterByFeatures = (property) => {
  const featuresChecked = filterFeaturesFieldset.querySelectorAll('input:checked');
  const featuresFilterValues = [];

  featuresChecked.forEach(item => featuresFilterValues.push(item.value));
  const matchesCount = getMatchCount(property, featuresFilterValues);

  return (featuresFilterValues.length === 0 || featuresFilterValues.length === matchesCount);
}

const filterAdverts = (adverts) => {

  return adverts.filter((advert) => (
    (
      (filterByPrice(advert.offer.price)) &&
      (filterByType(advert.offer.type)) &&
      (filterByRooms(advert.offer.rooms)) &&
      (filterByGuests(advert.offer.guests)) &&
      (filterByFeatures(advert.offer.features))
    )
  ));
}

const setFilteredMarkers = (cb) => {
  mapFilter.addEventListener('change', (evt) => cb(evt));
}

export {filterAdverts, activateFilter, deactivateFilter, mapFilter, setFilteredMarkers}
