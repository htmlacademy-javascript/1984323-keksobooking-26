const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileAccomodationChooser = document.querySelector('.ad-form__upload input[type=file]');
const accomodationPreview = document.querySelector('.ad-form__photo');
const clonedElem = avatarPreview.cloneNode(true);
clonedElem.alt = 'Фото жилья';

const addFilefoo = (typeOfFile) => {
  typeOfFile.addEventListener('change', () => {
    const file = typeOfFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      if (typeOfFile === fileAccomodationChooser) {
        clonedElem.src = URL.createObjectURL(file);
        accomodationPreview.appendChild(clonedElem);
      }
      else {
        avatarPreview.src = URL.createObjectURL(file);
      }
    }
  });
};

addFilefoo(fileAvatarChooser);
addFilefoo(fileAccomodationChooser);

export {avatarPreview, clonedElem};
