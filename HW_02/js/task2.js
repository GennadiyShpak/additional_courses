const ladder = {
  step: 0,
  showStep: function () {
    console.log(this.step);
    return this;
  },
  up: function () {
    this.step += 1;
    return this;
  },
  down: function () {
    this.step -= 1;
    return this;
  },
};
ladder.up().up().down().up().showStep();
