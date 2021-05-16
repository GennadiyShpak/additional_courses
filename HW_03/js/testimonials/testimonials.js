import refs from './refs.js';
import Slider from './slider.js';

const { sliderItems, prevBtn, nextBtn, sliderList } = refs;
const testimonialsSlider = new Slider();

let startTouchPosition = null;

// let timerId = setInterval(() => {
//   testimonialsSlider.grovingSliderHanler(sliderItems);
// }, 4000);

nextBtn.addEventListener('click', () => {
  clearInterval(timerId);
  testimonialsSlider.grovingSliderHanler(sliderItems);
  timerId = setInterval(() => {
    testimonialsSlider.grovingSliderHanler(sliderItems);
  }, 4000);
});

prevBtn.addEventListener('click', () => {
  clearInterval(timerId);
  testimonialsSlider.decreasingSliderHandler(sliderItems);
  timerId = setInterval(() => {
    testimonialsSlider.decreasingSliderHandler(sliderItems);
  }, 4000);
});

sliderList.addEventListener('mouseenter', () => {
  clearInterval(timerId);
});

sliderList.addEventListener('mouseleave', () => {
  timerId = setInterval(() => {
    testimonialsSlider.grovingSliderHanler(sliderItems);
  }, 4000);
});

const handleTouchStart = e => {
  startTouchPosition = e.touches[0].clientX;
};
const handleTouchMove = e => {
  if (!startTouchPosition) {
    return false;
  }
  if (e.touches[0].clientX > startTouchPosition) {
    testimonialsSlider.grovingSliderHanler(sliderItems);
    return false;
  }
  testimonialsSlider.decreasingSliderHandler(sliderItems);
};

sliderList.addEventListener('touchstart', handleTouchStart);
sliderList.addEventListener('touchmove', handleTouchMove);

// window.addEventListener('scroll', e => {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   console.log(scrollTop);
// });
