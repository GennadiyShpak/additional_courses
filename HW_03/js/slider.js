class Slider {
  constructor() {
    this.sliderPosition = 0;
  }
  grovingSliderHanler(collection) {
    const sliderArr = [...collection];
    const sliderLength = sliderArr.length;
    const lastSlide = sliderArr.length - 1;
    this.sliderPosition += 1;
    console.log(this.sliderPosition);
    if (this.sliderPosition === sliderLength) {
      sliderArr[0].style.transform = 'scale(1)';
      sliderArr[lastSlide].style.transform = 'scale(0)';
      this.sliderPosition = 0;
      return;
    }
    sliderArr[this.sliderPosition].style.transform = 'scale(1)';
    sliderArr[this.sliderPosition - 1].style.transform = 'scale(0)';
  }
  decreasingSliderHandler(collection) {
    const sliderArr = [...collection];
    const lastSlide = sliderArr.length - 1;
    this.sliderPosition -= 1;
    console.log(this.sliderPosition);
    if (this.sliderPosition < 0) {
      sliderArr[0].style.transform = 'scale(0)';
      sliderArr[lastSlide].style.transform = 'scale(1)';
      this.sliderPosition = lastSlide;
      return;
    }
    sliderArr[this.sliderPosition].style.transform = 'scale(1)';
    sliderArr[this.sliderPosition + 1].style.transform = 'scale(0)';
  }
}
export default Slider;
