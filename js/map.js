import {switchCondition} from './form.js';
const TOKYO = { lat: 35.652832, lng: 139.839478};
const MAP_ZOOM = 13;
const L = window.L;

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
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// eslint-disable-next-line no-unused-vars
const marker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
).addTo(map);
