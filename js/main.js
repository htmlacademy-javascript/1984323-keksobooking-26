import './popup.js';
import {renderMarkers} from'./map.js';
import {getData, showAlert} from './api.js';
import './form.js';
import {setUserFormSubmit} from './form-validation.js';
import {showSuccessPopup, showErrorPopup} from './alert-popup.js';

getData(renderMarkers, showAlert);
setUserFormSubmit(showSuccessPopup, showErrorPopup);
