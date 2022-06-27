const informationForm = document.querySelector('.ad-form');
const informationFormElements = informationForm.querySelectorAll('.fieldset');
const filterForm = document.querySelector('.map__filters');
const priceForm = informationForm.querySelector('#price');
const typeForm = informationForm.querySelector('#type');

const MIN_PRICE_OF_TYPE= {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const getMinCostChange = () => {
  priceForm.placeholder = MIN_PRICE_OF_TYPE[typeForm.value];
  priceForm.min = MIN_PRICE_OF_TYPE[typeForm.value];
};

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
const rangeSliderInit = () => {
  const slider = document.querySelector('.ad-form__slider');
  noUiSlider.create(slider, {
    start: 0,
    connect: 'lower',
    behaviour: 'drag-all',
    range: {
      'min': 0,
      'max': 100000,
    },
    step: 1000,
  }
  );
  slider.noUiSlider.on('update', (values, handle) => { // при изменений положения элементов управления слайдера изменяем соответствующие значения
    priceForm.value = Math.round(values[handle]);
  });
};

const init = () => {
  rangeSliderInit(); // запускаем функцию инициализации слайдера
};

window.addEventListener('DOMContentLoaded', init);


// eslint-disable-next-line no-unused-vars
const pristine = new Pristine(informationForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

informationForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

getMinCostChange();
disableFilterForm();
switchCondition();
export {switchCondition};
