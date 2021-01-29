import React, { useContext } from "react";
import { RateContext } from "../../context/RateContext";

import "./Exchange.scss";

export const Exchange = () => {
  const { state } = useContext(RateContext);
  const { currency } = { ...state };
  return (
    <div className='exchange'>
      <div className='exchangeContainer'>
        <div className='exchangeContent'>
          <div>
            <p>
              Base exchangies{" "}
              <span className='exchangeBase'>{state.base} </span>&nbsp; &nbsp;
              Date: <span className='exchangeBase'>{state.date}</span>
            </p>
          </div>
          <ul>
            {Object.keys(currency).map((item, idx) => {
              return (
                <li key={item}>
                  <span>
                    <img src={currency[item].flag} alt={item} />
                    {item}
                  </span>
                  <span>{`1${state.base} = ${currency[item].course} ${item}`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
