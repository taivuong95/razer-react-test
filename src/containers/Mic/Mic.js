import React from 'react';
import './Mic.css';
class Mic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listProfile: [
        { name: 'default profile', class: 'option' },
        { name: 'profile 2', class: 'option' },
        { name: 'profile 3', class: 'option' },
        { name: 'profile 4', class: 'option' },
        { name: 'profile 5', class: 'option' },
        { name: 'profile 6', class: 'option' },
        { name: 'profile 7', class: 'option' },
        { name: 'profile 8', class: 'option' },
      ],
      itemSelected: {},
      isClick: false,
      isExpand: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.addProfile = this.addProfile.bind(this);
  }

  toggle = () => {
    this.setState({
      isClick: !this.state.isClick,
    });
  };

  toggleExpand = () => {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };

  addProfile = () => {
    const newProfile = { name: 'New Profile', class: 'option selected' };
    this.state.listProfile.push(newProfile);
    this.setState({
      listProfile: this.state.listProfile,
      itemSelected: newProfile,
    });
  };
  componentDidMount() {
    window.init();
  }

  render() {
    return (
      <div className="main-container">
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
              <div
                id="profileDrop"
                onClick={e => {
                  e.stopPropagation();
                  this.toggleExpand();
                }}
                className={
                  this.state.isExpand ? 's3-dropdown expand' : 's3-dropdown'
                }
              >
                <div className="selected">{this.state.itemSelected.name}</div>
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
                {(this.state.listProfile || []).map((listItem, index) => {
                  return (
                    <div key={index} className={listItem.class}>
                      {listItem.name}
                    </div>
                  );
                })}
                {/* <div className="option">default profile</div>
                <div className="option">profile 2</div>
                <div className="option">profile 3</div>
                <div className="option">profile 4</div>
                <div className="option selected">profile 5</div>
                <div className="option">profile 6</div>
                <div className="option">profile 7</div>
                <div className="option">profile 8</div> */}
              </div>
            </div>

            <div
              className="dots3 hover-border"
              id="profileMenuToggle"
              onClick={this.toggle}
            >
              <div
                className={
                  this.state.isClick ? 'profile-act show' : 'profile-act '
                }
                id="profileMenu"
              >
                <div className="act action" onClick={this.addProfile}>
                  add
                </div>
                <div className="act action">import</div>
                <div className="act divider" />
                <div className="act action">rename</div>
                <div className="act action">duplicate</div>
                <div className="act action">export</div>
                <div className="act divider" />
                <div className="act action" id="deleteAction">
                  delete
                </div>
              </div>
            </div>

            <div id="deleteAlert" className="flex alert profile-del">
              <div className="title">delete profile</div>
              <div className="body-text t-center">
                You're about to delete this profile. All bindings in this
                profile will be deleted.
              </div>
              <div className="thx-btn" id="deleteConfirm">
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
      </div>
    );
  }
}
export default Mic;
