import React, { Component } from "react";
import "./Header.scss";
import { Navbar } from "../navbar/Navbar";

export class Header extends Component {
  render() {
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
            <i className='fa fa-user' aria-hidden='true'></i>
            <a href='/login'>Login</a>
            <span>Hello, stranger</span>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default Header;
