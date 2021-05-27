function Slider(collection) {
  this.sliderPosition = 0;
  this.sliderArr = [...collection];
  this.sliderLength = this.sliderArr.length;
  this.lastSlide = this.sliderLength - 1;

  this.sliderToLeft = function () {
    this.sliderPosition -= 1;
  };
  this.sliderToRight = function () {
    this.sliderPosition += 1;
  };
}

function Carousel(collection) {
  Slider.apply(this, arguments);
  this.parentToLeft = this.sliderToLeft;
  this.parentToRight = this.sliderToRight;
  this.sliderToLeft = function () {
    this.parentToLeft.call(this);
    if (this.sliderPosition < 0) {
      this.sliderPosition = this.lastSlide;
    }
  };
  this.sliderToRight = function () {
    this.parentToRight.call(this);
    if (this.sliderPosition === this.sliderLength) {
      this.sliderPosition = 0;
    }
  };
}

function TestimonialsSlider(collection) {
  Carousel.apply(this, arguments);

  this.grovingSlideHanler = function () {
    this.sliderToRight();
    if (this.sliderPosition === 0) {
      this.sliderArr[0].style.transform = 'scale(1)';
      this.sliderArr[this.lastSlide].style.transform = 'scale(0)';
    } else {
      console.log(this.sliderPosition);
      this.sliderArr[this.sliderPosition].style.transform = 'scale(1)';
      this.sliderArr[this.sliderPosition - 1].style.transform = 'scale(0)';
    }
  };
  this.decreasingSliderHandler = function () {
    this.sliderToLeft();
    if (this.sliderPosition === 3) {
      this.sliderArr[this.sliderPosition].style.transform = 'scale(1)';
      this.sliderArr[0].style.transform = 'scale(0)';
    } else {
      console.log(this.sliderPosition);
      this.sliderArr[this.sliderPosition].style.transform = 'scale(1)';
      this.sliderArr[this.sliderPosition + 1].style.transform = 'scale(0)';
    }
  };
}

// function Pendulum(collection) {
//   Slider.apply(this, arguments);
//   this.parentToLeft = this.sliderToLeft;
//   this.parentToRight = this.sliderToRight;
//   this.sliderToLeft = function () {
//     this.parentToLeft.call(this);
//     if (this.sliderPosition < 0) {
//       this.sliderToRight();
//     }
//   };
//   this.sliderToRight = function () {
//     this.parentToRight.call(this);
//     if (this.sliderPosition === this.sliderLength) {
//       this.sliderToLeft();
//     }
//   };
// }
// constructor() {
//   this.sliderPosition = 0;
// }
// grovingSliderHanler(collection) {
//   const sliderArr = [...collection];
//   const sliderLength = sliderArr.length;
//   const lastSlide = sliderArr.length - 1;
//   this.sliderPosition += 1;
//   if (this.sliderPosition === sliderLength) {
//     sliderArr[0].style.transform = 'scale(1)';
//     sliderArr[lastSlide].style.transform = 'scale(0)';
//     this.sliderPosition = 0;
//     return;
//   }
//   sliderArr[this.sliderPosition].style.transform = 'scale(1)';
//   sliderArr[this.sliderPosition - 1].style.transform = 'scale(0)';
// }
// decreasingSliderHandler(collection) {
//   const sliderArr = [...collection];
//   const lastSlide = sliderArr.length - 1;
//   this.sliderPosition -= 1;
//   if (this.sliderPosition < 0) {
//     sliderArr[0].style.transform = 'scale(0)';
//     sliderArr[lastSlide].style.transform = 'scale(1)';
//     this.sliderPosition = lastSlide;
//     return;
//   }
//   sliderArr[this.sliderPosition].style.transform = 'scale(1)';
//   sliderArr[this.sliderPosition + 1].style.transform = 'scale(0)';
// }
export default TestimonialsSlider;
