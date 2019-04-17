class Switch {
	constructor(swId, targetId, toggleClass) {
		this.switchId = swId;
		this.targetId = targetId;
		this.toggleClass = toggleClass;

		this.switchDom = document.getElementById(this.switchId);
		this.targetDom = document.getElementById(this.targetId);

		if(this.switchDom.classList.contains('on')) {
			this.targetDom.classList.add('on');
		} else {
			this.targetDom.classList.remove('on');
		}
	}
	handleClick() {
		this.targetDom.classList.toggle(this.toggleClass);
		this.switchDom.classList.toggle('on');
		
		if(this.switchDom.classList.contains('switch-slider')) {
			document.getElementById(this.targetId+'Range').disabled = !document.getElementById(this.targetId+'Range').disabled;
		}

		if(this.switchId == 'swBright') {
			document.getElementById('lightOff').classList.toggle('disabled');
			var dis = true;
			if(!document.getElementById('lightOff').classList.contains('disabled')) {
				dis = false;
			}

			sliderBr.sliderDom.disabled = dis;
			sliderIdle.sliderDom.disabled = dis;
			
			document.getElementById('checkOff').disabled = dis;
			document.getElementById('checkIdle').disabled = dis;

		}
	}
}