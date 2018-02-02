import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Layout from '../containers/Layout';

/* Route Components */
import Home from '../containers/Home';
import PodcastDetail from '../containers/PodcastDetail';
import Callback from '../containers/Callback';
import LoginSplash from '../containers/LoginSplash';

const InLayoutRouter = (props) => {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/:slug" component={PodcastDetail} />
    </Layout>
  )
}

const AppRouter = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginSplash} />
          <Route exact path="/callback" component={Callback} />
          <Route path="/" component={InLayoutRouter} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
};

export default AppRouter;
