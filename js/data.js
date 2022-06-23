import {getRandomArrayElement,randomIntegerNumber,randomNotIntegerNumber} from './utils.js';

const SIMILAR_OBJECTS_COUNT = 10;

const TYPE_NAMES =[
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_VARIANTS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT_VARIANTS = [
  '12:00',
  '13:00',
  '14:00'
];

const PHOTOS_TYPES =[
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const FEATURES_TYPES =[
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const createUniqueNumbersArray = (count, min) => {
  const numbers = [];
  // собираем числа по порядку, начиная с минимально заданного
  // и прибавляем количество необходимых нам чисел - получаем максимальное число
  for (let i = min; i < count + min; i++) {
    numbers.push(i);
  }

  return numbers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

// Определение полей для объекта offer
function getFeatures() {
  const maxLength = FEATURES_TYPES.length;
  const features = [];
  const newArrayLength = randomIntegerNumber(1, maxLength);
  while (features.length < newArrayLength) {
    const indexOfEl = randomIntegerNumber(0, maxLength - 1);
    const el = FEATURES_TYPES[indexOfEl];
    if (!features.includes(el)) {
      features.push(el);
    }
  }
  return features;
}

// photos, массив строк — массив случайной длины из значений:
const getPhotos = () => {
  const photos = [];
  const newArrayLength = randomIntegerNumber(1, PHOTOS_TYPES.length);
  for (let i=0; i < newArrayLength; i++ ){
    photos.push(PHOTOS_TYPES[i]);
  }
  return photos;
};

//Функция по созданию типового объекта
const createAnObject = (uniqueIds) => {
  const author = {
    // берем из массива id первое значение и удаляем его
    avatar: `img/avatars/user${uniqueIds.shift().toString().padStart(2, '0')}.png`
  };

  const location ={
    lat: randomNotIntegerNumber(35.65000, 35.70000, 5),
    lng: randomNotIntegerNumber(139.70000, 139.80000, 5)
  };

  const offer = {
    title: 'Предлагаем для рассмотрения',
    address: `${location.lat}, ${location.lng}`,
    price: randomIntegerNumber(0,100000),
    type: getRandomArrayElement(TYPE_NAMES),
    rooms: randomIntegerNumber(1,100),
    guests: randomIntegerNumber(1,5),
    checkin: getRandomArrayElement(CHECKIN_VARIANTS),
    checkout: getRandomArrayElement(CHECKOUT_VARIANTS),
    features: getFeatures(),
    description:'Супер-мега-пуперистое помещение :)',
    photos:getPhotos(),
  };

  return {
    author,
    offer,
    location
  };
};

let lastCreatedId = 1;
const createObjects = () => {
  // на каждый вызов создаем новый массив уникальных чисел
  const uniqueIds = createUniqueNumbersArray(SIMILAR_OBJECTS_COUNT, lastCreatedId);
  // запоминаем мксимальное число, которое будет у нас в массиве
  lastCreatedId = lastCreatedId + SIMILAR_OBJECTS_COUNT;

  // передаем полученный массив в функцию создания объекта
  return Array.from({length: SIMILAR_OBJECTS_COUNT}, () => createAnObject(uniqueIds));
};
createObjects();

export {createObjects};

