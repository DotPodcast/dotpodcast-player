import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions } from '../reducers/subscription-list';

class UnsubscribeButton extends Component {
  render() {
    if(this.props.error && this.props.subscriptionID === this.props.id) {
      return (
        <Button bsStyle='danger' disabled>Unable to subscribe</Button>
      )
    }

    if(this.props.requesting && this.props.subscriptionID === this.props.id) {
      return (
        <Button bsStyle='warning' disabled>Unubscribing</Button>
      )
    }

    if(this.props.complete && this.props.subscriptionID === this.props.id) {
      return (
        <Button bsStyle='warning' disabled>Unsubscribed</Button>
      )
    }

    return (
      <Button bsStyle='warning' onClick={this.unsubscribe}>Unsubscribe from {this.props.podcast.title}</Button>
    )
  }

  unsubscribe = () => {
    this.props.removePodcast(
      this.props.username,
      this.props.id
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    error: state.subscriptionList.error,
    subscriptionID: state.subscriptionList.id,
    requesting: state.subscriptionList.requesting,
    complete: state.subscriptionList.complete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removePodcast: (username, feedURL) => {
      dispatch(actions.removeRequested(username, feedURL));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnsubscribeButton);
