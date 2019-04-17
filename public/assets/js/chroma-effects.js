var effectsArea = document.getElementById('effectsArea');
function _onSync() {
	document.getElementById('chromaSync').classList.remove('off');
	document.getElementById('chromaSyncText').classList.remove('off');
}
function _offSync() {
	document.getElementById('chromaSync').classList.add('off');
	document.getElementById('chromaSyncText').classList.add('off');
}

function changeChromaEffects(effect) {
	
	effectsArea.setAttribute('effect', effect);

	switch(effect) {
		case 'breathing':
			_onSync();
			document.getElementById('firstColorName').innerText = 'Color 1';
			break;
		case 'fire':
			_offSync();
			break;
		case 'spectrum':
			_onSync();
			break;
		case 'ripple':
		case 'static':
			_onSync();
			document.getElementById('firstColorName').innerText = 'Color';
			break;
		case 'reactive':
			_onSync();
			document.getElementById('firstColorName').innerText = 'Color';
			break;
		case 'starlight':
			_onSync();
			document.getElementById('firstColorName').innerText = 'Color 1';
			break;
		case 'wave':
			_onSync();
			break;
		default:
			break;
	}
}