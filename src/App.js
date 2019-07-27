import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      date: new Date()
    };
    this.updateDate = this.updateDate.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.updateDate, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateDate() {
    this.setState({
      date: new Date()
    });
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {this.state.date.toString()}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
