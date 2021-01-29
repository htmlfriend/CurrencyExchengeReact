import React, { Fragment, useContext } from "react";
import { RateContext } from "../../context/RateContext";
import { Button } from "../button/Button";
import "./Login.scss";

export const Login = () => {
  const { renderInputs } = useContext(RateContext);
  return (
    <Fragment>
      <div className='modalForm'>{renderInputs()}</div>
      <div className='modalBtn'>
        <Button text='enter' />
      </div>
    </Fragment>
  );
};
