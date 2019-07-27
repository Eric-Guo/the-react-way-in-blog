import React, { Component } from "react";
import { Route } from "react-router-dom";
import PostList from "./PostList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("userId"),
      username: sessionStorage.getItem("username")
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    // 注销用户
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    this.setState({
      userId: null,
      username: null
    });
  }

  render() {
    const { match } = this.props;
    const { userId } = this.state;
    return (
      <div>
        <Route
          path={match.url}
          exact
          render={props => <PostList userId={userId} {...props} />}
        />
      </div>
    );
  }
}

export default Home;
