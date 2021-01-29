import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>main</NavLink>
        </li>
        <li>
          <NavLink to='/calc'>calculate</NavLink>
        </li>
        <li>
          <NavLink to='/sample'>reducer</NavLink>
        </li>
        <li>
          <NavLink to='/info'>information</NavLink>
        </li>
      </ul>
    </nav>
  );
};
