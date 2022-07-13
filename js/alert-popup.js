const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorButton = errorPopup.querySelector('.error__button');
const isEscapeKey = (evt) => evt.key === 'Escape';

const showPopup = (type) => {
  document.body.appendChild(type);
  const keydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      type.remove();
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  document.addEventListener('keydown', keydownHandler);
  (type === errorPopup? closeErrorButton: type)
    .addEventListener('click', () => {
      type.remove();
      document.removeEventListener('keydown', keydownHandler);
    });
  (type === errorPopup? errorPopup: false)
    .addEventListener('click', () => {
      errorPopup.remove();
      document.removeEventListener('keydown', keydownHandler);
    });
};

export {showPopup, successPopup, errorPopup};
