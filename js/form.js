import {resetMarker, resetMap, renderMarkers} from './map.js';
import {avatarPreview, clonedElem} from './avatar.js';
import {resetFilter} from './filter.js';
import { adverts } from './api.js';

const MIN_PRICE_OF_TYPE= {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
const BACKGROUND_IMAGE = 'img/muffin-grey.svg';


const informationForm = document.querySelector('.ad-form');
const informationFormElements = informationForm.querySelectorAll('.fieldset');
const filterForm = document.querySelector('.map__filters');
const priceForm = informationForm.querySelector('#price');
const typeForm = informationForm.querySelector('#type');
const slider = document.querySelector('.ad-form__slider');
const submitButton = informationForm.querySelector('.ad-form__submit');
const resetButton = informationForm.querySelector('.ad-form__reset');
const address = informationForm.querySelector('#address');

const switchCondition = () => {
  informationForm.classList.toggle('ad-form--disabled');
  informationFormElements.forEach((fieldset) => {
    fieldset.disabled = !fieldset.disabled;
  });
};

const disableFilterForm = () => {
  filterForm.classList.toggle('map__filters--disabled');
  for (const filterFormItem of filterForm.children) {
    filterFormItem.disabled = !filterFormItem.disabled;
  }
};

noUiSlider.create(slider, {
  start: 0,
  connect: 'lower',
  behaviour: 'drag-all',
  step: 500,
  range: {
    'min': [0],
    'max': [100000]
  }
}
);

slider.noUiSlider.on('update', (values, handle) => {
  priceForm.value = Math.floor(values[handle]);
});

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const getTypeChange = () => {
  priceForm.placeholder = MIN_PRICE_OF_TYPE[typeForm.value];
  priceForm.min = MIN_PRICE_OF_TYPE[typeForm.value];
};
typeForm.addEventListener('change',getTypeChange);


// Блокирование кнопки 'Опубликовать'
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

// Разблокировка кнопки 'Опубликовать'
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  informationForm.reset();
  slider.noUiSlider.reset();
  resetMap();
  resetMarker();
  resetFilter();
  renderMarkers(adverts);
  avatarPreview.src = BACKGROUND_IMAGE;
  clonedElem.classList.add('hidden');
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

disableFilterForm();
switchCondition();
export {informationForm, priceForm, typeForm, switchCondition, disableFilterForm, MIN_PRICE_OF_TYPE, blockSubmitButton, unblockSubmitButton, address, resetForm};
