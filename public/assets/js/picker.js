
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;

}, false);

var pickerW = 200 - 2;
var pickerH = 120 - 2;

function _rgb2Hex(rgb) { 
	var hex = Number(rgb).toString(16);
	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex;
}

function _hex2Rgb(hex) {
	return parseInt(hex,16);
}

function _splitRgb(rgbStr) {
	var rgbStr = rgbStr.substring(4, rgbStr.length-1);
	var rgbArr = rgbStr.split(',');

	return {
		r: rgbArr[0],
		g: rgbArr[1],
		b: rgbArr[2]
	};
}

function rgb2Hex(rgbStr) {
	var rgbObj = _splitRgb(rgbStr);

	var red   = _rgb2Hex(rgbObj.r);
	var green = _rgb2Hex(rgbObj.g);
	var blue  = _rgb2Hex(rgbObj.b);

	return red+green+blue;
}

function hex2Rgb(hex) {
	return {
		r: _hex2Rgb(hex.substring(0,2)),
		g: _hex2Rgb(hex.substring(2,4)),
		b: _hex2Rgb(hex.substring(4,6))
	};
}

function rgb2Hsv(red, green, blue) {
    var rr, gg, bb,
        r = red / 255,
        g = green / 255,
        b = blue / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        } else if (g === v) {
            h = (1 / 3) + rr - bb;
        } else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

class Picker {
	constructor(canvasId) {
		var pickerCanvas = createHiDPICanvas(canvasId, pickerW, pickerH);
		let refDom = document.getElementById(canvasId + 'Ref');
		let wrapperDom = refDom.parentElement;

		pickerCanvas.classList.add('picker');
		wrapperDom.insertBefore(pickerCanvas, refDom);

		this.cvs = document.getElementById(canvasId);
		this.ctx = this.cvs.getContext('2d');
		this.drop = document.getElementById('eyeDrop');
		this.darkness = document.getElementById('brightSlider');
		this.selectedRgb = 'rgb(0,255,0)';

		this.fg = document.getElementById(canvasId+'Fg');
		this.fgCtx = this.fg.getContext('2d');

		this.tb = document.getElementById('toBlack');
		this.tbCtx = this.tb.getContext('2d');

		this.wrapper = document.getElementById('colorPicker');

		this.clickedOnPicker = false;
		this.clickedOnSlider = false;

		this.caller = null;
		this.trigger = null;
		this.output = null;
	}
	init() {
		var fullSpectrum = this.ctx.createLinearGradient(0, 0, pickerW, 0);

		fullSpectrum.addColorStop(0,     'rgb(255,   0,   0)');
		fullSpectrum.addColorStop(1 / 6, 'rgb(255, 255,   0)');
		fullSpectrum.addColorStop(2 / 6, 'rgb(0,   255,   0)');
		fullSpectrum.addColorStop(3 / 6, 'rgb(0,   255, 255)');
		fullSpectrum.addColorStop(4 / 6, 'rgb(0,     0, 255)');
		fullSpectrum.addColorStop(5 / 6, 'rgb(255,   0, 255)');
		fullSpectrum.addColorStop(1,     'rgb(255,   0,   0)');

		this.ctx.fillStyle = fullSpectrum;
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

		var toWhite = this.ctx.createLinearGradient(0, 0, 0, pickerH);

		toWhite.addColorStop(0, 'rgba(0,     0,   0, 0)');
		toWhite.addColorStop(1, 'rgba(255, 255, 255, 1)');

		this.ctx.fillStyle = toWhite;
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

		this.moveDropper();
		this.updateColorRender();
		this.updateInputs();
	}
	showYourself(trigger) {
		this.trigger = trigger; // '+' box clicked
		this.caller = trigger.parentElement.parentElement; // dropdown list
		this.output  = document.getElementById(this.caller.id.substring(0, this.caller.id.length-3)); // rendered selected color

		this.caller.classList.add('hide');

		var move = this.output.getBoundingClientRect();
		
		var topOffset = document.getElementById('lightEffects').getBoundingClientRect().top;
		var leftOffset = document.getElementById('lightEffects').getBoundingClientRect().left;

		var checkBtm = move.bottom + 2;
		let optionH  = 269;

		if((checkBtm + optionH) >= window.innerHeight) {
			this.wrapper.style.top = (move.top - topOffset) - optionH - 2 + 'px';
		} else {
			this.wrapper.style.top = move.bottom + 1 - topOffset + 'px';
		}

		this.wrapper.style.left = move.left - leftOffset + 'px';

		this.wrapper.classList.add('show');
	}
	_getValue(inputId) {
		var raw = parseInt(document.getElementById(inputId).value);

		var rgb = 0;

		if(!Number.isNaN(raw)) {
			if(isBetween(raw, 0, 255)) {
				rgb = raw;
			}
		}

		return rgb;
	}
	refreshHexInput() {
		this.updateInputs('rgb');
	}
	refreshRgbInputs() {
		this.updateInputs('hex');
	}
	_getHexValue(inputId) {
		var raw = document.getElementById(inputId).value;

		var hex = '000000';

		switch(raw.length) {
			case 1:
				hex = raw+raw+raw+raw+raw+raw;
				break;
			case 2:
				hex = raw+raw+raw;
				break;
			case 3:
				hex = raw+raw;
				break;
			case 4:
				hex = raw+'ff';
				break;
			case 5:
				hex = raw+'f';
				break;
			case 6:
				hex = raw;
				break;
		}

		var regex = /^[0-9a-f]{6}$/i;
		if(!hex.match(regex)) {
			hex = '000000';
		}
		return hex;
	}
	_setValue(inputId, value) {
		document.getElementById(inputId).value = value;
	}
	updateColorRender(skip) {
		/* update foreground color display */
		let fg = this.fgCtx;
		fg.clearRect(0, 0, pickerW, pickerH);
		fg.fillStyle = this.selectedRgb;
		fg.fillRect(0, 0, fg.canvas.width, fg.canvas.height);

		/* update to-black color display */
		if(skip != 'slider') {
			let tb = this.tbCtx;
			var gradientTb = this.ctx.createLinearGradient(0, 0, tb.canvas.width, 0);

			var x = this.drop.style.left;
			var y = this.drop.style.top;

			x = x.split('px')[0];
			y = y.split('px')[0];

			x = parseInt(x) + 7;
			y = parseInt(y) + 7;

			let rgbFromMain = this.colorAtXy(x,y);

			gradientTb.addColorStop(0,   'rgba(0, 0, 0, 0)');
			gradientTb.addColorStop(1,   rgbFromMain);
			tb.clearRect(0, 0, tb.canvas.width, tb.canvas.height);
			tb.fillStyle = gradientTb;
			tb.fillRect(0, 0, tb.canvas.width, tb.canvas.height);
		}
	}
	updateInputs(skip) {
		if(skip != 'hex') {
			let hex = rgb2Hex(this.selectedRgb);

			this._setValue('pcHex', hex);
		}

		if(skip != 'rgb') {
			let split = _splitRgb(this.selectedRgb);

			this._setValue('pcR', split.r);
			this._setValue('pcG', split.g);
			this._setValue('pcB', split.b);
		}
	}
	moveDropper() {
		/* main area */
		let split = _splitRgb(this.selectedRgb);

		let hsv = rgb2Hsv(split.r, split.g, split.b);

		this.drop.style.left = Math.floor(hsv.h / 360 * pickerW) - 7 + 'px';
		this.drop.style.top = pickerH - Math.floor(hsv.s / 100 * pickerH) - 7 + 'px';

		/* darkness */
		let pitchBlack = 34;
		this.darkness.style.left = pitchBlack + Math.floor(hsv.v / 100 * (130 - 8)) + 'px';
	}
	updateColorOnRgb() {
		let getRgbValues = {
			r: this._getValue('pcR'),
			g: this._getValue('pcG'),
			b: this._getValue('pcB')
		};

		this.selectedRgb = 'rgb(' + getRgbValues.r + ',' + getRgbValues.g + ',' + getRgbValues.b + ')';

		/* update hex input */
		this.updateInputs('rgb');

		/* update eye dropper */
		this.moveDropper();

		this.updateColorRender();
	}
	updateColorOnHex() {
		let getHexValue = this._getHexValue('pcHex');

		let getRgbValues = hex2Rgb(getHexValue);

		this.selectedRgb = 'rgb(' + getRgbValues.r + ',' + getRgbValues.g + ',' + getRgbValues.b + ')';

		/* update rgb inputs */
		this.updateInputs('hex');

		/* update eye dropper */
		this.moveDropper();

		this.updateColorRender();
	}
	colorAtXy(x,y) {
		let imageData = this.ctx.getImageData(x, y, 1, 1);
		var color = 'rgb(' + imageData.data[0] + ',' + imageData.data[1] + ',' + imageData.data[2] + ')';

		if( imageData.data[0] == 0
			&& imageData.data[1] == 0
			&& imageData.data[2] == 0
			) {
			color = 'rgb(255,255,255)';
		}
		return color;
	}
	getColorOnClick(e) {
		var newColor;
		let rect = this.cvs.getBoundingClientRect();
		// if(!isBetween(e.x, rect.left, rect.right) || !isBetween(e.y, rect.top, rect.bottom)) { return; }
		let x = e.x - rect.left;
		let y = e.y - rect.top;

		x = Math.max(0, x);
		y = Math.max(0, y);

		x = Math.min(pickerW, x);
		y = Math.min(pickerH, y);

		/* update eye dropper */
		this.drop.style.left = x - 7 + 'px';
		this.drop.style.top  = y - 7 + 'px';

		this.selectedRgb = this.colorAtXy(x,y);

		this.updateColorRender();
		this.updateInputs('all');
	}
	getBrightOnClick(e) {
		var newColor;
		let rect = this.tb.getBoundingClientRect();

		let x = e.x - rect.left;

		x = Math.max(0, x);

		x = Math.min(rect.width-4, x);

		let imageData = this.tbCtx.getImageData(x, 1, 1, 1);

		this.selectedRgb = 'rgb(' + imageData.data[0] + ',' + imageData.data[1] + ',' + imageData.data[2] + ')';

		this.darkness.style.left = 34 + x - 4 + 'px';

		this.updateColorRender('slider');
		this.updateInputs('all');
	}
	_inRange(e, sx, sy, ex, ey) {
		return (isBetween(e.x, sx, ex)&&isBetween(e.y, sy, ey));
	}
	mouseOnPicker(e) {
		let mainRect = this.cvs.getBoundingClientRect();

		return this._inRange(e, mainRect.left, mainRect.top, mainRect.right, mainRect.bottom);
	}
	mouseOnSlider(e) {
		let darkRect = this.tb.getBoundingClientRect();
		return this._inRange(e, darkRect.left, darkRect.top, darkRect.right, darkRect.bottom);
	}
	handleMouseDown(e) {
		if(this.mouseOnPicker(e)) {
			this.clickedOnPicker = true;
			this.getColorOnClick(e);

		} else if(this.mouseOnSlider(e)) {
			this.clickedOnSlider = true;
			this.getBrightOnClick(e);
		}
	}
	handleMouseMove(e) {
		if(mouseIsDown) {
			if(this.clickedOnPicker) {
				this.getColorOnClick(e);
			} else if (this.clickedOnSlider) {
				this.getBrightOnClick(e);
			}
		}
	}
	handleMouseUp(e) {

		this.clickedOnPicker = false;
		this.clickedOnSlider = false;
	}
}