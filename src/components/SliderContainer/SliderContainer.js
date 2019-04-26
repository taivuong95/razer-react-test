import React from 'react';
import Slider from '../Slider/Slider';

const SliderContainer = props => {
  return (
    <>
      <div className="h2-title">{props.sliderContainTitle}</div>
      <div className="slider-container" id={props.idSliderContain}>
        <Slider idSlider={props.idSlider} />
      </div>
    </>
  );
};

export default SliderContainer;
