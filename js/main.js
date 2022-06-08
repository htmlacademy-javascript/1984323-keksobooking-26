/*Функция, возвращающая случайное целое число из переданного диапазона включительно*/
const randomIntegerNumber = (min, max) => (min<0 || max<= min)? undefined: Math.floor(Math.random() * (max - min + 1) + min);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//Используется для генерации временных географических координат в следующем задании.
const randomNotIntegerNumber=(min, max, n) => (min < 0 || max <= min)? undefined: +(Math.random() * (max - min + 1) + min).toFixed(n);

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

const arrayOfNumbers = [1,2,3,4,5,6,7,8,9,10];

//Функция возвращающая значение элемента массива с ведущим 0
const getNonRepeatableNumberOfPicture = () => {
  let x=arrayOfNumbers[0];
  arrayOfNumbers.shift();
  return x.toString().length < 2 ? `0${ x}` : x;
};

// Определение полей для объекта offer
const getNewArray = () => {
  const maxLength = FEATURES_TYPES.length;
  const newArray = [];
  const newArrayLength = randomIntegerNumber(1, maxLength);
  while (newArray.length < newArrayLength) {
    const indexOfEl = randomIntegerNumber(0, maxLength - 1);
    const el = FEATURES_TYPES[indexOfEl];
    if (!newArray.includes(el)) {
      newArray.push(el);
    }
  }
  return newArray;
};

// photos, массив строк — массив случайной длины из значений:
const getNewArrayOfPhotos = () => {
  const newArray = [];
  const newArrayLength = randomIntegerNumber(1, PHOTOS_TYPES.length);
  for (let i=0; i < newArrayLength; i++ ){
    newArray.push(PHOTOS_TYPES[i]);
  }
  return newArray;
};

const getRandomArrayElement = (elements) => {
  return elements[randomIntegerNumber(0, elements.length - 1)];
};
//Функция по созданию типового объекта
const createAnObject = () => {
  let author = {
    avatar: `img/avatars/user${getNonRepeatableNumberOfPicture()}.png`
  };

  let location ={
    lat: randomNotIntegerNumber(35.65000, 35.70000, 5),
    lng: randomNotIntegerNumber(139.70000, 139.80000, 5)
  };

  let offer = {
    title: 'Предлагаем для рассмотрения',
    address: `{{${location.lat}}}, {{${location.lng}}}`,
    price: randomIntegerNumber(0,100000),
    type: getRandomArrayElement(TYPE_NAMES),
    rooms: randomIntegerNumber(1,100),
    guests: randomIntegerNumber(1,5),
    checkin: getRandomArrayElement(CHECKIN_VARIANTS),
    chekout: getRandomArrayElement(CHECKOUT_VARIANTS),
    features: getNewArray(),
    description:'Супер-мега-пуперистое помещение :)',
    photos:getNewArrayOfPhotos(),
  };

  return {
    author,
    offer,
    location
  };
};

const similarObjects = Array.from({length: SIMILAR_OBJECTS_COUNT}, createAnObject);

console.log(similarObjects);
