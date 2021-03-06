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

function PortfoliSlider(collection, lBtn, rBtn) {
  Slider.apply(this, arguments);
  this.sliderArr.forEach((item, i) => {
    item.style.left = `${i * 400}px`;
  });
  this.parentToRight = this.sliderToRight;
  this.parentToLeft = this.sliderToLeft;
  if (this.sliderPosition === 0) {
    lBtn.disabled = true;
  }
  const handleSliderPosition = item => {
    const positionValueArr = item.style.left.split('');
    positionValueArr.splice(-2);
    return Number(positionValueArr.join(''));
  };
  this.sliderToRight = function () {
    lBtn.disabled = false;
    if (this.sliderPosition === this.lastSlide - 2) {
      rBtn.disabled = true;
    } else {
      this.sliderArr.forEach((item, i) => {
        item.style.left = `${handleSliderPosition(item) - 400}px`;
      });
      this.parentToRight.call(this);
    }
  };
  this.sliderToLeft = function () {
    rBtn.disabled = false;
    if (this.sliderPosition === 0) {
      lBtn.disabled = true;
    } else {
      this.sliderArr.forEach(item => {
        item.style.left = `${handleSliderPosition(item) + 400}px`;
      });
      this.parentToLeft.call(this);
    }
  };
}

const sliderObj = {
  Carousel,
  PortfoliSlider,
};
export default sliderObj;
