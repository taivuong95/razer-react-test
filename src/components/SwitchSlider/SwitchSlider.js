import React from 'react';

const SwitchSlider = props => {
  return (
    <>
      <div className={props.classSwitch}>
        {props.nameSwitch}
        <div className="switch switch-slider" id={props.idSwitch}>
          <div className="handle" />
        </div>
      </div>
    </>
  );
};

export default SwitchSlider;
