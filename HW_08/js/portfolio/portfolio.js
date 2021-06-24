import refs from './refs.js';
import sliderObj from '../components/slider/slider.js';
import throttle from '../helpers/throttle.js';

const { PortfoliSlider } = sliderObj;
const { sliderItems, leftBtn, rightBtn } = refs;
const portfolioSlider = new PortfoliSlider(sliderItems, 4000);
portfolioSlider.infinitySliderRight();

let onSliderRightBtnClick = () => {
  clearInterval(portfolioSlider.intervalId);
  portfolioSlider.sliderToRight();
  portfolioSlider.infinitySliderRight();
};

let onSliderLeftBtnClick = () => {
  clearInterval(portfolioSlider.intervalId);
  portfolioSlider.sliderToLeft();
  portfolioSlider.infinitySliderLeft();
};
onSliderRightBtnClick = throttle(onSliderRightBtnClick, 1000);
onSliderLeftBtnClick = throttle(onSliderLeftBtnClick, 1000);

leftBtn.addEventListener('click', onSliderRightBtnClick);
rightBtn.addEventListener('click', onSliderLeftBtnClick);
