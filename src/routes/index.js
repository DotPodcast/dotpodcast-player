import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

/* Route Components */
import App from '../containers/App';

const AppRouter = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </ConnectedRouter>
  )
};

export default AppRouter;
