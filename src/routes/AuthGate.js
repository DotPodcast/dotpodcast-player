import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import RibbonSplash from '../components/RibbonSplash';
import {
  isUserSignedIn
} from 'blockstack';

const AuthGate = (props) => {
  if (props.userIsAnonymous) {
    // no auth if the user has chosen to be anonymous
    return props.children;
  }

  if(!isUserSignedIn()) {
    return <Redirect to="/login"/>;
  }

  return props.userLoaded ? props.children : (<RibbonSplash> Loading User Details... </RibbonSplash>);
}

const mapStateToProps = state => {
  return {
    userIsAnonymous: !!state.user.anonymous,
    userLoaded: !!state.user.profile 
  }
}

export default connect(mapStateToProps)(AuthGate);
