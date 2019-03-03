import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
// import Link from '../../components/Link/Link'
import ReactLink from '../../components/ReactLink/ReactLink';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <ReactLink
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </ReactLink>
        </header>
      </div>
    );
  }
}

export default App;
