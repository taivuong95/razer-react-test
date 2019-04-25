import React from 'react';

const SliderContainer = props => {
  return (
    <div className="slider-container" id={props.id}>
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
  );
};

export default SliderContainer;
