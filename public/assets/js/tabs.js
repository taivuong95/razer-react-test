var toggleEffects = document.getElementById('toggleEffects');

var quickTab = document.getElementById('quickTab');
var quickTabArea = document.getElementById('quickTabArea');
var advTab = document.getElementById('advTab');
var advTabArea = document.getElementById('advTabArea');

toggleEffects.addEventListener('click', function(e) {
	quickTab.classList.toggle('active');
	advTab.classList.toggle('active');
	quickTabArea.classList.toggle('active');
	advTabArea.classList.toggle('active');

	if(advTab.classList.contains('active')) {
		document.getElementById('chromaSync').classList.remove('turn');
	}
});

//
var dirDuals = document.getElementsByClassName('dir-dual');

for(var i = dirDuals.length - 1; i >= 0; i--) {
	var that = dirDuals[i];
	that.addEventListener('click', function(e) {
		this.firstElementChild.classList.toggle('active');
		this.firstElementChild.nextElementSibling.classList.toggle('active');
	});
}
//
var dirMores = document.getElementsByClassName('dir-more');

for(var i = dirMores.length - 1; i >= 0; i--) {
	var that = dirMores[i];
	that.addEventListener('click', function(e) {
		var wrapper = this;

		if(e.target.classList.contains('modes-tab')) {
			removeClassFromElements(wrapper, 'active', e.target);
		}
	});
}