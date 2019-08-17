import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import asyncComponent from "../../utils/AsyncComponent";
import connectRoute from "../../utils/connectRoute";

const AsyncHome = connectRoute(asyncComponent(() => import("../Home")));
const AsyncLogin = connectRoute(asyncComponent(() => import("../Login")));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route path="/login" component={AsyncLogin} />
        <Route path="/posts" component={AsyncHome} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
