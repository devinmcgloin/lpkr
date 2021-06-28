const random = require('canvas-sketch-util/random');

const vibrant = {
  background: '#ededed',
  palette: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
};

const blue = {
  background: '#19263b',
  palette: [
    '#d9ed92',
    '#b5e48c',
    '#99d98c',
    '#76c893',
    '#52b69a',
    '#34a0a4',
    '#168aad',
    '#1a759f',
    '#1e6091',
    '#184e77',
  ],
};
const lux = {
  background: '#7da8bd',
  palette: [
    '#f8b31c',
    '#4e3827',
    '#273e61',
    '#c6dacd',
    '#e4b29d',
    '#d14144',
    '#f1c966',
    '#2fa292',
    '#161422',
  ],
};

const climate = {
  background: '#ededed',
  palette: [
    '#001219',
    '#005f73',
    '#0a9396',
    '#94d2bd',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226',
  ],
};

const blueAndOrange = {
  background: '#8da0a1',
  palette: ['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'],
};

const redscape = {
  background: '#ededed',
  palette: ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'],
};

const allPalettes = [blue, lux, vibrant, climate, redscape, blueAndOrange];

const randomPalette = () => {
  return allPalettes[random.rangeFloor(0, allPalettes.length)];
};

export { vibrant, lux, blue, climate, redscape, blueAndOrange, randomPalette };
