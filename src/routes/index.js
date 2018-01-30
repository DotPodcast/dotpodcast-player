import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

/* Route Components */
import Home from '../containers/Home';

const AppRouter = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </ConnectedRouter>
  )
};

export default AppRouter;
