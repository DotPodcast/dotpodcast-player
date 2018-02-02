import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  isSignInPending,
  handlePendingSignIn,
} from 'blockstack';


class Callback extends Component {
  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        console.log(userData);
      });
    }
  }
  render() {
    return (
      <div>
        Loading User Data...
      </div>
    );
  }
}



export default connect()(Callback);
