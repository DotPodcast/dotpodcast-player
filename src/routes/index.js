import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import PrivateSwitch from '../components/PrivateSwitch';
import { ConnectedRouter } from 'react-router-redux';
import Layout from '../containers/Layout';
import { actions } from '../reducers/startup';

/* Route Components */
import Home from '../containers/Home';
import PodcastDetail from '../containers/PodcastDetail';
import Callback from '../containers/Callback';
import LoginSplash from '../containers/LoginSplash';

const InLayoutRouter = (props) => {
  return (
    <Layout>
      <PrivateSwitch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:slug" component={PodcastDetail} />
      </PrivateSwitch>
    </Layout>
  )
}

class AppRouter extends Component {
  componentDidMount() {
    this.props.startup();
  }
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginSplash} />
            <Route exact path="/callback" component={Callback} />
            <Route path="/" component={InLayoutRouter} />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    startup: () => dispatch(actions.startup())
  }
}

export default connect(undefined, mapDispatchToProps)(AppRouter);
