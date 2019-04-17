class Dropdown {
	constructor(dropdownId, selectedColorId='sColor', greenId='razerGreen') {
		this.dropdownId = dropdownId;
		this.open = false;
		this.dropDom = document.getElementById(dropdownId);
		this.optDom = document.getElementById(dropdownId+'Opt');

		this.sColor = selectedColorId;
		this.rGreen = greenId;

	}
	getDropdownMode(e) {
		if(this.dropDom.classList.contains('disabled')) return;

		if(e.target.classList.contains('option')
			&& e.target.parentElement.id == this.dropdownId+'Opt') {
			return 'select';
		}
		if(e.target.classList.contains('preset')
			&& e.target.parentElement.parentElement.id == this.dropdownId+'Opt') {
			return 'select';
		}

		let dr = this.dropDom.getBoundingClientRect();
		let or = this.optDom.getBoundingClientRect();

		let ymin = dr.top;
		let ymax = or.bottom;
		let ymid = dr.bottom;
		let xmin = dr.left;
		let xmax = dr.right;
		let xscroll = xmax - 6;

		if(this.optDom.classList.contains('color-opts')) {
			var picker = document.getElementById('colorPicker');
			var range = picker.getBoundingClientRect();
			if(picker.classList.contains('show')) {
				if(isBetween(e.x, range.left, range.right) && isBetween(e.y, range.top, range.bottom)) {
					return 'do nothing';
				}
			}

			var rightClick = document.getElementById('rightClick');
			if(rightClick.classList.contains('show')) {
				var editRange = rightClick.getBoundingClientRect();
				if(isBetween(e.x, editRange.left, editRange.right) && isBetween(e.y, editRange.top, editRange.bottom)) {
					if(e.target.id == 'deleteColor') {
						oneTrigger.classList.add('add-color');
						oneTrigger.setAttribute('color', '#111');
						oneTrigger.style.background = '#111';

						if(oneTrigger.classList.contains('selected')) {
							oneTrigger.classList.remove('selected');
							document.getElementById(this.rGreen).classList.add('selected');
							var sColor = document.getElementById(this.sColor);
							sColor.style.background = '#00ff00';
						}

						oneTrigger.parentNode.appendChild(oneTrigger);
						oneTrigger = null;
						rightClick.classList.remove('show');
						return 'do nothing';

					} else if(e.target.id == 'editColor') {

						rightClick.classList.remove('show');
						pc.showYourself(oneTrigger);
						return 'do nothing';
					}

				} else {
					var isRight = false;
				    let ev = e || window.event;

				    if("which" in ev)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
				    {
				    	isRight = ev.which == 3;
				    }

					if(!isRight) {
						rightClick.classList.remove('show');
					}
				}
			}
		}

		if(isBetween(e.x, or.left, or.right) && isBetween(e.y, or.top, or.bottom)) {
			return 'do nothing';
		}

		if( isBetween(e.x, xmin, xmax) && isBetween(e.y, ymin, ymid)) {
			return 'toggle';
		} else if( isBetween(e.x, xscroll, xmax) && isBetween(e.y, ymid, ymax)) {
			return 'scroll';
		} else {
			return 'close';	
		}
	}
	toggleDropdown(e, forceClose=false) {
		if(e.target.classList.contains('option')
			&& e.target.parentElement.id != this.dropdownId+'Opt'
			) return;
		if(forceClose) { this.open = true; }
		if(!this.open) {

			var checkBtm = this.dropDom.getBoundingClientRect().bottom + 2;
			let optionH  = (this.optDom.classList.contains('color-opts'))? 250:180;

			if((checkBtm + optionH) >= window.innerHeight) {
				this.optDom.style.top = '-' + optionH - 2 + 'px';
			} else {
				this.optDom.style.top = '27px';
			}

			// open
			this.dropDom.classList.add("expand");
			this.optDom.classList.add("expand");
		} else {
			// close
			this.dropDom.classList.remove("expand");
			this.optDom.classList.remove("expand");

			if(this.optDom.classList.contains('color-opts')) {
				document.getElementById('colorPicker').classList.remove('show');
				document.getElementById('rightClick').classList.remove('show');
			}

		}
		this.open = !this.open;
	}
	selectOption(e) {

		if(e.target.classList.contains('add-color')) return;

		var selected = this.dropDom.getElementsByClassName('selected');
		
		if(e.target.classList.contains('option')) {
			selected[0].innerText = e.target.innerText;
		}
		
		if(e.target.classList.contains('preset')) {
			var sColor = document.getElementById(this.sColor);
			sColor.style.background = e.target.getAttribute('color');

			if(e.target.classList.contains('no-color')) {
				sColor.classList.add('no-color');
			} else {
				sColor.classList.remove('no-color');
			}
		}

		removeClassFromElements(this.optDom, 'selected', e.target);

		if(this.dropdownId == 'quickDrop') {
			changeChromaEffects(e.target.getAttribute('value'));
		}

		this.dropDom.classList.remove("placeholder");
		this.toggleDropdown(e, true);
	}
	handleDropdown(e) {
		let mode = this.getDropdownMode(e);

		if(mode == 'close'
			&& !this.open ) {
			return;
		}

		var isRight = false;
	    let ev = e || window.event;

	    if("which" in ev)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
	    {
	    	isRight = ev.which == 3;
	    }

		if(mode == 'select'
			&& this.optDom.classList.contains('color-opts')
			&& isRight) {
			e.preventDefault();

		    if(!e.target.classList.contains('custom')) return false;
		    if(e.target.classList.contains('add-color')) return false;

		    oneTrigger = e.target;

		    var move = oneTrigger.getBoundingClientRect();
			var topOffset = document.getElementById('lightEffects').getBoundingClientRect().top;
			var leftOffset = document.getElementById('lightEffects').getBoundingClientRect().left;
			var rightClick = document.getElementById('rightClick');

		    rightClick.style.top = move.top - topOffset + 10 + 'px';
		    rightClick.style.left = move.left - leftOffset + 10 + 'px';
		    rightClick.classList.add('show');

		    return false;
		}

		if(mode != 'close') {
			let c = this.optDom.children.length;
			if(c<=1) { return false; }
		}

		switch(mode) {
			case 'close':
				this.optDom.classList.remove('hide');
				this.toggleDropdown(e, true);
				break;
			case 'toggle':
				this.toggleDropdown(e);
				break;
			case 'select':
				// return;
				this.selectOption(e);
				break;
			case 'do nothing':
				return;
			default:
				break;
		}
	}
}