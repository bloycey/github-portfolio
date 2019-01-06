import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Profile from "../Profile";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/users/:user" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Router;
