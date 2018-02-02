import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

/* Route Components */
import Home from '../containers/Home';
import Callback from '../containers/Callback';
import LoginSplash from '../containers/LoginSplash';

const AppRouter = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginSplash} />
        <Route exact path="/callback" component={Callback} />
      </div>
    </ConnectedRouter>
  )
};

export default AppRouter;
