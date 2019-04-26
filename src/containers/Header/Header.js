import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Mic from '../Mic/Mic';
class Header extends Component {
  render() {
    return (
      <div className="nav-tabs flex">
        <div className="nav arrow back" />
        <div className="nav arrow forward disabled" />

        <NavLink className="nav" to="/sound">
          sound
        </NavLink>
        <a className="nav" href="./mixer.html">
          mixer
        </a>
        <a className="nav" href="./enhancement.html">
          enhancement
        </a>
        <a className="nav" href="./eq.html">
          eq
        </a>
        <NavLink activeClassName="active" className="nav " to="/mic">
          mic
        </NavLink>
        <a className="nav" href="./lighting.html">
          lighting
        </a>
        <a className="nav" href="./power.html">
          power
        </a>

        <div className="user">
          <div className="avatar" />
        </div>
      </div>
    );
  }
}

export default Header;
