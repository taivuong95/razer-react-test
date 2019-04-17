import React from 'react';
import Input from '../../components/Input/Input';
import './Mic.css';
class Mic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClick: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {}

  toggle = () => {
    this.setState({ isClick: !this.state.isClick });
  };

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

            <input
              type="text"
              name="profile"
              id="profileEdit"
              maxLength="25"
              className=""
            />

            <div className="dropdown-area">
              <div id="profileDrop" className="s3-dropdown">
                <div className="selected">profile 7</div>
                <div className="icon expand" />
              </div>
              <div
                id="profileDropOpt"
                className="s3-options flex"
                style={{ bottom: 'unset', top: '27px' }}
              >
                <div className="option">default profile</div>
                <div className="option ">profile 2</div>
                <div className="option ">profile 3</div>
                <div className="option">profile 4</div>
                <div className="option ">profile 5</div>
                <div className="option">profile 6</div>
                <div className="option selected">profile 7</div>
              </div>
            </div>

            <div className="dots3 hover-border" id="profileMenuToggle">
              <div className="profile-act" id="profileMenu">
                <div className="act action">add</div>
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
                <div className="slider-container on" id="slPhone">
                  <div className="foot min">low</div>
                  <div className="foot mid">medium</div>
                  <div className="foot max">high</div>
                  <div
                    id="slPhoneFill"
                    className="left"
                    style={{ width: '260px' }}
                  />
                  <div className="track" />
                  <div
                    id="slPhoneTip"
                    className="slider-tip"
                    style={{ left: '245.258px' }}
                  >
                    55
                  </div>
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
                <div className="slider-container on" id="slSensi">
                  <div className="foot min">low</div>
                  <div className="foot mid">medium</div>
                  <div className="foot max">high</div>
                  <div
                    id="slSensiFill"
                    className="left"
                    style={{ width: '260px' }}
                  />
                  <div className="track" />
                  <div
                    id="slSensiTip"
                    className="slider-tip"
                    style={{ left: '245.258px' }}
                  >
                    55
                  </div>
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
                  <div className="foot min">0</div>
                  <div className="foot mid">medium</div>
                  <div className="foot max">100</div>
                  <div
                    id="slSideFill"
                    className="left"
                    style={{ width: '260px' }}
                  />
                  <div className="track" />
                  <div
                    id="slSideTip"
                    className="slider-tip"
                    style={{ left: '245.258px' }}
                  >
                    50
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slSideRange"
                    disabled=""
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
                  <input type="checkbox" id="checkNorm" onClick={this.toggle} />
                  <label htmlFor="checkNorm" className="check-box">
                    <div className="check-text">Volume Normalization</div>
                  </label>
                </div>
                <div
                  className="slider-container"
                  id={this.state.isClick ? 'slNormOn' : 'slNorm'}
                >
                  <div className="foot min">low</div>
                  <div className="foot mid">medium</div>
                  <div className="foot max">high</div>
                  <div
                    id="slNormFill"
                    className="left"
                    style={{ width: '218.667px' }}
                  />
                  <div className="track" />
                  <div
                    id="slNormTip"
                    className="slider-tip"
                    style={{ left: '203.924px' }}
                  >
                    50
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slNormRange"
                    disabled=""
                  />
                </div>

                <div className="check-item">
                  <input type="checkbox" id="checkAmb" />
                  <label htmlFor="checkAmb" className="check-box">
                    <div className="check-text">Ambient Noise Reduction</div>
                  </label>
                </div>
                <div className="slider-container" id="slAmb">
                  <div className="foot min">low</div>
                  <div className="foot mid">medium</div>
                  <div className="foot max">high</div>
                  <div
                    id="slAmbFill"
                    className="left"
                    style={{ width: '218.667px' }}
                  />
                  <div className="track" />
                  <div
                    id="slAmbTip"
                    className="slider-tip"
                    style={{ left: '203.924px' }}
                  >
                    50
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slAmbRange"
                    disabled=""
                  />
                </div>

                <div className="check-item">
                  <input type="checkbox" id="checkClarity" />
                  <label htmlFor="checkClarity" className="check-box">
                    <div className="check-text">Voice Clarity</div>
                  </label>
                </div>
                <div className="slider-container" id="slClarity">
                  <div className="foot min">low</div>
                  <div className="foot mid">medium</div>
                  <div className="foot max">high</div>
                  <div
                    id="slClarityFill"
                    className="left"
                    style={{ width: '218.667px' }}
                  />
                  <div className="track" />
                  <div
                    id="slClarityTip"
                    className="slider-tip"
                    style={{ left: '203.924px' }}
                  >
                    50
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="50"
                    step="1"
                    className="slider"
                    id="slClarityRange"
                    disabled=""
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
