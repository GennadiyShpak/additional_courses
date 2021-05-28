import refs from './refs.js';
import sliderObj from '../components/slider/slider.js';
import throttle from '../helpers/throttle.js';

const { Carousel } = sliderObj;
const { sliderItems, prevBtn, nextBtn, sliderList } = refs;
const testimonialsSlider = new Carousel(sliderItems, sliderList, 4000);
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
    testimonialsSlider.grovingSlideHanler(sliderItems);
    return false;
  }
  testimonialsSlider.decreasingSliderHandler(sliderItems);
};
let onScroll = () => {
  const scrollTop = window.pageYOffset;
  const viewportWidth = document.documentElement.clientWidth;
  if (viewportWidth >= 992) {
    if ((scrollTop < 1990 || scrollTop > 3350) && activeSlide) {
      clearInterval(testimonialsSlider.intervalId);
      activeSlide = false;
    }
    if (scrollTop >= 1990 && scrollTop <= 3350 && !activeSlide) {
      testimonialsSlider.infinitySliderRight();
      activeSlide = true;
    }
  }
  if (viewportWidth < 992 && viewportWidth >= 768) {
    if (scrollTop < 1870 && activeSlide) {
      clearInterval(testimonialsSlider.intervalId);
      activeSlide = false;
    }
    if (scrollTop >= 1870 && !activeSlide) {
      testimonialsSlider.infinitySliderRight();
      activeSlide = true;
    }
  }
  if (viewportWidth < 768) {
    if (scrollTop < 2250 && activeSlide) {
      clearInterval(testimonialsSlider.intervalId);
      activeSlide = false;
    }
    if (scrollTop >= 2250 && !activeSlide) {
      testimonialsSlider.infinitySliderRight();
      activeSlide = true;
    }
  }
};

onScroll = throttle(onScroll, 500);

nextBtn.addEventListener('click', () => {
  clearInterval(testimonialsSlider.intervalId);
  testimonialsSlider.grovingSlideHanler();
  testimonialsSlider.infinitySliderRight();
});

prevBtn.addEventListener('click', () => {
  clearInterval(testimonialsSlider.intervalId);
  testimonialsSlider.decreasingSliderHandler();
  testimonialsSlider.infinitySliderLeft();
});

sliderList.addEventListener('mouseenter', () => {
  clearInterval(testimonialsSlider.intervalId);
});

sliderList.addEventListener('mouseleave', () => {
  testimonialsSlider.infinitySliderRight();
});

sliderList.addEventListener('touchstart', handleTouchStart);
sliderList.addEventListener('touchend', handleTouchEnd);

window.addEventListener('scroll', onScroll);
