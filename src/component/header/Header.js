import React, { useContext } from "react";
import "./Header.scss";
import { Navbar } from "../navbar/Navbar";
import { RateContext } from "../../context/RateContext";

export const Header = () => {
  const { modalShowHandler } = useContext(RateContext);

  return (
    <div className='header'>
      <div className='headerWrap'>
        <div className='logo'>
          <a href='/'>
            <h1>RateApp</h1>
          </a>
        </div>
        <Navbar />
        <div className='person'>
          <i
            className='fa fa-user'
            aria-hidden='true'
            onClick={modalShowHandler}
          ></i>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
