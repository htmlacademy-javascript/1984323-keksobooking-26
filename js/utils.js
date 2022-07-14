//Функция, возвращающая случайное целое число из переданного диапазона включительно
const randomIntegerNumber = (min, max) => (min<0 || max<= min)? undefined: Math.floor(Math.random() * (max - min + 1) + min);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//Используется для генерации временных географических координат в следующем задании.
const randomNotIntegerNumber=(min, max, n) => (min < 0 || max <= min)? undefined: +(Math.random() * (max - min + 1) + min).toFixed(n);

const getRandomArrayElement = (elements) => elements[randomIntegerNumber(0, elements.length - 1)];

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomArrayElement, randomIntegerNumber, randomNotIntegerNumber, debounce};
