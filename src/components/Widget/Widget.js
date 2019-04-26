import React from 'react';
import ToolTip from '../ToolTip/ToolTip';

const Widget = props => {
  return (
    <div className="widget" id={props.idWidget}>
      <ToolTip />
      {props.children}
    </div>
  );
};

export default Widget;
