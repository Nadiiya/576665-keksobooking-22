const mapFilters = document.querySelector('.map__filters');
const filterType = mapFilters.querySelector('#housing-type');
const filterPrice = mapFilters.querySelector('#housing-price');
const filterRoomsNumber = mapFilters.querySelector('#housing-rooms');
const filterGuestsNumber = mapFilters.querySelector('#housing-guests');
const filterFeaturesFieldset = mapFilters.querySelector('#housing-features');

const MIDDLE_PRICE_RANGE = {
  'min': 10000,
  'max': 50000,
}

const filterByType = (property) => {
  return (filterType.value === 'any' || property === filterType.value);
}

const filterByPrice = (property) => {
  switch (filterPrice.value) {
    case 'low':
      return (property <= MIDDLE_PRICE_RANGE.min);
    case 'high':
      return (property >= MIDDLE_PRICE_RANGE.max);
    case 'middle':
      return (property > MIDDLE_PRICE_RANGE.min && property < MIDDLE_PRICE_RANGE.max);
    default:
      return (filterPrice.value === 'any');
  }
}

const filterByRooms = (property) => {
  return (filterRoomsNumber.value === 'any' || property === Number(filterRoomsNumber.value));
}

const filterByGuests = (property) => {
  return (filterGuestsNumber.value === 'any' || property === Number(filterGuestsNumber.value));
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

  return adverts.filter((adverts) => (
    (
      (filterByPrice(adverts.offer.price)) &&
      (filterByType(adverts.offer.type)) &&
      (filterByRooms(adverts.offer.rooms)) &&
      (filterByGuests(adverts.offer.guests)) &&
      (filterByFeatures(adverts.offer.features))
    )
  ));
}

export {filterAdverts, mapFilters}
