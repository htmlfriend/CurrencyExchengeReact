import React, { useContext } from "react";
import { Button } from "../../component/button/Button";
import { RateContext } from "../../context/RateContext";

import "./Sample.scss";

/**
 *  // for databases
 */

export const Sample = () => {
  const {
    state,
    baseHandler,
    base2Handler,
    sampleDateHandler,
    dataWrite,
    sampleRemove,
  } = useContext(RateContext);
  return (
    <div className='sample'>
      <div className='sampleContainer'>
        <div>
          <h3>
            To get rates : &nbsp;
            <select onChange={baseHandler} value={state.sample.base}>
              {Object.keys(state.currency).map((item, idx) => {
                return <option key={item}>{item}</option>;
              })}
            </select>
            &nbsp; &nbsp; to &nbsp; &nbsp;
            <select onChange={base2Handler} value={state.sample.base2}>
              {Object.keys(state.currency).map((item, idx) => {
                return <option key={item}>{item}</option>;
              })}
            </select>
          </h3>
        </div>
        <div className='sampleHead'>
          <span>
            Data : <input type='date' onChange={sampleDateHandler} />
          </span>
          <Button text='Get the rate' click={dataWrite} arg={state.sample} />
        </div>
        <div className='sampleResult'>
          <ul>
            {Object.keys(state.sampleList).map((item, idx) => {
              // item = id from the database
              return (
                <li key={item}>
                  <span>
                    <img
                      src={state.currency[state.sampleList[item].base].flag}
                      alt={item}
                    />
                    &nbsp;{state.sampleList[item].base}
                  </span>
                  <span>{state.sampleList[item].date}</span>
                  <span>{`${state.sampleList[item].course} ${state.sampleList[item].base2}`}</span>
                  <Button text='Remove' click={sampleRemove} arg={item} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
