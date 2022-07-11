
const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorButton = errorPopup.querySelector('.error__button');
const isEscapeKey = (evt) => evt.key === 'Escape';

const showSuccessPopup = () => {
  document.body.appendChild(successPopup);
  const keydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  document.addEventListener('keydown', keydownHandler);
  successPopup.addEventListener('click', () => {
    successPopup.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
};

const showErrorPopup = () => {
  document.body.appendChild(errorPopup);
  const keydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorPopup.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  document.addEventListener('keydown', keydownHandler);
  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
};

export {showSuccessPopup, showErrorPopup};
