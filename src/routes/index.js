import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

/* Route Components */
import Home from '../containers/Home';
import PodcastDetail from '../containers/PodcastDetail';
import Callback from '../containers/Callback';
import LoginSplash from '../containers/LoginSplash';

const AppRouter = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginSplash} />
          <Route exact path="/callback" component={Callback} />
          <Route exact path="/:slug" component={PodcastDetail} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
};

export default AppRouter;
