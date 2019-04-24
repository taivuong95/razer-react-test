import React from 'react';
import classes from './Mic.css';
let addCounter = 1;
let dupCounter = 1;
class Mic extends React.Component {
  componentDidMount() {
    window.init();
  }
  constructor(props) {
    super(props);

    this.state = {
      isClick: false,
      isExpand: false,
      hasDelete: false,
      hasRename: false,
      selectedItem: { name: 'profile 5', class: 'option selected' },
      profileArr: [
        { name: 'Default profile', class: 'option' },
        { name: 'profile 2', class: 'option' },
        { name: 'profile 3', class: 'option' },
        { name: 'profile 4', class: 'option' },
        { name: 'profile 5', class: 'option selected' },
        { name: 'profile 6', class: 'option' },
        { name: 'profile 7', class: 'option' },
      ],
    };
  }

  close = () => {
    this.setState({ isClick: false });
  };

  toggle = () => {
    this.setState({ isClick: !this.state.isClick });
  };

  closeExpand = () => {
    this.setState({ isExpand: false });
  };

  changeExpand = () => {
    this.setState({ isExpand: !this.state.isExpand });
  };

  deleteToggle = () => {
    this.setState({ hasDelete: !this.state.hasDelete });
  };

  handleAddList() {
    let lists = this.state.profileArr;
    let listHTML = document.getElementsByClassName('option');
    for (var i = 0; i < listHTML.length; i++) {
      listHTML[i].className = 'option';
    }

    let pro = {
      name: 'New Profile ' + '(' + addCounter + ')',
      class: 'option selected',
    };
    lists.push(pro);

    addCounter++;

    this.setState({
      profileArr: lists,
      selectedItem: pro,
    });
  }

  onDuplicateHandler() {
    let selectedItem = document.getElementById('itemSelected');
    let selectedItemName = selectedItem.innerText;
    var open = selectedItemName.lastIndexOf('(');
    var close = selectedItemName.lastIndexOf(')');
    if (open > 0 && close > 0 && close > open) {
      this.dupCounter =
        parseInt(selectedItemName.substring(open + 1, close)) + 1;
      selectedItemName = selectedItemName.substring(0, open);
    } else {
      dupCounter = 1;
    }

    selectedItemName = selectedItemName + ' (' + dupCounter + ')';

    let lists = this.state.profileArr;
    let listHTML = document.getElementsByClassName('option');
    for (var i = 0; i < listHTML.length; i++) {
      listHTML[i].className = 'option';
    }

    let pro = {
      name: selectedItemName,
      class: 'option selected',
    };
    console.log(selectedItemName);

    lists.push(pro);

    dupCounter++;

    this.setState({
      profileArr: lists,
      selectedItem: pro,
    });
  }

  onRenameClicked = () => {
    let selectedItem = document.getElementById('itemSelected');
    let selectedItemName = selectedItem.innerText;
    var profileEdit = document.getElementById('profileEdit');
    profileEdit.value = selectedItemName;
    profileEdit.focus();
    profileEdit.select();
    this.setState({ hasRename: !this.state.hasRename });
  };

  onRenameHandler = e => {
    if (e.keyCode === 13) {
      let selectedItem = e.target;
      let selectedItemObj = {
        name: selectedItem.value,
        class: 'option selected',
      };

      let lists = this.state.profileArr;

      let found = lists.findIndex(element =>
        element.class.includes('selected')
      );
      console.log(selectedItem);

      lists.splice(found, 1, selectedItemObj);

      let listHTML = document.getElementsByClassName('option');
      for (var i = 0; i < listHTML.length; i++) {
        listHTML[i].className = 'option';
      }

      selectedItem.className = 'option selected';

      this.setState({
        profileArr: lists,
        selectedItem: selectedItemObj,
        hasRename: !this.state.hasRename,
      });
    }
  };

  onDeleteHandler() {
    // let lists = this.state.profileArr;
    // // console.log(lists);
    // // console.log(beforeItem);
    // let listHTML = document.getElementsByClassName('option');
    // for (var i = 0; i < listHTML.length; i++) {
    //   listHTML[i].className = 'option';
    // }
    // let found = lists.findIndex(element => element.class.includes('selected'));
    // let beforeItem = lists[found - 1];
    // beforeItem.class = 'option selected';
    // lists.splice(found, 1);
    // this.setState({
    //   profileArr: lists,
    //   selectedItem: beforeItem,
    //   hasDelete: !this.state.hasDelete,
    // });
  }
  onChangeHandler = e => {
    let lists = this.state.profileArr;
    console.log(lists);

    let oldItem = lists.find(element => element.class.includes('selected'));
    let oldIndex = lists.findIndex(element =>
      element.class.includes('selected')
    );
    let newItem = lists.find(
      element => element.name.toUpperCase() === e.target.innerText.toUpperCase()
    );
    let newIndex = lists.findIndex(
      element => element.name.toUpperCase() === e.target.innerText.toUpperCase()
    );

    oldItem.class = 'option';
    let tempNewItem = { ...newItem, class: 'option selected' };
    lists.splice(newIndex, 1, tempNewItem);
    this.changeExpand();

    console.log(oldItem);
    console.log(tempNewItem);
    console.log(lists);

    let listHTML = document.getElementsByClassName('option');
    for (var i = 0; i < listHTML.length; i++) {
      listHTML[i].className = 'option';
    }

    let selectedItem = e.target;
    selectedItem.className = 'option selected';

    this.setState({
      profileArr: lists,
      selectedItem: tempNewItem,
    });

    // let selectedItem = e.target;
    // let selectedItemObj = {
    //   name: selectedItem.value,
    //   class: 'option selected',
    // };

    // let listHTML = document.getElementsByClassName('option');
    // for (var i = 0; i < listHTML.length; i++) {
    //   listHTML[i].className = 'option';
    // }
    // selectedItem.className = 'option selected';
    // this.changeExpand();

    // console.log(lists);
    // console.log(selectedItemObj);
    // foundItem.class = 'option';
    // console.log(foundItem);

    // lists.splice(found, 1, selectedItemObj);
    // console.log(lists);

    // this.setState({
    //   profileArr: lists,
    //   selectedItem: selectedItemObj,
    // });
  };

  render() {
    return (
      // <div className="main-container">
      <React.Fragment>
        <div className="nav-tabs flex">
          <div className="nav arrow back" />
          <div className="nav arrow forward disabled" />

          <a className="nav" href="./sound.html">
            sound
          </a>
          <a className="nav" href="./mixer.html">
            mixer
          </a>
          <a className="nav" href="./enhancement.html">
            enhancement
          </a>
          <a className="nav" href="./eq.html">
            eq
          </a>
          <a className="nav active" href="./mic.html">
            mic
          </a>
          <a className="nav" href="./lighting.html">
            lighting
          </a>
          <a className="nav" href="./power.html">
            power
          </a>

          <div className="user">
            <div className="avatar" />
          </div>
        </div>

        <div className="body-wrapper scrollable">
          <div className="profile-bar flex">
            <div className="loader" tooltip="Syncing Profiles" />
            <div>profile</div>

            <input
              type="text"
              name="profile"
              id="profileEdit"
              maxLength="25"
              className={this.state.hasRename ? 'show' : ''}
              onKeyDown={e => this.onRenameHandler(e)}
              defaultValue={this.state.selectedItem.name}
            />

            <div className="dropdown-area">
              <div
                id="profileDrop"
                className={
                  this.state.isExpand ? 's3-dropdown expand' : 's3-dropdown'
                }
                onClick={() => {
                  this.close();
                  this.changeExpand();
                }}
              >
                <div className="selected" id="itemSelected">
                  {/* {
                    this.state.profileArr.find(e =>
                      e.class.includes('selected')
                    ).name
                  } */}
                  {this.state.selectedItem.name}
                </div>
                <div className="icon expand" />
              </div>
              <div
                id="profileDropOpt"
                className={
                  this.state.isExpand
                    ? 's3-options flex expand'
                    : 's3-options flex '
                }
              >
                {this.state.profileArr.map((item, index) => {
                  return (
                    <div
                      className={item.class}
                      key={index}
                      onClick={e => this.onChangeHandler(e)}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={
                this.state.isClick
                  ? 'dots3 hover-border active'
                  : 'dots3 hover-border'
              }
              id="profileMenuToggle"
              onClick={() => {
                this.closeExpand();
                this.toggle();
              }}
            >
              <div
                className={
                  this.state.isClick ? 'profile-act show' : 'profile-act'
                }
                id="profileMenu"
              >
                <div
                  className="act action"
                  onClick={() => this.handleAddList()}
                >
                  add
                </div>
                <div className="act action">import</div>
                <div className="act divider" />
                <div
                  className="act action"
                  onClick={() => this.onRenameClicked()}
                >
                  rename
                </div>
                <div
                  className="act action"
                  onClick={() => this.onDuplicateHandler()}
                >
                  duplicate
                </div>
                <div className="act action">export</div>
                <div className="act divider" />
                <div
                  className="act action"
                  id="deleteAction"
                  onClick={this.deleteToggle}
                >
                  delete
                </div>
              </div>
            </div>

            <div
              id="deleteAlert"
              className={
                this.state.hasDelete
                  ? 'flex alert profile-del show'
                  : 'flex alert profile-del'
              }
            >
              <div className="title">delete profile</div>
              <div className="body-text t-center">
                You're about to delete this profile. All bindings in this
                profile will be deleted.
              </div>
              <div
                className="thx-btn"
                id="deleteConfirm"
                onClick={() => this.onDeleteHandler()}
              >
                delete
              </div>
            </div>
            <div className="obm hover-border" tooltip="On-board Profiles" />
            <div className="divider" />
            <div className="batt batt-30" tooltip="30% Battery" />
          </div>

          <div className="body-widgets flex">
            <div className="widget-col col-left flex">
              <div className="widget" id="micPhone">
                <div className="help" />
                <div className="tip">
                  I'm just a tooltip. I'm just a tooltip. I'm just a tooltip.
                  I'm just a tooltip. I'm just a tooltip.
                </div>

                <div className="title">
                  microphone
                  <div className="switch on switch-slider" id="swPhone">
                    <div className="handle" />
                  </div>
                </div>

                <div className="h2-title">mic volume</div>
                <div className="slider-container" id="slPhone">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="55"
                    step="1"
                    className="slider"
                    id="slPhoneRange"
                  />
                </div>

                <div className="h2-title mt20">
                  mic sensitivity
                  <div className="switch on switch-slider" id="swSensi">
                    <div className="handle" />
                  </div>
                </div>
                <div className="h2-body">
                  Adjust this setting to remove unwanted background noise or
                  increase the amount of mic output heard
                </div>
                <div className="slider-container" id="slSensi">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="55"
                    step="1"
                    className="slider"
                    id="slSensiRange"
                  />
                </div>
              </div>
            </div>

            <div className="widget-col col-right flex">
              <div className="widget" id="micSidetone">
                <div className="help" />
                <div className="tip">
                  I'm just a tooltip. I'm just a tooltip. I'm just a tooltip.
                  I'm just a tooltip. I'm just a tooltip.
                </div>
                <div className="title">
                  sidetone
                  <div className="switch switch-slider" id="swSide">
                    <div className="handle" />
                  </div>
                </div>
                <div className="slider-container" id="slSide">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slSideRange"
                  />
                </div>
              </div>
              <div className="widget" id="micEnhance">
                <div className="help" />
                <div className="tip">
                  I'm just a tooltip. I'm just a tooltip. I'm just a tooltip.
                  I'm just a tooltip. I'm just a tooltip.
                </div>
                <div className="title">enhancements</div>

                <div className="check-item">
                  <input type="checkbox" id="checkNorm" />
                  <label htmlFor="checkNorm" className="check-box">
                    <div className="check-text">Volume Normalization</div>
                  </label>
                </div>
                <div className="slider-container" id="slNorm">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slNormRange"
                  />
                </div>

                <div className="check-item">
                  <input type="checkbox" id="checkAmb" />
                  <label htmlFor="checkAmb" className="check-box">
                    <div className="check-text">Ambient Noise Reduction</div>
                  </label>
                </div>
                <div className="slider-container" id="slAmb">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slAmbRange"
                  />
                </div>

                <div className="check-item">
                  <input type="checkbox" id="checkClarity" />
                  <label htmlFor="checkClarity" className="check-box">
                    <div className="check-text">Voice Clarity</div>
                  </label>
                </div>
                <div className="slider-container" id="slClarity">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slClarityRange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="name-bar">razer nari ultimate</div>
      </React.Fragment>
    );
  }
}
export default Mic;
