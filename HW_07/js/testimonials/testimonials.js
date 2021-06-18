import refs from './refs.js';
import sliderObj from '../components/slider/slider.js';
import throttle from '../helpers/throttle.js';

const { Carousel } = sliderObj;
const { sliderItems, prevBtn, nextBtn, sliderList } = refs;
const testimonialsSlider = new Carousel(sliderItems, sliderList, 4000);
let startTouchPosition = null;
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
testimonialsSlider.infinitySliderRight();

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
