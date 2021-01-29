import React, { useContext } from "react";
import { RateContext } from "../../context/RateContext";
import "./Sidebar.scss";

export const Sidebar = () => {
  const { state } = useContext(RateContext);
  return (
    <div className='sidebar'>
      <div className='sidebarHead'>
        <h3>All currentcies</h3>
      </div>
      <div className='sidebarContent'>
        <ul>
          {Object.keys(state.currency).map((item, idx) => (
            <li key={item}>
              <p>
                <span>
                  <img src={state.currency[item].flag} alt={item} />
                  &nbsp;{item}
                </span>
                &nbsp;{state.currency[item].name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
