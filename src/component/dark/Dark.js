import React from "react";
import "./Dark.scss";

export const Dark = (props) => {
  const cls = ["dark"];
  if (props.showModal) {
    cls.push("showDark");
  }
  return <div className={cls.join(" ")} onClick={props.modalHideHandler}></div>;
};
