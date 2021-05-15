import refs from './refs.js';
const { sliderCollection, prevBtn, nextBtn } = refs;

let sliderPosition = 0;

function grovingSliderHanler(collection) {
  const sliderArr = [...collection];
  const sliderLength = sliderArr.length;
  const lastSlide = sliderArr.length - 1;
  sliderPosition += 1;
  if (sliderPosition === sliderLength) {
    sliderArr[0].style.transform = 'scale(1)';
    sliderArr[lastSlide].style.transform = 'scale(0)';
    sliderPosition = 0;
    return;
  }
  sliderArr[sliderPosition].style.transform = 'scale(1)';
  sliderArr[sliderPosition - 1].style.transform = 'scale(0)';
}

function decreasingSliderHandler(collection) {
  const sliderArr = [...collection];
  const lastSlide = sliderArr.length - 1;
  sliderPosition -= 1;
  if (sliderPosition < 0) {
    sliderArr[lastSlide].style.transform = 'scale(1)';
    sliderArr[0].style.transform = 'scale(0)';
    sliderPosition = lastSlide;
    return;
  }
  sliderArr[sliderPosition].style.transform = 'scale(1)';
  sliderArr[sliderPosition + 1].style.transform = 'scale(0)';
}

let timerId = setInterval(() => {
  grovingSliderHanler(sliderCollection);
}, 4000);
prevBtn.addEventListener('click', () => {
  grovingSliderHanler(sliderCollection);
});
nextBtn.addEventListener('click', () => {
  decreasingSliderHandler(sliderCollection);
});
