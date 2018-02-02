import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  redirectToSignIn,
} from 'blockstack';


class LoginSplash extends Component {
  handleLogin() {
    redirectToSignIn(`${window.location.origin}/callback`);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleLogin}>Login with Blockstack</button>
      </div>
    );
  }
}



export default connect()(LoginSplash);
