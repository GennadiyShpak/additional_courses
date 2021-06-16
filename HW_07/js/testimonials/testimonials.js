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
    testimonialsSlider.sliderToRight(sliderItems);
    return false;
  }
  testimonialsSlider.sliderToLeft(sliderItems);
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
let onSliderRightBtnClick = () => {
  clearInterval(testimonialsSlider.intervalId);
  testimonialsSlider.sliderToRight();
  testimonialsSlider.infinitySliderRight();
};
let onSliderLeftBtnClick = () => {
  clearInterval(testimonialsSlider.intervalId);
  testimonialsSlider.sliderToLeft();
  testimonialsSlider.infinitySliderLeft();
};
onSliderRightBtnClick = throttle(onSliderRightBtnClick, 500);
onSliderLeftBtnClick = throttle(onSliderRightBtnClick, 500);

nextBtn.addEventListener('click', onSliderRightBtnClick);
prevBtn.addEventListener('click', onSliderLeftBtnClick);

sliderList.addEventListener('mouseenter', () => {
  clearInterval(testimonialsSlider.intervalId);
});

sliderList.addEventListener('mouseleave', () => {
  testimonialsSlider.infinitySliderRight();
});

sliderList.addEventListener('touchstart', handleTouchStart);
sliderList.addEventListener('touchend', handleTouchEnd);

window.addEventListener('scroll', onScroll);
