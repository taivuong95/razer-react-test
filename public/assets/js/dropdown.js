class Dropdown {
  constructor(
    dropdownId,
    selectedColorId = 'sColor1',
    greenId = 'razerGreen1'
  ) {
    this.dropdownId = dropdownId;
    this.open = false;
    this.dropDom = document.getElementById(dropdownId);
    this.optDom = document.getElementById(dropdownId + 'Opt');
    this.output = '';

    this.newCounter = 0;
    this.dupCounter = 0;

    this.updateSelection();

    this.sColor = selectedColorId;
    this.rGreen = greenId;

    if (this.optDom.children.length <= 1) {
      this.dropDom.classList.add('disabled');

      if (this.dropdownId == 'profileDrop') {
        document.getElementById('deleteAction').classList.add('disabled');
      }
    }
  }
  getDropdownMode(e) {
    if (this.dropDom.classList.contains('disabled')) return;

    /* BEGIN: color picker special case */

    if (this.optDom.classList.contains('color-opts')) {
      var picker = document.getElementById('colorPicker');
      var menu = document.getElementById('rightClick');

      if (picker.classList.contains('show')) {
        return 'do nothing';
      }

      if (menu.classList.contains('show')) {
        if (e.target.id == 'deleteColor') {
          oneTrigger.classList.add('add-color');
          oneTrigger.setAttribute('color', '#111');
          oneTrigger.style.background = '#111';

          if (oneTrigger.classList.contains('selected')) {
            oneTrigger.classList.remove('selected');
            console.log(this.rGreen);
            document.getElementById(this.rGreen).classList.add('selected');

            var sColor = document.getElementById(this.sColor);
            sColor.style.background = '#00ff00';
          }

          oneTrigger.parentNode.appendChild(oneTrigger);
          oneTrigger = null;
          menu.classList.remove('show');
          return 'do nothing';
        } else if (e.target.id == 'editColor') {
          menu.classList.remove('show');
          pc.showYourself(oneTrigger);
          return 'do nothing';
        } else {
          var isRight = false;
          let ev = e || window.event;

          if ('which' in ev) {
            // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
            isRight = ev.which == 3;
          }

          if (!isRight) {
            rightClick.classList.remove('show');
          }
        }
      }
    }
    /* END: color picker special case */

    if (
      e.target.classList.contains('option') ||
      e.target.classList.contains('preset')
    ) {
      if (this.optDom.contains(e.target)) {
        return 'select';
      }
    }

    if (this.optDom.contains(e.target)) {
      return 'scroll';
    }

    if (this.dropDom.contains(e.target)) {
      return 'toggle';
    }

    return 'close';
  }
  toggleDropdown(e, forceClose = false) {
    if (
      e.target.classList.contains('option') &&
      e.target.parentElement.id != this.dropdownId + 'Opt'
    )
      return;
    if (forceClose) {
      this.open = true;
    }
    if (!this.open) {
      var checkBtm = this.dropDom.getBoundingClientRect().bottom + 2;

      var dropH = this.optDom.children.length * 25 + 2;
      dropH = Math.min(180, dropH);

      var moveY = this.optDom.classList.contains('color-opts') ? 250 : dropH;

      if (checkBtm + moveY >= window.innerHeight) {
        this.optDom.style.top = 'unset';
        this.optDom.style.bottom = '28px';
      } else {
        this.optDom.style.bottom = 'unset';
        this.optDom.style.top = '27px';
      }

      // open
      this.dropDom.classList.add('expand');
      this.optDom.classList.add('expand');

      let sel = this.optDom.getElementsByClassName('selected');

      this.optDom.scrollTo(0, sel[0].offsetTop);
    } else {
      // close
      this.dropDom.classList.remove('expand');
      this.optDom.classList.remove('expand');

      if (this.optDom.classList.contains('color-opts')) {
        document.getElementById('colorPicker').classList.remove('show');
        document.getElementById('rightClick').classList.remove('show');
      }
    }
    this.open = !this.open;
  }
  updateSelection(text) {
    var selected = this.dropDom.getElementsByClassName('selected');

    if (!text) {
      this.output = selected[0].innerText;
    } else {
      this.output = text;
      selected[0].innerText = this.output;
    }
  }
  renameSelection(newValue) {
    var sel = this.optDom.getElementsByClassName('selected');
    sel[0].innerText = newValue;

    this.updateSelection(newValue);
  }
  selectOption(e) {
    if (e.target.classList.contains('add-color')) return;

    if (e.target.classList.contains('option')) {
      this.updateSelection(e.target.innerText);
    }

    if (e.target.classList.contains('preset')) {
      var sColor = document.getElementById(this.sColor);
      sColor.style.background = e.target.getAttribute('color');

      if (e.target.classList.contains('no-color')) {
        sColor.classList.add('no-color');
      } else {
        sColor.classList.remove('no-color');
      }
    }

    removeClassFromElements(this.optDom, 'selected', e.target);

    if (this.dropdownId == 'quickDrop') {
      changeChromaEffects(e.target.getAttribute('value'));
    }

    this.dropDom.classList.remove('placeholder');
    this.toggleDropdown(e, true);
  }
  insertAndSelect(mode) {
    var name = this.output;

    switch (mode) {
      case 'new':
        name = 'New Profile';
        if (this.newCounter > 0) {
          name = 'New Profile' + ' (' + this.newCounter + ')';
        }
        this.newCounter++;
        break;
      case 'dup':
        var open = name.lastIndexOf('(');
        var close = name.lastIndexOf(')');
        if (open > 0 && close > 0 && close > open) {
          this.dupCounter = parseInt(name.substring(open + 1, close)) + 1;
          name = name.substring(0, open);
        } else {
          this.dupCounter = 1;
        }

        name = name + ' (' + this.dupCounter + ')';
        break;
      default:
        break;
    }

    var newItem = document.createElement('div');
    var profileList = document.getElementById('profileDropOpt');
    newItem.classList.add('option');

    newItem.innerText = name;

    removeClassFromElements(profileList, 'selected', newItem);

    profileList.append(newItem);

    var selected = this.dropDom.getElementsByClassName('selected');

    this.updateSelection(name);
  }
  handleDropdown(e) {
    let mode = this.getDropdownMode(e);

    if (mode == 'close' && !this.open) {
      return;
    }

    var isRight = false;
    let ev = e || window.event;

    if ('which' in ev) {
      // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRight = ev.which == 3;
    }

    if (
      mode == 'select' &&
      this.optDom.classList.contains('color-opts') &&
      isRight
    ) {
      e.preventDefault();

      if (!e.target.classList.contains('custom')) return false;
      if (e.target.classList.contains('add-color')) return false;

      oneTrigger = e.target;

      var move = oneTrigger.getBoundingClientRect();
      var topOffset = document
        .getElementById('lightEffects')
        .getBoundingClientRect().top;
      var leftOffset = document
        .getElementById('lightEffects')
        .getBoundingClientRect().left;
      var rightClick = document.getElementById('rightClick');

      rightClick.style.top = move.top - topOffset + 10 + 'px';
      rightClick.style.left = move.left - leftOffset + 10 + 'px';
      rightClick.classList.add('show');

      return false;
    }

    if (mode != 'close') {
      let c = this.optDom.children.length;
      if (c <= 1) {
        return false;
      }
    }

    switch (mode) {
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
