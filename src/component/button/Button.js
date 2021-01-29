import React from "react";
import "./Button.scss";

export const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className='btn'
      onClick={() => (props.click ? props.click(props.arg || "") : undefined)}
    >
      {props.text}
    </button>
  );
};
