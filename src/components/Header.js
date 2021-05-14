import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    var currentUser=firebase.auth().currentUser;
    this.state = {
      user:currentUser,
    };

  }

  render() {
    const comments=this.state.comments;

    return (
      <div class="header">
         <h1><a href="https://www.facebook.com/gsmafeking500/">Asociacion scout de Córdoba </a></h1>
        <nav class="navbar navbar-expand-sm">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <h3><Link to="/">Board List</Link></h3>
          </li>
          <li class="nav-item  active">
            <h3><Link to="/user"> Signed as {this.state.user.displayName}</Link></h3>
          </li>
        </ul>
      </nav>
      </div>
    );
  }
}


export default Header;