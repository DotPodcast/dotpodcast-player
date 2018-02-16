import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/subscription-detail';
import SubscribeButton from './SubscribeButton';
import UnsubscribeButton from './UnsubscribeButton';

class SubscriptionChoice extends Component {
  state = {};

  componentDidMount() {
    this.props.getSubscription(
      this.props.username,
      this.props.podcast.meta_url
    );
  }

  render() {
    if (this.props.requesting) {
      return (<p>Getting subscription info</p>)
    }

    if (this.props.error) {
      return (<p className='text-danger'>{this.props.error.message}</p>)
    }

    if(this.props.subscription) {
      return (
        <UnsubscribeButton podcast={this.props.podcast} id={this.props.subscription.id} />
      )
    }

    if (this.props.requested && !this.props.subscription) {
      return (
        <SubscribeButton podcast={this.props.podcast} />
      )
    }

    return (
      <p>Will check for subscription in a moment</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    subscription: state.subscriptionDetail.subscription,
    requested: state.subscriptionDetail.requested,
    error: state.subscriptionDetail.error,
    requesting: state.subscriptionDetail.requesting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSubscription: (username, url) => {
      dispatch(actions.detailRequestedByURL(username, url));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionChoice);
