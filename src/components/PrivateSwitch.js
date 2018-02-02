import React from 'react';
import { Redirect, Switch } from 'react-router-dom'
import {
  isUserSignedIn
} from 'blockstack';

const PrivateSwitch = (props) => {
  if(isUserSignedIn()) {
    return (
      <Switch>
        {props.children}
      </Switch>
    )
  }
  return <Redirect to="/login"/>;
}

export default PrivateSwitch;
