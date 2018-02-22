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
      <div>
        <h3>Listening Queue ({this.props.episodes.length})</h3>
        <ul>{children}</ul>
      </div>
    )
  }
}

const sortEpisodes = episodes => {
  return episodes.sort((a,b) => {return (a.podcast.title > b.podcast.title) ? 1 : ((b.podcast.title > a.podcast.title) ? -1 : 0)})
    .sort((a,b) => {return (a.episode.date_published > b.episode.date_published) ? 1 : ((b.episode.date_published > a.episode.date_published) ? -1 : 0)})
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    episodes: sortEpisodes(state.inbox.episodes)
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
