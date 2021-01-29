import React from "react";
import "./Input.scss";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && touched && shouldValidate;
}

export const Input = (props) => {
  const cls = ["modalInput", "class"];
  const inputType = props.type || "text";
  const htmlFor = `${props.type} - ${Math.random()}`;
  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || "enter the right value"}</span>
      ) : null}
      {/* <span>{props.errorMessage}</span> */}
    </div>
  );
};
