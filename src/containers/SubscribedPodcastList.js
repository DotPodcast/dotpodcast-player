import React, { Component} from 'react';
import { Grid, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../reducers/subscription-list';

class SubscribedPodcastList extends Component {
  state = {}

  render() {
    if(this.props.error) {
      return (
        <Alert bsStyle='danger'>{this.props.error.message}</Alert>
      )
    }

    if(this.props.podcasts) {
      const renderedList = this.props.podcasts.map(
        (podcast) => (
          <Alert bsStyle='info'>{podcast.name}</Alert>
        )
      )

      return (
        <Grid>{renderedList}</Grid>
      )
    }

    if(this.props.requesting) {
      return (<div>Loading podcast list...</div>)
    }

    return (<center>Loading...</center>)
  }
}

const mapStateToProps = state => {
  return {
    podcasts: state.subscriptionList.podcasts,
    requesting: state.subscriptionList.requesting,
    error: state.subscriptionList.error,
    userID: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getList: (url) => {
      dispatch(actions.listRequested(url));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribedPodcastList);
