import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actions as authActions, getLoggedUser } from "../../redux/modules/auth";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "jack",
      password: "123456",
      redirectToReferrer: false   // 是否重定向到之前的页面
    };
  }

  componentDidUpdate(nextProps) {
    const isLoggedIn = !this.props.user.userId && nextProps.user.userId;
    if (isLoggedIn) {
      this.setState({
        redirectToReferrer: true
      });
    }
  }

  // 处理用户名、密码的变化
  handleChange = e => {
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.name === "password") {
      this.setState({
        password: e.target.value
      });
    } else {
      // do nothing
    }
  };

  // 提交登录表单
  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if (username.length === 0 || password.length === 0) {
      alert("用户名或密码不能为空！");
      return;
    }
    // 如果当前已有用户登录，先注销
    if (this.props.user && this.props.user.userId) {
      this.props.logout();
    }
    this.props.login(username, password);
  };

  render() {
    // from 保存跳转到登录页前的页面路径，用于在登录成功后重定向到原来页面
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    // 登录成功后，redirectToReferrer为true，使用Redirect组件重定向页面
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div>
          <label>
            用户名：
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            密码：
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <input type="submit" value="登录" />
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
