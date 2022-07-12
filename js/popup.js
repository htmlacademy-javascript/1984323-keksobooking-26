const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow:'Бунгало',
  hotel: 'Отель',
};

const similarObjectTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const createCard = ({offer, author}) => {
  const objectElement = similarObjectTemplate.cloneNode(true);
  const featuresContainer = objectElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (!offer.title) {
    objectElement.querySelector('.popup__title').classList.add('hidden');
  } else {
    objectElement.querySelector('.popup__title').textContent = offer.title;
  }

  if (!offer.address) {
    objectElement.querySelector('.popup__text--address').classList.add('hidden');
  } else {
    objectElement.querySelector('.popup__text--address').textContent = offer.address;
  }

  if (!offer.price) {
    objectElement.querySelector('.popup__text--price').classList.add('hidden');
  } else {
    objectElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }

  if (!offer.type) {
    objectElement.querySelector('.popup__type').classList.add('hidden');
  } else {
    objectElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  }

  if (!offer.rooms && offer.guests) {
    objectElement.querySelector('.popup__text--capacity').classList.add('hidden');
  } else {
    objectElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (!offer.checkin && offer.checkout) {
    objectElement.querySelector('.popup__text--time').classList.add('hidden');
  } else {
    objectElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` ;
  }

  if (!offer.features || offer.features.length < 1){
    objectElement.querySelector('.popup__features').classList.add('hidden');
  } else{
    const modifiers = offer.features.map((features) => `popup__feature--${  features}`);
    featuresList.forEach((featuresListItem) => {
      const modifier = featuresListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });
  }

  if (!offer.description) {
    objectElement.querySelector('.popup__description').classList.add('hidden');
  } else{
    objectElement.querySelector('.popup__description').textContent = offer.description;
  }

  if (!offer.photos || offer.photos.length < 1){
    objectElement.querySelector('.popup__photos').classList.add('hidden');
  } else{
    const photoElementParent = objectElement.querySelector('div');
    const photoElementChild = objectElement.querySelector('div').querySelector('img');
    photoElementParent.innerHTML='';
    for(let i = 0; i < offer.photos.length; i++){
      const clonedElement = photoElementChild.cloneNode(false);
      clonedElement.src = offer.photos[i];
      photoElementParent.appendChild(clonedElement);
    }
  }

  if (!author.avatar) {
    objectElement.querySelector('.popup__avatar').classList.add('hidden');
  } else {
    objectElement.querySelector('.popup__avatar').src = author.avatar;
  }
  return objectElement;
};

export{createCard};
