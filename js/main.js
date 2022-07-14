import './popup.js';
import {renderMarkers, loadMap} from'./map.js';
import {getData, showAlert} from './api.js';
import './form.js';
import {setUserFormSubmit} from './form-validation.js';
import {showPopup, successPopup, errorPopup} from './alert-popup.js';

loadMap();

getData(renderMarkers, showAlert);
setUserFormSubmit(() => showPopup(successPopup), () => showPopup(errorPopup));
