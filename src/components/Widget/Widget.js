import React from 'react';
import ToolTip from '../ToolTip/ToolTip';
import WidgetContent from '../WidgetContent/WidgetContent';

const Widget = props => {
  return (
    <div className="widget" id={props.idWidget}>
      <ToolTip />
      <WidgetContent
        idSwitchSlider={props.idSwitchSlider}
        idSliderContainer={props.idSliderContainer}
      />
      {props.children}
    </div>
  );
};

export default Widget;
