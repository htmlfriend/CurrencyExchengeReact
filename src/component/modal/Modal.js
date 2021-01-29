import React, { Fragment, useState, useContext } from "react";
import { RateContext } from "../../context/RateContext";
// import { Button } from "../button/Button";
import { Login } from "../login/Login";
import { Register } from "../register/Register";
import "./Modal.scss";

export const Modal = () => {
  const [value, setValue] = useState("login");
  const { state, modalHideHandler } = useContext(RateContext);
  const cls = ["modal"];
  const windowHandler = (id) => {
    setValue(id);
  };

  const links = [
    {
      name: "Login",
      id: "login",
    },
    { name: "Register", id: "register" },
  ];

  if (state.showModal) {
    cls.push("modalShow");
  }
  return (
    <div className={cls.join(" ")}>
      <Fragment>
        <div className='modalHead'>
          <ul>
            {links.map((item, idx) => {
              return (
                <li
                  key={item.name}
                  onClick={() => windowHandler(item.id)}
                  style={{
                    fontWeight: item.id === value ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
          <i
            className='fa fa-times'
            aria-hidden='true'
            onClick={modalHideHandler}
            style={{ cursor: "pointer" }}
          />
        </div>
        <hr />
      </Fragment>
      <h2 className='error'>{state.error}</h2>
      {value === "register" ? <Register /> : <Login />}

      <div className='error'>
        <h1>We do not collect your email and your password!</h1>
        <p>Your data will be removed during few days!</p>
      </div>
    </div>
  );
};
