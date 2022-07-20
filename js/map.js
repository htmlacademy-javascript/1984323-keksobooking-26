import {switchCondition, address } from './form.js';
import {createCard} from './popup.js';

const DEFAULT_COORDINATES = { lat: 35.652832, lng: 139.839478};
const MAP_ZOOM = 13;
const SIMILAR_AD_COUNT = 10;
const L = window.L;
const MAIN_PIN_ICON_URL = './img/main-pin.svg';
const AD_ICON_URL= './img/pin.svg';

const mainPinIconSize = [52, 52];
const mainPinIconAnchor = [26, 52];
const adIconSize = [40, 40];
const adiconAnchor = [20, 40];
const toFixedDigit = 5;
address.value= `${DEFAULT_COORDINATES.lat.toFixed(toFixedDigit)}, ${DEFAULT_COORDINATES.lng.toFixed(toFixedDigit)}`;

const onMapLoad =() => {
  switchCondition();
};

const map = L.map('map-canvas');

const loadMap = (cb) => {
  map.on('load', () => {
    cb();
  })
    .setView({
      lat: DEFAULT_COORDINATES.lat,
      lng: DEFAULT_COORDINATES.lng,
    }, MAP_ZOOM);
};


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: MAP_ZOOM,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Создание основной метки
const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_URL,
  iconSize: mainPinIconSize,
  iconAnchor: mainPinIconAnchor,
});

const marker = L.marker(
  {
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

//Создание метки объявления
const adIcon = L.icon({
  iconUrl: AD_ICON_URL,
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

//При остановке движения основной метки координаты отображаются в поле "Адрес"
marker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(toFixedDigit)}, ${coordinates.lng.toFixed(toFixedDigit)}`;
});

const renderMarkers = (offers) => {
  offers
    .slice(0, SIMILAR_AD_COUNT)
    .forEach((point) => {createMarker(point);});
};

const resetMap = () => map.setView({
  lat: DEFAULT_COORDINATES.lat,
  lng: DEFAULT_COORDINATES.lng,
}, MAP_ZOOM);

const resetMarker = () => {
  address.value= `${DEFAULT_COORDINATES.lat.toFixed(toFixedDigit)}, ${DEFAULT_COORDINATES.lng.toFixed(toFixedDigit)}`;
  marker.setLatLng({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  });
};

const removeMarker = () => {
  layerGroup.clearLayers();
};

loadMap(() => {
  onMapLoad(); // При успешной загрузке карты форма "Ваше объявление" переключается в активное состояние
});

export {renderMarkers, resetMarker, resetMap, removeMarker};


