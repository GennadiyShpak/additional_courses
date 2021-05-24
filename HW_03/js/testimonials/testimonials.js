import refs from './refs.js';
import Slider from './slider.js';
import throttle from '../helpers/throttle.js';

const { sliderItems, prevBtn, nextBtn, sliderList } = refs;
const testimonialsSlider = new Slider();

let startTouchPosition = null;
let timerId = null;
let activeSlide = null;

const handleTouchStart = e => {
  startTouchPosition = e.touches[0].clientX;
};
const handleTouchEnd = e => {
  if (!startTouchPosition) {
    return false;
  }
  if (e.changedTouches[0].clientX > startTouchPosition) {
    testimonialsSlider.grovingSliderHanler(sliderItems);
    return false;
  }
  testimonialsSlider.decreasingSliderHandler(sliderItems);
};
let onScroll = () => {
  const scrollTop = window.pageYOffset;
  const viewportWidth = document.documentElement.clientWidth;
  if (viewportWidth >= 992) {
    if ((scrollTop < 1990 || scrollTop > 3350) && activeSlide) {
      clearInterval(timerId);
      activeSlide = false;
    }
    if (scrollTop >= 1990 && scrollTop <= 3350 && !activeSlide) {
      timerId = setInterval(() => {
        testimonialsSlider.grovingSliderHanler(sliderItems);
      }, 4000);
      activeSlide = true;
    }
  }
  if (viewportWidth < 992 && viewportWidth >= 768) {
    if (scrollTop < 1870 && activeSlide) {
      clearInterval(timerId);
      activeSlide = false;
    }
    if (scrollTop >= 1870 && !activeSlide) {
      timerId = setInterval(() => {
        testimonialsSlider.grovingSliderHanler(sliderItems);
      }, 4000);
      activeSlide = true;
    }
  }
  if (viewportWidth < 768) {
    if (scrollTop < 2250 && activeSlide) {
      clearInterval(timerId);
      activeSlide = false;
    }
    if (scrollTop >= 2250 && !activeSlide) {
      timerId = setInterval(() => {
        testimonialsSlider.grovingSliderHanler(sliderItems);
      }, 4000);
      activeSlide = true;
    }
  }
};

onScroll = throttle(onScroll, 500);

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

sliderList.addEventListener('touchstart', handleTouchStart);
sliderList.addEventListener('touchend', handleTouchEnd);

window.addEventListener('scroll', onScroll);
