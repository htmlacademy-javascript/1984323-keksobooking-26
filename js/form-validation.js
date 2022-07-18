import {informationForm, priceForm, typeForm, MIN_PRICE_OF_TYPE, blockSubmitButton, unblockSubmitButton,resetForm} from './form.js';
import {sendData} from './api.js';

const MAXROOMNUMBER = '100';
const CAPACITYNUMBER = '0';

const roomNumber = informationForm.querySelector('#room_number');
const capacityForm = informationForm.querySelector('#capacity');
const timeinForm = informationForm.querySelector('#timein');
const timeOutForm = informationForm.querySelector('#timeout');


// Поле «Время заезда» синхронизированно изменят значение «Время выезда»
timeinForm.addEventListener('change',() => {timeOutForm.value = timeinForm.value;});

// Поле «Время выезда» синхронизированно изменят значение «Время заезда»
timeOutForm.addEventListener('change',() => {timeinForm.value = timeOutForm.value;});

const pristine = new Pristine(informationForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, false);

const validatePrice = () => Number(priceForm.value) >= MIN_PRICE_OF_TYPE[typeForm.value];
const validatePriceAndType = () => Number(priceForm.value) >= MIN_PRICE_OF_TYPE[typeForm.value];
const showPriceValidationError = () => `Минимальная цена должна быть больше ${MIN_PRICE_OF_TYPE[typeForm.value]}`;
pristine.addValidator(priceForm, validatePrice, showPriceValidationError);
pristine.addValidator(typeForm, validatePriceAndType, showPriceValidationError);

const checkGuestsCount = () =>{
  if (Number(roomNumber.value )=== MAXROOMNUMBER || Number(capacityForm.value) === CAPACITYNUMBER){
    return roomNumber.value === MAXROOMNUMBER && capacityForm.value === CAPACITYNUMBER ;
  }
  return Number(capacityForm.value) <= Number(roomNumber.value);
};

const validateGuests = () => Number(capacityForm.value) <= Number(roomNumber.value);
const showGuestsValidationError = () => 'Количество мест должно быть меньше или равно количеству комнат';
const showRoomsValidationError = () => 'Количество комнат должно быть больше или равно количеству мест. Если 100 комнат, то "не для гостей"';
pristine.addValidator(capacityForm, validateGuests, showGuestsValidationError);
pristine.addValidator(roomNumber, checkGuestsCount, showRoomsValidationError);


const setUserFormSubmit = (onSuccess, onFail) => {
  informationForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          resetForm();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
