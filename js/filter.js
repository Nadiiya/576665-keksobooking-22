const filterAdverts = (adverts, option) => {
  return  adverts.filter((adverts) => (option.value === 'any' || adverts.offer.type === option.value));
}

export {filterAdverts}
