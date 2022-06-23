import {switchCondition} from './form.js';
const LONDON = { lat: 51.505, lng: -0.09};
const MAP_ZOOM = 13;
const L = window.L;
switchCondition();

const onMapLoad =() => {
  switchCondition();
};
const map = L.map('map-canvas')
  .on('load',onMapLoad)
  .setView({
    lat: LONDON.lat,
    lng: LONDON.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// eslint-disable-next-line no-unused-vars
const marker = L.marker(
  {
    lat: LONDON.lat,
    lng: LONDON.lng,
  },
).addTo(map);
