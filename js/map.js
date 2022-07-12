import {switchCondition, address } from './form.js';
import {createCard} from './popup.js';

const TOKYO = { lat: 35.652832, lng: 139.839478};
const MAP_ZOOM = 13;
const L = window.L;

const mainPinIconSize = [52, 52];
const mainPinIconAnchor = [26, 52];
const adIconSize = [40, 40];
const adiconAnchor = [20, 40];
const toFixedDigit = 5;
address.value= `${TOKYO.lat.toFixed(toFixedDigit)}, ${TOKYO.lng.toFixed(toFixedDigit)}`;

const onMapLoad =() => {
  switchCondition();
};
const map = L.map('map-canvas')
  .on('load',onMapLoad)
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: MAP_ZOOM,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Создание основной метки
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: mainPinIconSize,
  iconAnchor: mainPinIconAnchor,
});

const marker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

//При остановке движения основной метки координаты отображаются в поле "Адрес"
marker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(toFixedDigit)}, ${coordinates.lng.toFixed(toFixedDigit)}`;
});

//Создание метки объявления
const adIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: adIconSize,
  iconAnchor: adiconAnchor,
});

const layerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location} = point;
  L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: adIcon,
    },
  )
    .addTo(layerGroup)
    .bindPopup(createCard(point));
};

const renderMarkers = (offers) => {
  offers.forEach((point) => {
    createMarker(point);
  });
};

const resetMap = () => map.setView({
  lat: TOKYO.lat,
  lng: TOKYO.lng,
}, MAP_ZOOM);

const resetMarker = () => {
  address.value= `${TOKYO.lat.toFixed(toFixedDigit)}, ${TOKYO.lng.toFixed(toFixedDigit)}`;
  marker.setLatLng({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  });
};

export {renderMarkers, resetMarker, resetMap};


