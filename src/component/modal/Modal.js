import React, { Fragment } from "react";
// import { Login } from "../login/Login";
import { Register } from "../register/Register";
import "./Modal.scss";

export const Modal = () => {
  return (
    <div className='modal'>
      <Fragment>
        <div className='modalHead'>
          <ul>
            <li>Enter</li>
            <li>Registration</li>
          </ul>
          <i className='fa fa-times' aria-hidden='true' />
        </div>
        <hr />
      </Fragment>
      {/* <Login /> */}
      <Register />
    </div>
  );
};
