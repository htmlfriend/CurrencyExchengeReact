import React, { Fragment, useContext } from "react";
import { RateContext } from "../../context/RateContext";
import { Button } from "../button/Button";
import "./Register.scss";

export const Register = () => {
  const { renderInputs } = useContext(RateContext);
  return (
    <Fragment>
      <div className='modalForm'>{renderInputs()}</div>
      <div className='modalBtn'>
        <Button text='register' />
      </div>
    </Fragment>
  );
};
