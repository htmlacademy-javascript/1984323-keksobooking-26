const DEFAULT_VALUE = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const PriceLevel = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
  ANY: 'any',
};

const filterForm = document.querySelector('.map__filters');
const typeFilter = filterForm.querySelector('#housing-type');
const priceFilter = filterForm.querySelector('#housing-price');
const roomsFilter = filterForm.querySelector('#housing-rooms');
const guestsFilter = filterForm.querySelector('#housing-guests');
const featuresFilter = filterForm.querySelector('#housing-features');
const checkboxElement = document.querySelectorAll('.map__checkbox');

const checkType =({offer}) => {
  if (typeFilter.value === DEFAULT_VALUE) {
    return offer;
  }
  if (typeFilter.value === offer.type) {
    return offer;
  }
};

const checkPrice = ({offer}) => {
  switch (priceFilter.value) {
    case PriceLevel.LOW:
      return offer.price < MIN_PRICE;
    case PriceLevel.MIDDLE:
      return offer.price >= MIN_PRICE && offer.price <= MAX_PRICE;
    case PriceLevel.HIGH:
      return offer.price >= MAX_PRICE;
    case PriceLevel.ANY:
      return true;
  }
};

const checkRooms = ({offer}) => {
  if (roomsFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return +roomsFilter.value === offer.rooms;
};

const checkGuests = ({offer}) => {
  if (guestsFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return +guestsFilter.value === offer.guests;
};

const checkFeatures = ({offer}) => {
  const checkedFeatures = Array.from(featuresFilter.querySelectorAll('input[type="checkbox"]:checked'));
  const dataFeatures = offer.features;
  if (dataFeatures) {
    return checkedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
};

const checkAllFilters = (data) => data.filter((value) =>
  checkType(value) &&
  checkPrice(value) &&
  checkRooms(value) &&
  checkGuests(value) &&
  checkFeatures(value));

const changeFilters = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

const resetFilter = () => {
  typeFilter.value = DEFAULT_VALUE;
  priceFilter.value = DEFAULT_VALUE;
  roomsFilter.value = DEFAULT_VALUE;
  guestsFilter.value = DEFAULT_VALUE;
  checkboxElement.forEach((elem)=>{elem.checked =false;});
};

export {checkAllFilters, changeFilters, resetFilter};
