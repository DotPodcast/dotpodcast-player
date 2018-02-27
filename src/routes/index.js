import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import AuthGate from './AuthGate';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import Layout from '../containers/Layout';
import { actions } from '../reducers/startup';
import { actions as behaviorsActions } from '../reducers/behaviors';

/* Route Components */
import Home from '../containers/Home';
import PodcastWrapper from '../containers/PodcastWrapper';
import Subscribe from '../containers/Subscribe';
import Callback from '../containers/Callback';
import LoginSplash from '../containers/LoginSplash';
import RibbonSplash from '../components/RibbonSplash';
import Inbox from '../containers/Inbox';
import Search from '../containers/Search';

const InLayoutRouter = (props) => {
  return (
    <AuthGate>
      <PersistGate
        loading={<RibbonSplash>Loading app data...</RibbonSplash>}
        persistor={props.userLoaded && props.startPersistor()}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/subscribe" component={Subscribe} />
            <Route exact path="/inbox" component={Inbox} />
            <Route path="/search" component={Search} />
            <Route exact path="/:slug" component={PodcastWrapper} />
          </Switch>
        </Layout>
      </PersistGate>
    </AuthGate>
  )
}

class AppRouter extends Component {
  componentDidMount() {
    this.props.startup();
    window.addEventListener('touchstart', function onFirstTouch() {
      this.props.touchDetected();
      window.removeEventListener('touchstart', onFirstTouch, false)
    }.bind(this), false);
  }
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginSplash} />
            <Route exact path="/callback" component={Callback} />
            <Route path="/" render={props => <InLayoutRouter {...props} userLoaded={this.props.userLoaded} startPersistor={this.props.startPersistor}/>} />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
};

const mapStateToProps = state => {
  return { 
    userLoaded: !!state.user.profile || state.user.anonymous
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startup: () => dispatch(actions.startup()),
    touchDetected: () => dispatch(behaviorsActions.userTouched()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
