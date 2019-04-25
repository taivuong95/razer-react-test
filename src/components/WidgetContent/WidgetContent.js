import React from 'react';
import SwitchSlider from '../SwitchSlider/SwitchSlider';
import SliderContainer from '../SliderContainer/SliderContainer';

const WidgetContent = props => {
  return (
    <>
      <SwitchSlider id={props.idSwitchSlider} name="sidetone" />
      <SliderContainer id={props.idSliderContainer} />
    </>
  );
};

export default WidgetContent;
