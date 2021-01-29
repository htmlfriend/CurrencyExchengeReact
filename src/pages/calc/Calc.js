import React from "react";
import { Counter } from "../../component/counter/Counter";
import { CountResult } from "../../component/countResult/CountResult";
import "./Calc.scss";

export const Calc = () => {
  return (
    <div className='calculator'>
      <div className='calculatorContainer'>
        <Counter />
        <CountResult />
      </div>
    </div>
  );
};
