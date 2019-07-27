import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
