import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./Layout.scss";
import { AddClass } from "../../hoc/AddClass";
import Header from "../header/Header";
import { Home } from "../../pages/home/Home";
import { Sample } from "../../pages/sample/Sample";
import { Info } from "../../pages/info/Info";
import { Calc } from "../../pages/calc/Calc";
import { Sidebar } from "../sidebar/Sidebar";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div className='content'>
        <div className='routes'>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/calc' render={() => <Calc />} />
            <Route path='/sample' component={Sample} />
            <Route path='/info' component={Info} />
          </Switch>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default AddClass(Layout, "layout");
