import React from 'react';

const Input = props => {
  return (
    <div>
      <input name="txtSearch" type="checkbox" />
      {props.children}
    </div>
  );
};

export default Input;
