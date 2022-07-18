const ESCAPEBUTTON = 'Escape';
const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const isEscapeKey = (evt) => evt.key === ESCAPEBUTTON;

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
  type.addEventListener('click', () => {
    type.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
};

export {showPopup, successPopup, errorPopup};
