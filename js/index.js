import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
  interval: 3000,
  // containerID: '#carousel',
  slideID: '.slide',
  isPlaying: true
});

carousel.init();