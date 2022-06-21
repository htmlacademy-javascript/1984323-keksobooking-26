import { createObjects } from './data.js';

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

const firstTemporaryObject = document.querySelector('#map-canvas');

const photoElementParent = similarObjectTemplate.querySelector('div');
const photoElementChild = similarObjectTemplate.querySelector('div').querySelector('img');

const clonePhotoElement = (offer) => {
  photoElementParent.innerHTML='';
  for(let i = 0; i < offer.photos.length; i++){
    const clonedElement = photoElementChild.cloneNode(false);
    clonedElement.src = offer.photos[i];
    photoElementParent.appendChild(clonedElement);
  }
};

const similarObjects = createObjects();
const fragment = document.createDocumentFragment();
const newArray =[];
similarObjects.forEach(({ offer, author} ) => {
  const objectElement = similarObjectTemplate.cloneNode(true);
  if (!offer.description) {
    objectElement.querySelector('.popup__description').classList.add('hidden');
  }
  else{
    objectElement.querySelector('.popup__avatar').src = author.avatar;
    objectElement.querySelector('.popup__title').textContent = offer.title;
    objectElement.querySelector('.popup__text--address').textContent = offer.address;
    objectElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    objectElement.querySelector('.popup__type').textContent = TYPES[offer.type];
    objectElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    objectElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    objectElement.querySelector('.popup__features').textContent = offer.features;
    objectElement.querySelector('.popup__description').textContent = offer.description;
    clonePhotoElement(offer);
    newArray.push(objectElement);
  }
});
fragment.appendChild(newArray[0]);
firstTemporaryObject.appendChild(fragment);
