import React from 'react';

const SwitchSlider = props => {
  return (
    <>
      <div className="title">
        {props.name}
        <div className="switch switch-slider" id={props.id}>
          <div className="handle" />
        </div>
      </div>
      <div className="h2-title">mic volume</div>
    </>
  );
};

export default SwitchSlider;
