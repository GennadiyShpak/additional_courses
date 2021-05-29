import refs from './refs.js';
import sliderObj from '../components/slider/slider.js';

const { PortfoliSlider } = sliderObj;
const { sliderItems, leftBtn, rightBtn } = refs;
const portfolioSlider = new PortfoliSlider(sliderItems, leftBtn, rightBtn);

leftBtn.addEventListener('click', () => {
  portfolioSlider.sliderToLeft();
});
rightBtn.addEventListener('click', () => {
  portfolioSlider.sliderToRight();
});
