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

const getTitle = (title, element) => {
  if (!title) {
    element.querySelector('.popup__title').classList.add('hidden');
  } else {
    element.querySelector('.popup__title').textContent = title;
  }
};

const getAddress = (address, element) => {
  if (!address) {
    element.querySelector('.popup__text--address').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--address').textContent = address;
  }
};

const getPrice = (price, element) => {
  if (!price) {
    element.querySelector('.popup__text--price').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  }
};

const getType = (type, element) => {
  if (!type) {
    element.querySelector('.popup__type').classList.add('hidden');
  } else {
    element.querySelector('.popup__type').textContent = TYPES[type];
  }
};

const getRoomsAndGuests = (rooms, guests, element) => {
  if (!rooms && guests) {
    element.querySelector('.popup__text--capacity').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  }
};

const getCheckinAndCheckout = (checkin, checkout, element) => {
  if (!checkin && checkout) {
    element.querySelector('.popup__text--time').classList.add('hidden');
  } else {
    element.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}` ;
  }
};

const getFeatures = (featureitems, element, list ) => {
  if (!featureitems || featureitems.length < 1){
    element.querySelector('.popup__features').classList.add('hidden');
  } else{
    const modifiers = featureitems.map((features) => `popup__feature--${  features}`);
    list.forEach((featuresListItem) => {
      const modifier = featuresListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });
  }
};

const getDescription = (description, element) => {
  if (!description) {
    element.querySelector('.popup__description').classList.add('hidden');
  } else{
    element.querySelector('.popup__description').textContent = description;
  }
};

const getPhotos = (photos, element) => {
  if (!photos || photos.length < 1){
    element.querySelector('.popup__photos').classList.add('hidden');
  } else{
    const photoElementParent = element.querySelector('div');
    const photoElementChild = element.querySelector('div').querySelector('img');
    photoElementParent.innerHTML='';
    photos.forEach((photo)=> {
      const clonedElement = photoElementChild.cloneNode(false);
      clonedElement.src = photo;
      photoElementParent.appendChild(clonedElement);
    });
  }
};

const getAvatar = (avatar, element) => {
  if (!avatar) {
    element.querySelector('.popup__avatar').classList.add('hidden');
  } else {
    element.querySelector('.popup__avatar').src = avatar;
  }
};

const createCard = ({offer, author}) => {
  const objectElement = similarObjectTemplate.cloneNode(true);
  const featuresContainer = objectElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const title = offer.title;
  const address = offer.address;
  const price = offer.price;
  const type = offer.type;
  const rooms =offer.rooms;
  const guests = offer.guests;
  const checkin =offer.checkin;
  const checkout = offer.checkout;
  const featureitems = offer.features;
  const description = offer.description;
  const photos = offer.photos;
  const avatar = author.avatar;

  getTitle (title,objectElement);
  getAddress (address,objectElement);
  getPrice (price,objectElement);
  getType (type,objectElement);
  getRoomsAndGuests(rooms,guests,objectElement);
  getCheckinAndCheckout(checkin,checkout,objectElement);
  getFeatures(featureitems,objectElement,featuresList);
  getDescription(description, objectElement);
  getPhotos(photos,objectElement);
  getAvatar(avatar, objectElement);

  return objectElement;
};

export{createCard};
