/* // THX blue
const mainColor     = '#28aadc';
const mainColorRgba = '40, 170, 220';*/

 // RZR green
const mainColor     = '#44d62c';
const mainColorRgba = '68,214,44';
const mainColor03   = '#2c5825';

const mainGray      = '#ccc';
const mainGrayRgba  = '204, 204, 204';

var tutorialMode = false;

function degreeToRadian(d=0) {
	return d*Math.PI/180;
}

function radianToDegree(r=0) {
	return Math.floor(r/Math.PI*180);
}

function fullRadian() {
	return Math.PI*2;
}

function eventDegreeToCenter(e, cX, cY) {

	var x = e.x-cX;
	var y = e.y-cY;
	var d = 0;

	if(x != 0) {
		var atan = Math.atan(y/x);
		d = radianToDegree(atan);
	} else {
		if(y < 0) {
			d = -90;
		} else {
			d = 90;
		}
	}

	if(x < 0 && y >= 0) { d = d-180; }
	if(x < 0 && y <= 0) { d = d+180; }
	if(d < 0) { d = d + 360; }

	return d;
}

function handlePopout(e, triggerId, popId, toggleClass, callbackFunc = function(){}) {
	let popElem = document.getElementById(popId);

	if(!popElem.classList.contains(toggleClass) && e.target.id == triggerId) {
		popElem.classList.add(toggleClass);
	} else {
		let rect = popElem.getBoundingClientRect();
		
		let ymin = rect.top;
		let ymax = rect.bottom;
		let xmin = rect.left;
		let xmax = rect.right;

		if((xmin <= e.x && e.x <= xmax) && (ymin <= e.y && e.y <= ymax)) {
		} else {
			popElem.classList.remove(toggleClass);	
		}
	}
	callbackFunc();
	return;
}

function smartFloat(rect, tooltipWidth, windowWidth) {
	let leftPx;
	let topPx;
	if(rect.right + tooltipWidth > windowWidth) {
		leftPx = (rect.right - tooltipWidth - 9) + 'px';
	} else {
		leftPx = (rect.right + 2) + 'px';
	}
	topPx = rect.bottom - 48 + 3 + 'px';
	return {left: leftPx, top: topPx};
}

function isBetween(x, min, max) {
	return x >= min && x <= max;
}

function removeClassFromElements(searchArea, className, addTo) {

	var replace = className;
	var re = new RegExp(replace,"g");
	
	let activeTab = searchArea.getElementsByClassName(className);
	while(activeTab.length) {
		if(activeTab[0].isSameNode(addTo)) { break; } else {
			activeTab[0].className = activeTab[0].className.replace(re, "");
		}
    }
	addTo.classList.add(className);
}

/* profile bar actions */

var profileMenuToggle = document.getElementById('profileMenuToggle');
var profileMenu = document.getElementById('profileMenu');
var profileEdit = document.getElementById('profileEdit');
var trimLength = 25;
var deleteAlert = document.getElementById('deleteAlert');

function trimValue(value) {
	value = value.trim();
	return value.substring(0, trimLength);
}
function saveProfile() {
	let newName = profileEdit.value;

	if(trimValue(newName) == '') {
		escapeProfile();
		return;
	}
	
	pf.renameSelection(newName);
	profileEdit.classList.remove('show');
}
function escapeProfile() {
	profileEdit.classList.remove('show');
}

if(profileMenuToggle != null) {

	profileMenuToggle.addEventListener('click', function(e) {
		profileMenu.classList.toggle('show');
		if(profileMenu.classList.contains('show')) {
			profileMenuToggle.classList.add('active');
		} else {
			profileMenuToggle.classList.remove('active');
		}

		if(e.target.classList.contains('action')) {

			switch(e.target.textContent) {
				case 'add':
					pf.insertAndSelect('new');
					document.getElementById('deleteAction').classList.remove('disabled');
					pf.dropDom.classList.remove('disabled');
					break;
				case 'duplicate':
					pf.insertAndSelect('dup');
					document.getElementById('deleteAction').classList.remove('disabled');
					pf.dropDom.classList.remove('disabled');
					break;
				case 'rename':
					profileEdit.value = pf.output;
					profileEdit.classList.add('show');
					profileEdit.focus();
					profileEdit.select();
					break;
				case 'delete':
					if(pf.optDom.children.length <= 1) {
						// if there is only one option, don't delete
						return false;
					}
					deleteAlert.classList.add('show');
					break;
				default:
					break;
			}
		}
	});

	document.addEventListener('click', function(e) {

		/* toggle profile menu */
		if(!e.target.classList.contains('act')
			&& !e.target.classList.contains('dots3')) {
			if(profileMenu.classList.contains('show')) {
				profileMenu.classList.remove('show');
				profileMenuToggle.classList.remove('active');
			}
		}

		/* blur profile rename */
		if(e.target.id != 'profileEdit'
			&& e.target.textContent != 'rename') {
			if(profileEdit.classList.contains('show')) {
				saveProfile();
			}
		}

		/* dismiss delete dialogue */
		if(!deleteAlert.contains(e.target)
			&& e.target.textContent != 'delete') {
			deleteAlert.classList.remove('show');
		}
	});

	profileEdit.addEventListener('keyup', function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			saveProfile();
		} else if (event.keyCode === 27) {
			escapeProfile();
		} else {
		}
	});

	document.getElementById('deleteConfirm').addEventListener('click', function(e) {
		var activeProfile = pf.optDom.getElementsByClassName('selected')[0];
		var nextOfKin = activeProfile.previousElementSibling;
	    if(nextOfKin == null) {
	    	// deleted top item
	    	nextOfKin = activeProfile.nextElementSibling;
		}
		activeProfile.remove();

		nextOfKin.classList.add('selected');
		pf.updateSelection(nextOfKin.textContent);

		deleteAlert.classList.remove('show');

		// if only 1 profile left after delete
		if(pf.optDom.children.length <= 1) {
			pf.dropDom.classList.add('disabled');
			document.getElementById('deleteAction').classList.add('disabled');
		}

	});
}