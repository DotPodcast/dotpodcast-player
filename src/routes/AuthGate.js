import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import RibbonSplash from '../components/RibbonSplash';
import {
  isUserSignedIn
} from 'blockstack';

const AuthGate = (props) => {
  if(!isUserSignedIn()) {
    return <Redirect to="/login"/>;
  }

  return props.userLoaded ? props.children : (<RibbonSplash> Loading User Details... </RibbonSplash>);
}

const mapStateToProps = state => {
  return {
    userLoaded: !!state.user.profile
  }
}

export default connect(mapStateToProps)(AuthGate);
