function Slider(collection) {
  this.sliderPosition = 0;
  this.sliderArr = [...collection];
  this.sliderLength = this.sliderArr.length;
  this.lastSlide = this.sliderLength - 1;

  this.sliderToLeft = function () {
    this.sliderPosition -= 1;
    if (this.sliderPosition < 0) {
      this.sliderPosition = this.lastSlide;
    }
  };
  this.sliderToRight = function () {
    this.sliderPosition += 1;
    if (this.sliderPosition === this.sliderLength) {
      this.sliderPosition = 0;
    }
  };
}

function Carousel(collection, el, int) {
  Slider.apply(this, arguments);
  this.parentToLeft = this.sliderToLeft;
  this.parentToRight = this.sliderToRight;
  this.intervalId = null;
  let direction = 'right';
  const createPresentationMarckup = (parent, i) => {
    if (i === 0) {
      parent.insertAdjacentHTML(
        'beforeend',
        `
      <li class="presentation__item presentation__item-unactive presentation__item-active " data-index=${i}>
      </li>
      `,
      );
    } else {
      parent.insertAdjacentHTML(
        'beforeend',
        `
    <li class="presentation__item presentation__item-unactive " data-index=${i}>
    </li>
    `,
      );
    }
  };
  const createSliderDots = function (elem) {
    const presentationWrapper = document.createElement('ul');
    presentationWrapper.classList.add(
      'presentation__list',
      'd-flex',
      'justify-content-center',
    );
    elem.after(presentationWrapper);
    for (let i = 0; i < collection.length; i += 1) {
      createPresentationMarckup(presentationWrapper, i);
    }
  };
  const onPresentationItemCliclHandler = ({ target }) => {
    const { index } = target.dataset;
    clearInterval(this.intervalId);
    presentationCollection[this.sliderPosition].classList.remove(
      'presentation__item-active',
    );
    this.sliderArr[this.sliderPosition].style.transform = 'scale(0)';
    this.sliderPosition = Number(index);
    this.sliderArr[index].style.transform = 'scale(1)';
    target.classList.add('presentation__item-active');
    if (direction === 'right') {
      this.infinitySliderRight();
    }
    if (direction === 'left') {
      this.infinitySliderLeft();
    }
  };
  createSliderDots(el);
  const presentationCollection = document.querySelectorAll(
    '.presentation__item',
  );
  [...presentationCollection].forEach(item =>
    item.addEventListener('click', onPresentationItemCliclHandler),
  );
  this.sliderToLeft = function () {
    this.parentToLeft.call(this);
    if (this.sliderPosition === this.lastSlide) {
      this.sliderArr[this.sliderPosition].style.transform = 'scale(1)';
      this.sliderArr[0].style.transform = 'scale(0)';
      presentationCollection[this.sliderPosition].classList.add(
        'presentation__item-active',
      );
      presentationCollection[0].classList.remove('presentation__item-active');
    } else {
      this.sliderArr[this.sliderPosition].style.transform = 'scale(1)';
      this.sliderArr[this.sliderPosition + 1].style.transform = 'scale(0)';
      presentationCollection[this.sliderPosition].classList.add(
        'presentation__item-active',
      );
      presentationCollection[this.sliderPosition + 1].classList.remove(
        'presentation__item-active',
      );
    }
  };
  this.sliderToRight = function () {
    this.parentToRight.call(this);
    if (this.sliderPosition === 0) {
      this.sliderArr[0].style.transform = 'scale(1)';
      this.sliderArr[this.lastSlide].style.transform = 'scale(0)';
      presentationCollection[0].classList.add('presentation__item-active');
      presentationCollection[this.lastSlide].classList.remove(
        'presentation__item-active',
      );
    } else {
      this.sliderArr[this.sliderPosition].style.transform = 'scale(1)';
      this.sliderArr[this.sliderPosition - 1].style.transform = 'scale(0)';
      presentationCollection[this.sliderPosition].classList.add(
        'presentation__item-active',
      );
      presentationCollection[this.sliderPosition - 1].classList.remove(
        'presentation__item-active',
      );
    }
  };
  this.infinitySliderRight = function () {
    direction = 'right';
    this.intervalId = setInterval(() => {
      this.sliderToRight(collection);
    }, int);
  };
  this.infinitySliderLeft = function () {
    direction = 'left';
    this.intervalId = setInterval(() => {
      this.sliderToLeft(collection);
    }, int);
  };
}

function PortfoliSlider(collection) {
  Slider.apply(this, arguments);
  console.log(document.documentElement.clientWidth);
  this.parentSliderToRight = this.sliderToRight;
  this.sliderToRight = function () {
    this.sliderToRight.call(this);
    if (this.sliderPosition === 0) {
      this.sliderArr[0].style.transform = 'scale(1)';
      this.sliderArr[this.lastSlide].style.transform = 'scale(0)';
    } else {
      this.sliderArr[this.sliderPosition].style.left = '0px';
      this.sliderArr[this.sliderPosition + 1].style.left = '400px';
    }
  };
  // this.sliderToLeft = function () {
  //   this.sliderToLeft();
  //   // if (this.sliderPosition === 3) {
  //   //   this.sliderArr[this.sliderPosition].style.transform = 'scale(1)';
  //   //   this.sliderArr[0].style.transform = 'scale(0)';
  //   // } else {
  //   // if ()
  //   console.log(this.sliderPosition + 1);
  //   this.sliderArr[this.sliderPosition].style.left = '0px';
  //   // this.sliderArr[this.sliderPosition + 1].style.left = '400px';
  //   // this.sliderArr[this.sliderPosition + 2].style.right = '0px';
  //   // }
  // };
}

const sliderObj = {
  Carousel,
  PortfoliSlider,
};
export default sliderObj;
// const createPresentationMarckup = (parent, img) => {
//   // parent.insertAdjacentHTML(
//   //   'beforeend',
//   //   `
//   // <li class="presentation__item></li>
//   // `,
//   // );
//   console.log(img.src);
// };
// this.createPresentation = function (imageCollection, sibling) {
//   const presentationWrapper = document.createElement('ul');
//   sibling.after(presentationWrapper);
//   [...imageCollection].forEach(img =>
//     createPresentationMarckup(presentationWrapper, img),
//   );
// };
