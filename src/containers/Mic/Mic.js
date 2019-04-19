import React from 'react';
import classes from './Mic.css';
class Mic extends React.Component {
  componentDidMount() {
    window.init();
  }
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      hasDelete: false,
      itemSelected: { id: 5, name: 'profile 5', class: 'option' },
      profileArr: [
        { id: 1, name: 'Default profile', class: 'option' },
        { id: 2, name: 'profile 2', class: 'option' },
        { id: 3, name: 'profile 3', class: 'option' },
        { id: 4, name: 'profile 4', class: 'option' },
        { id: 5, name: 'profile 5', class: 'option' },
        { id: 6, name: 'profile 6', class: 'option' },
        { id: 7, name: 'profile 7', class: 'option' },
      ],
    };
    this.toggle = this.toggle.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
  }

  toggle = () => {
    this.setState({ isClick: !this.state.isClick });
  };

  deleteToggle = () => {
    this.setState({ hasDelete: !this.state.hasDelete });
  };

  handleAddList() {
    let lists = this.state.profileArr;
    let pro = {
      id: this.state.profileArr.length + 1,
      name: 'New Profile',
      class: 'option selected',
    };
    lists.push(pro);
    lists[this.state.profileArr.length - 2].class = 'option';
    // assign a name of list to item list
    this.setState({
      profileArr: lists,
      itemSelected: pro,
    });
  }

  confirmDelete() {
    this.setState({ hasDelete: !this.state.hasDelete });
  }

  changeSelected = () => {
    let lists = this.state.profileArr;
    lists.forEach(element => {
      if (element.class === 'selected') {
        this.setState({
          itemSelected: element,
        });
      }
    });
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

            <input type="text" name="profile" id="profileEdit" maxLength="25" />

            <div className="dropdown-area">
              <div id="profileDrop" className="s3-dropdown">
                <div className="selected">{this.state.itemSelected.name}</div>
                <div className="icon expand" />
              </div>
              <div id="profileDropOpt" className="s3-options flex">
                {/* <div className="option">default profile</div>
<div className="option" on>profile 2</div>
<div className="option">profile 3</div>
<div className="option">profile 4</div>
<div className="option selected">profile 5</div>
<div className="option">profile 6</div>
<div className="option">profile 7</div>
<div className="option">profile 8</div> */}
                {this.state.profileArr.map(function(d) {
                  return (
                    <div className={d.class} key={d.id}>
                      {d.name}
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
              onClick={this.toggle}
            >
              <div
                className={
                  this.state.isClick ? 'profile-act show' : 'profile-act'
                }
                id="profileMenu"
              >
                <div className="act action" onClick={this.handleAddList}>
                  add
                </div>
                <div className="act action">import</div>
                <div className="act divider" />
                <div className="act action">rename</div>
                <div className="act action">duplicate</div>
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
                onClick={this.confirmDelete}
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
