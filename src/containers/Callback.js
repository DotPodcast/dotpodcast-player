import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  isSignInPending,
  isUserSignedIn
} from 'blockstack';
import { actions } from '../reducers/user'


class Callback extends Component {
  componentWillMount() {
    if (isSignInPending()) {
      this.props.handleLoginCallback();
    }
  }
  render() {
    if(this.props.isAuthenticated) {
      return (<Redirect to="/" />);
    }
    return (
      <div>
        Loading User Data...
        {'User is authed? '+this.props.isAuthenticated}
        {'User is loading? '+this.props.loadingUser}
        {'Username is:  '+this.props.username}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.username && isUserSignedIn(),
    loadingUser: state.user.loadingUser,
    username: state.user.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLoginCallback: () => dispatch(actions.handleLoginCallback())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
