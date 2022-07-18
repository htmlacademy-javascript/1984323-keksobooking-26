import './popup.js';
import './avatar.js';
import {debounce} from'./utils.js';
import {renderMarkers, removeMarker} from'./map.js';
import {getData, showAlert} from './api.js';
import {disableFilterForm} from'./form.js';
import {setUserFormSubmit} from './form-validation.js';
import {showPopup, successPopup, errorPopup} from './alert-popup.js';
import {changeFilters, checkAllFilters} from './filter.js';

getData((offers) => {
  renderMarkers((offers));
  changeFilters(debounce(
    () => {
      removeMarker();
      renderMarkers(checkAllFilters(offers));
    }));
  disableFilterForm();// При успешной загрузке карты фильтр для карты переключается в активное состояние
}, () => showAlert('Не удалось загрузить данные. Попробуйте еще раз'));
setUserFormSubmit(() => showPopup(successPopup), () => showPopup(errorPopup));


