import React from 'react';

const Slider = props => {
  return (
    <input
      type="range"
      min="10"
      max="100"
      defaultValue="55"
      step="1"
      className="slider"
      id={props.idSlider}
    />
  );
};

export default Slider;
