const cbConfig = {
  ringWeight: 6,
  ringColor: '#2b2b2b',
  canvasW: 300,
  pointRadius: 8,
  waveGap: 8,
  ringRadius: 138,
  dotCount: 7,
  /* Side Right, Front Right, Center, Front Left, Side Left, Rear Right, Rear Left */
  initData: [0, -60, -90, -120, -180, 60, 120],
  dynamData: [0, -60, -90, -120, -180, 60, 120],
  marginTop: 8,
  dataRange: [
    { min: -30, max: 30 },
    { min: -75, max: -30 },
    { min: -105, max: -75 },
    { min: -150, max: -105 },
    { min: 150, max: -150 }, // special case
    { min: 30, max: 90 },
    { min: 90, max: 150 },
  ],
};
class Calibrator {
  constructor(canvasId, config) {
    this.debugMode = false;

    var hiResCanvas = createHiDPICanvas(canvasId, 300, 300);
    let wrapperDom = document.getElementById('cbCanvasRow');
    let refDom = document.getElementById(canvasId + 'Ref');
    hiResCanvas.classList.add('cb-canvas');
    wrapperDom.insertBefore(hiResCanvas, refDom);

    this.context = document.getElementById(canvasId).getContext('2d');
    this.context.save();
    this.opt = config;
    this.toggleAnimation = false;
    this.togglePie = false;
    this.waveDirection = 'up';
    this.eventPoint = -1;
    this.activeIndex = -1;
    this.hoverArea = -1;
    this.dom = document.getElementById(canvasId);

    this.refreshCenter();
  }
  refreshCenter() {
    let rect = this.dom.getBoundingClientRect();
    let top = rect.top;
    let left = rect.left;

    this.center = {
      x: left + this.opt.canvasW / 2,
      y: top + this.opt.canvasW / 2,
    };
  }
  drawRing() {
    let ctx = this.context;

    ctx.save();

    var glow = ctx.createRadialGradient(
      this.opt.canvasW / 2,
      this.opt.canvasW / 2,
      this.opt.ringRadius / 2,
      this.opt.canvasW / 2,
      this.opt.canvasW / 2,
      this.opt.ringRadius
    );

    glow.addColorStop(0.7, '#111');
    glow.addColorStop(1, '#1b1b1b');

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(
      this.opt.canvasW / 2,
      this.opt.canvasW / 2,
      this.opt.ringRadius,
      0,
      fullRadian(),
      false
    );
    ctx.fill();

    ctx.lineWidth = this.opt.ringWeight * 2;
    ctx.strokeStyle = this.opt.ringColor;
    ctx.beginPath();
    ctx.arc(
      this.opt.canvasW / 2,
      this.opt.canvasW / 2,
      this.opt.ringRadius,
      0,
      fullRadian(),
      false
    );
    ctx.stroke();
  }
  drawDivider(x) {
    let ctx = this.context;
    ctx.restore();
    ctx.save();
    ctx.translate(this.opt.canvasW / 2, this.opt.canvasW / 2);
    ctx.rotate(degreeToRadian(x));
    ctx.translate(this.opt.ringRadius + this.opt.ringWeight, 0);

    ctx.beginPath();
    ctx.moveTo(1, 0);
    ctx.lineTo(-17, 0);
    ctx.stroke();
  }
  drawDividers() {
    let ctx = this.context;
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.save();

    var splitDegrees = [0, 60, 120, 180, 225, 255, 300];
    for (var i = 0; i < splitDegrees.length; i++) {
      this.drawDivider(splitDegrees[i] + 30);
    }

    ctx.restore();
  }
  drawDefault(x) {
    let ctx = this.context;
    ctx.restore();
    ctx.save();
    ctx.translate(this.opt.canvasW / 2, this.opt.canvasW / 2);
    ctx.rotate(degreeToRadian(x));
    ctx.translate(this.opt.ringRadius, 0);

    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(-13, 0);
    ctx.stroke();
  }
  drawDefaults() {
    let ctx = this.context;
    ctx.strokeStyle = '#3f3f3f';
    ctx.lineWidth = 2;
    ctx.save();

    var splitDegrees = [30, 90, 150, 210, 240, 270, 330];
    for (var i = 0; i < splitDegrees.length; i++) {
      this.drawDefault(splitDegrees[i] + 30);
    }

    ctx.restore();
  }
  drawPoint(index = 0, d = this.opt.dynamData[0], color = '#666') {
    var waveColor = '#3f3f3f';
    var startLower = 5;
    var endHigher = 8;
    var aniStart = startLower;
    let ctx = this.context;

    if (this.toggleAnimation) {
      var time = new Date();
      var s = time.getMilliseconds();

      if (s % 160 < 80) {
        if (this.waveDirection == 'up') {
          aniStart++;
        } else {
          aniStart--;
        }

        if (aniStart > endHigher) {
          aniStart = endHigher;
          this.waveDirection = 'down';
        }
        if (aniStart < startLower) {
          this.waveDirection = 'up';
          aniStart = startLower;
        }
      }
    }

    ctx.restore();
    ctx.save();
    ctx.translate(this.opt.canvasW / 2, this.opt.canvasW / 2);
    ctx.rotate(degreeToRadian(d));
    ctx.translate(this.opt.ringRadius, 0);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, this.opt.pointRadius + 0.3, 0, fullRadian(), false);
    ctx.fill();

    ctx.strokeStyle = '#3f3f3f';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.lineTo(-8.3, 0);
    ctx.stroke();

    ctx.strokeStyle = waveColor;
    ctx.lineWidth = 2;

    var colorAlpha = 1;

    for (var x = 1; x <= 13; x++) {
      ctx.beginPath();

      if (
        (this.eventPoint >= 0 &&
          index == this.eventPoint &&
          this.toggleAnimation) ||
        (this.activeIndex >= 0 &&
          index == this.activeIndex &&
          this.toggleAnimation)
      ) {
        waveColor = 'rgba(' + '63, 63, 63' + ', ' + (1 - x * (1 / 13)) + ')';

        if (isBetween(x, aniStart, aniStart + 4)) {
          colorAlpha = 1 - (x - aniStart) * 0.2;
          waveColor = 'rgba(' + mainColorRgba + ', ' + colorAlpha + ')';
        } else if (x < aniStart) {
          colorAlpha = 1;
          waveColor = 'rgba(' + mainColorRgba + ', ' + colorAlpha + ')';
        }
      } else {
        waveColor = 'rgba(' + '63, 63, 63' + ', ' + (1 - x * (1 / 13)) + ')';
      }

      ctx.strokeStyle = waveColor;
      ctx.arc(
        20,
        0,
        this.opt.pointRadius + 20 + this.opt.waveGap * x,
        degreeToRadian(-180 - 10),
        degreeToRadian(-180 + 10),
        false
      );
      ctx.stroke();
    }
  }
  updatePoint(index = 0, d = this.opt.dynamData[0], color = '#666') {
    // d ranges from -180 to 179
    this.slicePie(this.hoverArea);
    d = this.controlRange(index, d);
    this.opt.dynamData[index] = d;

    this.drawDividers();
    this.drawDefaults();

    for (var x = 0; x <= 6; x++) {
      if (index == x) {
        this.drawPoint(x, this.opt.dynamData[x], color);
      } else {
        this.drawPoint(x, this.opt.dynamData[x], '#666');
      }
    }
  }
  handleSound(e) {
    if (this.toggleAnimation) {
      // console.log('play sound');
    } else {
      // console.log('stop sound');
    }
  }
  getEventPoint(e) {
    this.refreshCenter();

    var x = e.x - this.center.x;
    var y = -(e.y - this.center.y);

    var hasPoint = -1;

    if (
      Math.pow(x, 2) + Math.pow(y, 2) <=
      Math.pow(this.opt.ringRadius - this.opt.pointRadius, 2)
    ) {
      this.dom.style.cursor = 'default';
    } else if (
      Math.pow(x, 2) + Math.pow(y, 2) <=
      Math.pow(this.opt.ringRadius + this.opt.pointRadius, 2)
    ) {
      for (var i = 0; i <= 6; i++) {
        var pointEdgeY = Math.floor(
          Math.sin(degreeToRadian(this.opt.dynamData[i])) * this.opt.ringRadius
        );
        pointEdgeY = -pointEdgeY;
        var pointEdgeX = Math.floor(
          Math.cos(degreeToRadian(this.opt.dynamData[i])) * this.opt.ringRadius
        );

        if (
          isBetween(
            x,
            pointEdgeX - this.opt.pointRadius,
            pointEdgeX + this.opt.pointRadius
          ) &&
          isBetween(
            y,
            pointEdgeY - this.opt.pointRadius,
            pointEdgeY + this.opt.pointRadius
          )
        ) {
          hasPoint = i;
        }
      }

      if (hasPoint < 0) {
        this.dom.style.cursor = 'default';
      } else {
        this.dom.style.cursor = 'pointer';
      }
    } else {
    }

    return hasPoint;
  }
  getEventDegree(e) {
    this.refreshCenter();

    var x = e.x - this.center.x;
    var y = e.y - this.center.y;
    var d = 0;

    if (x != 0) {
      var atan = Math.atan(y / x);
      d = radianToDegree(atan);
    } else {
      if (y < 0) {
        d = -90;
      } else {
        d = 90;
      }
    }

    if (x < 0 && y <= 0) {
      d = d - 180;
    }
    if (x < 0 && y >= 0) {
      d = d + 180;
    }
    if (d == 0 && x < 0) {
      d = -180;
    }

    return d;
  }
  getEventIndex(e) {
    this.refreshCenter();

    var hoverArea = -1;

    var x = e.x - this.center.x;
    var y = -(e.y - this.center.y);

    if (
      Math.pow(x, 2) + Math.pow(y, 2) <=
      Math.pow(this.opt.ringRadius - this.opt.pointRadius, 2)
    ) {
      var eventDegree = this.getEventDegree(e);

      for (var i = 0; i <= 6; i++) {
        if (i != 4) {
          if (
            eventDegree <= this.opt.dataRange[i].max &&
            eventDegree >= this.opt.dataRange[i].min
          ) {
            hoverArea = i;
          }
        } else {
          if (eventDegree < 0 && eventDegree <= this.opt.dataRange[i].max) {
            hoverArea = i;
          }
          if (eventDegree > 0 && eventDegree >= this.opt.dataRange[i].min) {
            hoverArea = i;
          }
        }
      }
    }
    return hoverArea;
  }
  clearCanvas() {
    let ctx = this.context;
    ctx.restore();
    ctx.clearRect(0, 0, this.opt.canvasW, this.opt.canvasW);
    this.drawRing();
  }
  slicePie(hoverArea) {
    if (!this.togglePie) return;

    if (this.hoverArea < 0) return;

    let ctx = this.context;

    ctx.save();
    ctx.beginPath();

    var glow = ctx.createRadialGradient(
      this.opt.canvasW / 2,
      this.opt.canvasW / 2,
      this.opt.ringRadius / 2,
      this.opt.canvasW / 2,
      this.opt.canvasW / 2,
      this.opt.ringRadius
    );

    glow.addColorStop(0.3, 'rgba(' + mainColorRgba + ',0)');
    glow.addColorStop(1, 'rgba(' + mainColorRgba + ',0.3)');

    ctx.fillStyle = glow;

    ctx.beginPath();
    ctx.moveTo(this.opt.canvasW / 2, this.opt.canvasW / 2);
    ctx.arc(
      this.opt.canvasW / 2,
      this.opt.canvasW / 2,
      this.opt.ringRadius - this.opt.ringWeight,
      degreeToRadian(this.opt.dataRange[this.hoverArea].min),
      degreeToRadian(this.opt.dataRange[this.hoverArea].max),
      false
    );
    ctx.lineTo(this.opt.canvasW / 2, this.opt.canvasW / 2);
    ctx.fill();
  }
  animateWave() {
    if (this.eventPoint >= 0 && this.toggleAnimation) {
      this.clearCanvas();
      this.updatePoint(
        this.eventPoint,
        this.opt.dynamData[this.eventPoint],
        mainColor
      );
      window.requestAnimationFrame(animateOn);
    } else if (this.activeIndex >= 0 && this.toggleAnimation) {
      this.clearCanvas();
      this.updatePoint(
        this.activeIndex,
        this.opt.dynamData[this.activeIndex],
        mainColor
      );
      window.requestAnimationFrame(animateOn);
    }
  }
  controlRange(index, d) {
    if (index != 4) {
      if (d >= this.opt.dataRange[index].max) {
        d = this.opt.dataRange[index].max;
      }
      if (d <= this.opt.dataRange[index].min) {
        d = this.opt.dataRange[index].min;
      }
    } else {
      if (d == 0) {
        d = -180;
      }
      if (d < 0 && d >= this.opt.dataRange[index].max) {
        d = this.opt.dataRange[index].max;
      }
      if (d > 0 && d <= this.opt.dataRange[index].min) {
        d = this.opt.dataRange[index].min;
      }
    }
    return d;
  }
  spitData() {
    var data = [];
    for (var i = 0; i < 7; i++) {
      data[i] =
        this.opt.dynamData[i] + 90 >= 180
          ? this.opt.dynamData[i] + 90 - 360
          : this.opt.dynamData[i] + 90;
    }
    return data;
  }
  printData() {
    if (this.debugMode) {
      document.getElementById('cbDebug').style.display = 'block';
      var data = this.spitData();
      for (var i = 0; i < this.opt.dotCount; i++) {
        document.getElementsByClassName('cb-data-' + i)[0].innerText = data[i];
      }
    }
  }
  debug() {
    this.debugMode = true;
    this.printData();
  }
  getInitData() {
    return [0, -60, -90, -120, -180, 60, 120];
  }
  resetData() {
    this.toggleAnimation = false;
    this.handleSound();
    this.opt.dynamData = this.getInitData();
    this.clearCanvas();
    this.updatePoint();

    var steppers = document.getElementsByClassName('stepper');

    for (var i = 0; i < steppers.length; i++) {
      let stepperId = steppers[i].id;
      let valueDom = document.getElementById(stepperId + 'Value');
      valueDom.value = '+5';
      let iconDom = valueDom.previousElementSibling;
      iconDom.style.backgroundImage = "url('./assets/img_ui/icon_audio_3.svg')";
    }
    return;
  }
  handleMouseDown(e) {
    this.eventPoint = this.getEventPoint(e);

    if (this.eventPoint >= 0) {
      this.activeIndex = -1;
      this.toggleAnimation = true;
      this.handleSound();
      window.requestAnimationFrame(animateOn);
    } else {
      var newIndex = this.getEventIndex(e);

      if (newIndex == -1) return;

      document.getElementById('cbTest').classList.toggle('stop');

      if (newIndex == this.activeIndex) {
        this.toggleAnimation = !this.toggleAnimation;
        this.handleSound();
        if (!this.toggleAnimation) return;
      } else {
        this.activeIndex = newIndex;
        this.toggleAnimation = true;
        this.handleSound();
      }

      window.requestAnimationFrame(animateOn);
    }
  }
  playTest(x) {
    this.eventPoint = x;
    this.activeIndex = -1;
    this.toggleAnimation = true;
    this.handleSound();
    window.requestAnimationFrame(animateOn);
  }
  handleMouseMove(e) {
    var hoverPoint = this.getEventPoint(e);
    this.hoverArea = this.getEventIndex(e);
    if (!mouseIsDown) {
      this.clearCanvas();
      if (hoverPoint >= 0) {
        this.updatePoint(hoverPoint, this.opt.dynamData[hoverPoint], mainColor);
        this.dom.style.cursor = 'pointer';
      } else {
        this.togglePie = true;
        this.updatePoint();
        this.dom.style.cursor = 'default';
      }

      return;
    }

    if (mouseIsDown && this.eventPoint >= 0) {
      this.togglePie = false;
    }

    if (this.eventPoint < 0) return;

    this.toggleAnimation = true;

    var newRadians = this.getEventDegree(e);
    this.clearCanvas();
    this.updatePoint(this.eventPoint, newRadians, mainColor);
  }
  handleMouseClick(e) {
    //
  }
  handleMouseUp(e) {
    if (mouseIsDown && e.target.classList.contains('cb-reset')) {
      this.resetData();
    }

    if (mouseIsDown) {
      this.handleMouseClick(e);
    }
    if (this.eventPoint >= 0) {
      this.toggleAnimation = false;
      this.handleSound();
      this.eventPoint = -1;
    }
    this.clearCanvas();
    this.updatePoint();
  }
  init() {
    this.drawRing();
    this.drawDividers();
    this.drawDefaults();

    for (var x = 0; x <= this.opt.dotCount - 1; x++) {
      this.drawPoint(x, this.opt.initData[x]);
    }
  }
}
/* audio stepper */
function stepperClick(e) {
  let target = e.target;
  let stepperId = target.parentElement.id;
  if (!stepperId) return;

  let stepperInput = document.getElementById(stepperId + 'Value');

  let value = stepperInput.value;

  if (target.classList.contains('up')) {
    value++;
  }
  if (target.classList.contains('down')) {
    value--;
  }

  stepperInput.value = value;
  handleInput(stepperId + 'Value');
}
function handleInput(inputDivId) {
  let inputElem = document.getElementById(inputDivId);
  let value = parseInt(inputElem.value);

  if (Number.isNaN(value)) {
    value = 0;
  }

  let iconDom = inputElem.previousElementSibling;

  if (value > 12) value = 12;
  if (value < -12) value = -12;

  if (value > 0) value = '+' + value * 1;

  if (-12 <= value && value <= -5) {
    iconDom.style.backgroundImage = "url('./assets/img_ui/icon_audio_1.svg')";
  } else if (-4 <= value && value <= 4) {
    iconDom.style.backgroundImage = "url('./assets/img_ui/icon_audio_2.svg')";
  } else {
    iconDom.style.backgroundImage = "url('./assets/img_ui/icon_audio_3.svg')";
  }
  inputElem.value = value;
}
var steppers = document.getElementsByClassName('stepper');
for (var i = 0; i < steppers.length; i++) {
  let stepperId = steppers[i].id;
  let stepper = document.getElementById(stepperId);
  let stepperInput = document.getElementById(stepperId + 'Value');

  stepper.addEventListener('click', function(e) {
    stepperInput.focus();
    stepperInput.select();
    stepperClick(e);
  });

  stepperInput.addEventListener('blur', function(e) {
    handleInput(stepperInput.id);
  });

  stepperInput.addEventListener('keydown', function(event) {
    if (event.keyCode == 13 || event.keyCode == 27) {
      handleInput(stepperInput.id);
      stepperInput.blur();
    }
  });
}

/* calibration test */

var testInterval;
function startTest() {
  // document.getElementById('cbTest').innerText = 'stop';
  document.getElementById('cbTest').classList.add('stop');
  testStart = true;
  cb.playTest(2);
  testInterval = setInterval(function() {
    runTest();
  }, 1500);
}

function stopTest() {
  // document.getElementById('cbTest').innerText = 'listen';
  document.getElementById('cbTest').classList.remove('stop');
  testStart = false;
  playIndex = 1;
  cb.handleMouseUp();
  clearInterval(testInterval);
}

var handleTest = function() {
  if (
    !testStart &&
    document.getElementById('cbTest').classList.contains('stop')
  ) {
    document.getElementById('cbTest').classList.remove('stop');
    cb.toggleAnimation = false;
    cb.handleSound();
    cb.handleMouseUp();
    return;
  }

  testStart = !testStart;
  if (testStart) {
    startTest();
  } else {
    stopTest();
  }
};

document.getElementById('cbTest').addEventListener('click', handleTest);
