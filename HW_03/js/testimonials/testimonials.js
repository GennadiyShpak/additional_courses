import refs from './refs.js';
import Slider from './slider.js';

const { sliderItems, prevBtn, nextBtn, sliderList } = refs;
const testimonialsSlider = new Slider();

let startTouchPosition = null;

let timerId = null;
let activeSlide = null;

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

sliderList.addEventListener('touchstart', handleTouchStart);
sliderList.addEventListener('touchend', handleTouchEnd);

window.addEventListener('scroll', e => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log(scrollTop);
  if ((scrollTop < 2150 || scrollTop > 3350) && activeSlide) {
    console.log('aa');
    clearInterval(timerId);
    activeSlide = false;
  }
  if (scrollTop > 2150 && scrollTop < 3350 && !activeSlide) {
    console.log('bbb');
    timerId = setInterval(() => {
      testimonialsSlider.grovingSliderHanler(sliderItems);
    }, 4000);
    activeSlide = true;
  }
});
