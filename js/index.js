import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
  interval: 2000,
  // containerID: '#carousel',
  slideID: '.slide',
  // isPlaying: true
});

carousel.init();