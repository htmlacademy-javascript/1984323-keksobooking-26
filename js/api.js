import {showPopup, errorPopup} from './alert-popup.js';
const DATABASE_URL = 'https://26.javascript.pages.academy/keksobooking';
const DATABSE_OFFERS_URL = `${DATABASE_URL}/data`;
const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Создание функции по загрузке данных с сервера
const getData = (onSuccess, onFail) => {
  fetch(DATABSE_OFFERS_URL)
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then (onSuccess);
      }
      {
        onFail();
        showAlert('Не удалось загрузить данные. Попробуйте еще раз');
      }
    })
    .catch (() => {
      onFail();
      showAlert('Не удалось загрузить данные. Попробуйте еще раз');
    });
};

// Создание функции по отправке данных на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    DATABASE_URL,
    {
      method: 'POST',
      type: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
        showPopup(errorPopup);
      }
    })
    .catch(() => {
      onFail();
      showPopup(errorPopup);
    });
};

export {getData, sendData, showAlert};
