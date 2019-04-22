class Slider {
  constructor(sliderId, minText, maxText) {
    this.containerDom = document.getElementById(sliderId);
    this.sliderDom = document.getElementById(sliderId + 'Range');
    this.sliderDom.disabled = !this.containerDom.classList.contains('on');
    this.min = parseInt(this.sliderDom.min);
    this.max = parseInt(this.sliderDom.max);
    this.step = parseInt(this.sliderDom.step);
    this.sizing = this.sliderDom.getBoundingClientRect().width;

    var minDiv = document.createElement('div');
    var maxDiv = document.createElement('div');
    var midDiv = document.createElement('div');
    minDiv.classList.add('foot');
    minDiv.classList.add('min');
    maxDiv.classList.add('foot');
    maxDiv.classList.add('max');
    midDiv.classList.add('foot');
    midDiv.classList.add('mid');
    minDiv.innerText = minText || 'low';
    maxDiv.innerText = maxText || 'high';
    midDiv.innerText = 'medium';
    this.containerDom.insertBefore(minDiv, this.sliderDom);
    this.containerDom.insertBefore(midDiv, this.sliderDom);
    this.containerDom.insertBefore(maxDiv, this.sliderDom);

    var fillDiv = document.createElement('div');
    fillDiv.id = sliderId + 'Fill';
    fillDiv.classList.add('left');
    this.containerDom.insertBefore(fillDiv, this.sliderDom);
    this.fillDiv = document.getElementById(sliderId + 'Fill');

    var trackDiv = document.createElement('div');
    trackDiv.classList.add('track');
    this.containerDom.insertBefore(trackDiv, this.sliderDom);

    var tipDiv = document.createElement('div');
    tipDiv.id = sliderId + 'Tip';
    tipDiv.classList.add('slider-tip');
    this.containerDom.insertBefore(tipDiv, this.sliderDom);
    this.tipDiv = document.getElementById(sliderId + 'Tip');
    this.tipWidth = this.tipDiv.getBoundingClientRect().width;

    this.tipDiv.innerText = this.sliderDom.value;
    this.tipDiv.style.left = this.getPosition() + 'px';
    this.fillDiv.style.width =
      this.getPercent() * (this.sizing - 16) + 8 + 'px';

    var that = this;

    this.sliderDom.addEventListener('input', function(e) {
      that.updateValue();
    });
  }
  getPercent() {
    return (this.sliderDom.value - this.min) / (this.max - this.min);
  }
  getPosition() {
    this.tipWidth = this.tipDiv.getBoundingClientRect().width;
    return this.getPercent() * (this.sizing - 16) - this.tipWidth / 2 + 8;
  }
  updateValue() {
    this.sizing = this.sliderDom.getBoundingClientRect().width;
    this.tipDiv.innerText = this.sliderDom.value;
    this.tipDiv.style.left = this.getPosition() + 'px';
    this.fillDiv.style.width =
      this.getPercent() * (this.sizing - 16) + 8 + 'px';
  }
  handleResize() {
    // this.updateValue();
  }
  handleMouseMove() {
    if (!this.containerDom.classList.contains('on')) {
      return;
    }
    // if (mouseIsDown) {
    //   this.updateValue();
    // }
  }
}
