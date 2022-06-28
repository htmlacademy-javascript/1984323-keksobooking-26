import {informationForm, priceForm,typeForm, MIN_PRICE_OF_TYPE} from './form.js';

const roomNumber = informationForm.querySelector('#room_number');
const capacityForm = informationForm.querySelector('#capacity');

const pristine = new Pristine(informationForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, false);

const validatePrice = () => priceForm.value >= MIN_PRICE_OF_TYPE[typeForm.value];
const showPriceValidationError = () => `Минимальная цена должна быть больше ${MIN_PRICE_OF_TYPE[typeForm.value]}`;
pristine.addValidator(priceForm, validatePrice, showPriceValidationError);

const validateRoomsandGuests = () => Number(capacityForm.value) <= Number(roomNumber.value);
const showGuestsValidationError = () => 'Количество мест должно быть меньше или равно количеству комнат';
const showRoomsValidationError = () => 'Количество комнат должно быть больше или равно количеству мест';

pristine.addValidator(capacityForm, validateRoomsandGuests, showGuestsValidationError);
pristine.addValidator(roomNumber, validateRoomsandGuests, showRoomsValidationError);


informationForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    informationForm.submit();
  }
});
