const informationForm = document.querySelector('.ad-form');
const informationFormElements = informationForm.querySelectorAll('.fieldset');
const filterForm = document.querySelector('.map__filters');

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
disableFilterForm();
export {switchCondition};
