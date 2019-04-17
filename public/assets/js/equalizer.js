const eqConfig = {
	chartLeftPx: 17,
	gridSpace: 78,
	canvasWidth: 809,
	canvasHeight: 337,
	topOffset: 10,
	bottomOffset: 30,
	pointRadius: 7,
	gridWidth: 6,
	shadowColor: '#111',
	yMin: -12,
	yMax: 12,
	initData:    [12, 9, 0, 5, 0, -12, 2, 0, 5, 7],
	restoreData: [0,0,0,0,0,0,0,0,0,0],
	pointHoverColor: '#5d5d5d',
	pointClickColor: '#383838'
};
function _getBody(bodyItem) {
    return bodyItem.lines;
}
function _drawTooltip(tooltipModel, dom) {
    var ttDom = document.getElementById('chartjsTooltip');

    if(!ttDom) {
        ttDom = document.createElement('div');
        ttDom.id = 'chartjsTooltip';
        ttDom.classList.add('eq-tooltip');
        document.body.appendChild(ttDom);
    }

    if(tooltipModel.opacity === 0) {
    	ttDom.classList.remove('show');
        return;
    }

    if(tooltipModel.body) {
        var bodyLines = tooltipModel.body.map(_getBody);

        var v;
        bodyLines.forEach(function(body, i) {
        	v = body[0].replace("Value: ", "");
        });
        ttDom.innerText = v;
    }

    var ttRect = ttDom.getBoundingClientRect();
    let shiftLeft = ttRect.width + 7 + 5;
    let shiftUp   = ttRect.height/2

    var position = dom.getBoundingClientRect();

    let i = parseInt(v) + 12;
    let realY = 306 - 12 * i - Math.floor((i + 1) / 3);

    ttDom.classList.add('show');
    ttDom.style.left = position.left + window.pageXOffset + tooltipModel.caretX - shiftLeft + 'px';
    ttDom.style.top = position.top + window.pageYOffset + realY - shiftUp + 'px';
}
class Equalizer {
	constructor(canvasPref, eqConf) {
		this.debugMode = false;
		this.mainCtx   = document.getElementById(canvasPref+'Canvas').getContext('2d');
		this.customCtx = document.getElementById(canvasPref+'Custom').getContext('2d');
		// this.shadowCtx = document.getElementById(canvasPref+'Shadow').getContext('2d');

		this.option = eqConf;

		this.canvasElement = document.getElementById(canvasPref+'Canvas');
		let dom = this.canvasElement;
		let rect = dom.getBoundingClientRect();

		this.gridWidth = this.option.gridWidth;
		
		this.chartHeight = this.option.canvasHeight - this.option.topOffset - this.option.bottomOffset;
		this.yRange = this.option.yMax - this.option.yMin;
		this.pxToValue = this.chartHeight / this.yRange;

		this.baseTop    = rect.top + this.option.topOffset;
		this.baseBottom = rect.bottom - this.option.bottomOffset;
		this.baseLeft   = rect.left + this.option.chartLeftPx;

		this.chartConf = {
			type: 'line',
			data: {
				labels: ['31Hz', '63Hz', '125Hz', '250Hz', '500Hz',
					'1kHz','2kHz','4kHz','8kHz','16kHz'],
				datasets: [{
					borderWidth: 2,
					borderColor: 'rgba(0,0,0,0)',
					pointBorderWidth: 2,
					pointBorderColor: mainColor,
					label: 'Value',
					fill: false,
					backgroundColor: this.option.shadowColor,
					pointBackgroundColor: [mainColor,mainColor,mainColor,mainColor,mainColor,mainColor,mainColor,mainColor,mainColor,mainColor],
					data: this.option.initData,
					pointRadius: this.option.pointRadius,
					lineTension: 0,
					pointHoverRadius: this.option.pointRadius,
					pointHoverBorderColor:mainColor,
					pointHoverBackgroundColor: [this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor,this.option.pointHoverColor]
				}]
			},
			options: {
				animation: {
					duration: 300,
				},
				layout: {
					padding: {
				      	top: 10
				    }
				},
				responsive: false,
				title: {
					display: false,
					text: ''
				},
				tooltips: {
					enabled: false,
					custom: function(tooltipModel) {
						_drawTooltip(tooltipModel, this._chart.canvas);
					}
				},
				legend: {
		            display: false,
		        },
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [
					{
						position: 'bottom',
						gridLines: {
							color: 'transparent',
							lineWidth: this.gridWidth,
							drawBorder: false,
							tickMarkLength: 1,
						},
						ticks: {
							padding: 10,
							fontColor: mainGray,
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12,
						},
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'Hz',
						}
					}],
					yAxes: [{
						position: 'right',
						gridLines: {
							drawBorder: false,
							display: false,
							color: mainColor,

						},
						ticks: {
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12,
							textAlign: 'right',
							min: -12,
							max: 12,
							stepSize: 6,
							fontColor: mainGray,
							padding: 39,
							callback: function(value, index, values) {
								if(value > 0) { value = '+' + value; }
		                        return value + 'dB';
		                    }
						},
						display: true,
						scaleLabel: {
							display: false,
							labelString: 'dB',
						},
					}]
				}
			}
		};

		this.chartObj = null;
		this.selectedPoint = false;
	}
	printData() {
		if(this.debugMode) {
			document.getElementById('eqDebug').style.display = 'block';
			var data = this.spitData();
			for (var i = 0; i < 10; i++) {
				document.getElementsByClassName('eq-data-'+i)[0].innerText = data[i] + ' dB';
			}
		}
	}
	debug() {
		this.debugMode = true;
		this.printData();
	}
	drawCustomStuff() {

		let ctx = this.customCtx;

		let left   = this.option.chartLeftPx;
		let space  = this.option.gridSpace;
		let top    = this.option.topOffset;
		let bottom = top + this.chartHeight;
		let weight = this.gridWidth/2;

		ctx.clearRect(0, 0, this.option.canvasWidth, this.option.canvasHeight);

		ctx.strokeStyle = 'rgba('+mainColorRgba+',0.3)';
		ctx.fillStyle = 'rgba('+mainColorRgba+',0.3)';

		for (var i = 0; i < 10; i++) {
			ctx.lineWidth = this.gridWidth;

			ctx.beginPath(); 
			ctx.moveTo(left+i*space, top);
			ctx.lineTo(left+i*space, bottom);
			ctx.stroke();

			ctx.fillStyle = 'rgba('+mainColorRgba+',0.3)';
			ctx.beginPath();
			ctx.arc(Math.round(left+i*space), top, weight, fullRadian()/2, fullRadian(), false);
			ctx.fill();

			ctx.fillStyle = mainColor;
			ctx.beginPath();
			ctx.arc(Math.round(left+i*space), (bottom-top)/2+this.option.pointRadius+weight, weight, 0, fullRadian(), false);
			ctx.fill();

			ctx.fillStyle = 'rgba('+mainColorRgba+',0.3)';
			ctx.beginPath();
			ctx.arc(Math.round(left+i*space), bottom, weight, 0, fullRadian()/2, false);
			ctx.fill();
		}

		// ctx.strokeStyle = mainColor;
		// ctx.lineWidth = 1;
		// ctx.beginPath(); 
		// ctx.moveTo(left-weight, bottom-0.5);
		// ctx.lineTo(left+9*space+weight, bottom-0.5);
		// ctx.stroke();
	}
	getAllCoords() {
		let obj = this.chartObj;

		let left   = this.option.chartLeftPx;
		let space  = this.option.gridSpace;
		let top    = this.option.topOffset;
		let bottom = top + this.chartHeight;
		let max    = this.option.yMax;
		let ratio  = this.pxToValue;

		var data = obj.data.datasets[0].data;
		var coords = [];

		data.forEach(function(v, i) {
			coords[i] = {
				x: left + i*space,
				y: top + (max - v) * ratio
			};
		});

		return coords;
	}
	drawShadow() {
		return;
		let ctx = this.shadowCtx;

		let left   = this.option.chartLeftPx;
		let space  = this.option.gridSpace;
		let top    = this.option.topOffset;
		let bottom = top + this.chartHeight;
		let weight = this.gridWidth/2;
		let mid    = this.option.pointRadius+weight;

		ctx.clearRect(0, 0, this.option.canvasWidth, this.option.canvasHeight);

		var coords = this.getAllCoords();

		ctx.fillStyle = this.option.shadowColor;

		ctx.beginPath(); 
		ctx.moveTo(left-weight,this.baseBottom);
		coords.forEach(function(value, index) {
			let x = value.x;
			if(index==0) { x = x-weight; }
			if(index==9) { x = x+weight; }
			// let y = (bottom-top)/2+mid;
			// ctx.lineTo(x,y);
			ctx.lineTo(x,value.y);
		});
		ctx.lineTo(left+9*space+weight,bottom-0.5);
		ctx.lineTo(left-weight,bottom-0.5);
		ctx.fill();
	}
	hideTooltip(){
	    var ttDom = document.getElementById('chartjsTooltip');
	    ttDom.classList.remove('show');
	}
	updateTooltip(e, newValue) {
	    var ttDom = document.getElementById('chartjsTooltip');
	    var rect = ttDom.getBoundingClientRect();

	    if(!ttDom) {
	        ttDom = document.createElement('div');
	        ttDom.id = 'chartjsTooltip';
	        ttDom.classList.add('eq-tooltip');
	        document.body.appendChild(ttDom);
	    }

    	var ttRect = ttDom.getBoundingClientRect();
    	var position = this.canvasElement.getBoundingClientRect();
    	let shiftLeft = ttRect.width + 7 + 5;
    	let shiftUp   = ttRect.height/2
    	let y = e.y;
    	if(y <= this.baseTop - ttRect.height/2) { y = this.baseTop - ttRect.height/2; }
    	if(y >= this.baseBottom - ttRect.height/2) { y = this.baseBottom - ttRect.height/2; }

	    ttDom.innerText = newValue;
	    ttDom.classList.add('show');
	    ttDom.style.left = this.baseLeft+this.selectedPoint._index*this.option.gridSpace - shiftLeft + 'px';

	    let i = parseInt(newValue) + 12;
	    let realY = 306 - 12 * i - Math.floor((i + 1) / 3);
	    ttDom.style.top = position.top + window.pageYOffset + realY - shiftUp + 'px';
	}
	updatePoint(i = 0, newValue = 0) {
		let obj = this.chartObj;

		obj.data.datasets[0].pointBackgroundColor[i] = this.option.pointClickColor;
		obj.data.datasets[0].pointHoverBackgroundColor[i] = this.option.pointClickColor;

		obj.data.datasets[0].data[i] = newValue;
		obj.update();

		this.drawShadow();
	}
	handleHover(e) {
		let obj = this.chartObj;
		
		var point = obj.getElementAtEvent(e)[0];

	    if(point) {
	    	this.canvasElement.style.cursor = 'pointer';

	    } else {
	    	this.canvasElement.style.cursor = 'default';
	    }
	}
	handleMouseDown(e) {
		if(this.chartObj != null) {
	    	this.selectedPoint = this.chartObj.getElementAtEvent(e)[0];
	    	if(this.selectedPoint) {
				let obj =  this.chartObj;
				obj.data.datasets[0].pointBackgroundColor[this.selectedPoint._index] = this.option.pointClickColor;
				obj.data.datasets[0].pointHoverBackgroundColor[this.selectedPoint._index] = this.option.pointClickColor;

				this.chartObj.update();
	    	}
		}
	}
	handleMouseMove(e) {
		if(this.chartObj != null) {
		    this.handleHover(e);
		    this.dragPoint(e);
		}
	}
	handleMouseUp(e) {
		if(this.selectedPoint) {
			let obj =  this.chartObj;
			obj.data.datasets[0].pointBackgroundColor[this.selectedPoint._index] = mainColor;
			obj.data.datasets[0].pointHoverBackgroundColor[this.selectedPoint._index] = this.option.pointHoverColor;

			this.chartObj.update();
			this.hideTooltip();
    	}
		if(mouseIsDown && e.target.className == 'eq-reset') {
			this.resetData();
		}
	    this.selectedPoint = false;
	}
	dragPoint(e) {
		let obj = this.chartObj;
	
		let ratio  = this.pxToValue;
		let top    = this.option.topOffset;
		let bottom = top + this.chartHeight;
		let min    = this.option.yMin;
		let max    = this.option.yMax;

		let point  = this.selectedPoint;

	   	if(mouseIsDown && point) {

	    	var y = e.y;

	    	var newValue = Math.floor((this.baseBottom - y) / ratio + min);

	    	if(y >= this.baseBottom) {
	    		newValue = min;
	    	} else if(y <= this.baseBottom - this.chartHeight) {
	    		newValue = max;
	    	}

	    	this.updatePoint(point._index, newValue);

			this.updateTooltip(e, newValue);

	   		this.printData();
	    }
	}
	resetData() {
		this.drawCustomStuff();

		for (var i = 0; i < 10; i++) {
			this.chartObj.data.datasets[0].data[i] = this.option.restoreData[i];
		}
	  	this.chartObj.update();

		this.drawShadow();
		
		this.printData();

		return;
	}
	spitData() {
		return this.chartObj.data.datasets[0].data;
	}
	init() {
		this.drawCustomStuff();		
		this.chartObj = new Chart(this.mainCtx, this.chartConf);
		this.drawShadow();
	}
}