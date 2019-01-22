import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Profile from "../Profile";
import FourOhFour from "./FourOhFour";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/users/:user" component={Profile} />
      <Route path="/users/*" component={Profile} />
      <Route component={FourOhFour} />
    </Switch>
  </BrowserRouter>
);

export default Router;
