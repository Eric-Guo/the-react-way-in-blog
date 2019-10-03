import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/posts" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
