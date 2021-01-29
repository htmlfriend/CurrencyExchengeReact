import React, { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./Layout.scss";
import { AddClass } from "../../hoc/AddClass";
import Header from "../header/Header";
import { Home } from "../../pages/home/Home";
import { Sample } from "../../pages/sample/Sample";
import { Info } from "../../pages/info/Info";
import { Calc } from "../../pages/calc/Calc";
import { Sidebar } from "../sidebar/Sidebar";
import { Footer } from "../footer/Footer";
import { RateContext } from "../../context/RateContext";

const Layout = () => {
  const { state } = useContext(RateContext);
  return (
    <Fragment>
      <Header />
      <div className='wrapper'>
        <div className='content'>
          <div className='routes'>
            <Switch>
              <Route path='/' exact={true} component={Home} />
              <Route path='/calc' render={() => <Calc />} />
              <Route path='/sample' component={Sample} />
              <Route path='/info' component={Info} />
            </Switch>
            <h2>
              You are watching the site like &nbsp; - &nbsp;
              {state.auth ? (
                <p> the authotorized user</p>
              ) : (
                <p> None authotarized user</p>
              )}
            </h2>
          </div>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default AddClass(Layout, "layout");
