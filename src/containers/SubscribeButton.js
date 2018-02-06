import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions } from '../reducers/subscription-list';

class SubscribeButton extends Component {
  render() {
    if(this.props.error && this.props.feedURL === this.props.podcast.meta_url) {
      return (
        <Button bsStyle='danger' disabled>Unable to subscribe</Button>
      )
    }

    if(this.props.requesting && this.props.feedURL === this.props.podcast.meta_url) {
      return (
        <Button bsStyle='success' disabled>Subscribing</Button>
      )
    }

    if(this.props.complete && this.props.feedURL === this.props.podcast.meta_url) {
      return (
        <Button bsStyle='success' disabled>Subscribed</Button>
      )
    }

    return (
      <Button bsStyle='success' onClick={this.subscribe}>Subscribe to {this.props.podcast.title}</Button>
    )
  }

  subscribe = () => {
    this.props.addPodcast(
      this.props.username,
      this.props.podcast.meta_url
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    error: state.subscriptionList.error,
    feedURL: state.subscriptionList.feedURL,
    requesting: state.subscriptionList.requesting,
    complete: state.subscriptionList.complete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPodcast: (username, feedURL) => {
      dispatch(actions.addRequested(username, feedURL));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);
