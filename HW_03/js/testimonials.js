import refs from './refs.js';
import Slider from './slider.js';

const { sliderCollection, prevBtn, nextBtn } = refs;
const testimonialsSlider = new Slider();

let timerId = setInterval(() => {
  testimonialsSlider.grovingSliderHanler(sliderCollection);
}, 4000);
prevBtn.addEventListener('click', () => {
  testimonialsSlider.grovingSliderHanler(sliderCollection);
});
nextBtn.addEventListener('click', () => {
  testimonialsSlider.decreasingSliderHandler(sliderCollection);
});
