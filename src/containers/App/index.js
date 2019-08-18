import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "../../utils/AsyncComponent";
import Loading from "../../components/Loading";
import { getRequestQuantity } from "../../redux/modules/app";
import connectRoute from "../../utils/connectRoute";

const AsyncHome = connectRoute(asyncComponent(() => import("../Home")));
const AsyncLogin = connectRoute(asyncComponent(() => import("../Login")));

class App extends Component {
  render() {
  const { requestQuantity } = this.props;
  return (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route path="/login" component={AsyncLogin} />
        <Route path="/posts" component={AsyncHome} />
      </Switch>
    </Router>
    {requestQuantity > 0 && <Loading />}
  </div>
  );
  }
}

const mapStateToProps = (state, props) => {
  return {
    requestQuantity: getRequestQuantity(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
