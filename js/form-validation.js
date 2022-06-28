import {informationForm, priceForm,typeForm, MIN_PRICE_OF_TYPE} from './form.js';

const pristine = new Pristine(informationForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, false);

const validatePrice = () => priceForm.value <= MIN_PRICE_OF_TYPE[typeForm.value];
const showPriceValidationError = () => `Минимальная цена должна быть больше ${MIN_PRICE_OF_TYPE[typeForm.value]}`;

pristine.addValidator(priceForm, validatePrice, showPriceValidationError);

informationForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
