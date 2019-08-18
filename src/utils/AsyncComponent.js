import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    _isMounted = false;

    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    componentDidMount() {
      this._isMounted = true;
      importComponent().then((mod) => {
        if (this._isMounted) {
          this.setState({
            // 同时兼容ES6和CommonJS的模块
            component: mod.default ? mod.default : mod
          });
        }
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
