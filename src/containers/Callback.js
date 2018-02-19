import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  isSignInPending,
  isUserSignedIn
} from 'blockstack';
import { actions } from '../reducers/user'
import RibbonSplash from '../components/RibbonSplash';


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
      <RibbonSplash>
        <h3>Loading User Data...</h3>
      </RibbonSplash>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: isUserSignedIn(),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLoginCallback: () => dispatch(actions.handleLoginCallback())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
