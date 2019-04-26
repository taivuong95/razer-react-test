import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Mic from '../Mic/Mic';
import Sound from '../Sound/Sound';
import Header from '../Header/Header';
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div>
            <Header />
            <Route path="/" exact component={Mic} />
            <Route path="/sound" exact component={Sound} />
            <Route path="/mic/" exact component={Mic} />
            <Redirect from="/" to="/mic" />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
