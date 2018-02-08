import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/inbox';
import EpisodeRow from '../containers/EpisodeRow';

class Inbox extends Component {
  state = {}

  componentDidMount() {
    this.props.getInbox(this.props.username)
  }

  render() {
    let children = this.props.episodes.map(
      item => (
        <EpisodeRow podcast={item.podcast} episode={item.episode} />
      )
    )

    return (
      <ul>{children}</ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    episodes: state.inbox.episodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInbox: function(username) {
      dispatch(actions.inboxRequested(username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
