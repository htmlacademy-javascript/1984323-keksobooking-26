/*Функция, возвращающая случайное целое число из переданного диапазона включительно*/

function getRandomIntegerNumber(min, max){
  return (min<0 || max<= min)?'underfind': Math.floor(Math.random() * (max - min + 1) + min);
}
getRandomIntegerNumber(1,3);


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//Используется для генерации временных географических координат в следующем задании.

function getRandomNotIntegerNumber(min, max, n){
  return (min < 0 || max <= min)?'underfind': (Math.random() * (max - min + 1) + min).toFixed(n);
}
getRandomNotIntegerNumber(3, 5, 1);
