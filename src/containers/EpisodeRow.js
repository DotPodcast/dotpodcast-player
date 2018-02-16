import React, { Component } from 'react';
import MiniPlayButton from '../components/MiniPlayButton';
import { actions } from '../reducers/media';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EpisodeRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <MiniPlayButton username={this.props.username} url={this.props.episode.content_audio.url} podcast={this.props.podcast} episode={this.props.episode} action={this.props.requestMedia} />
        </td>
        <td>
          <Link to='/'>{this.props.episode.title}</Link>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestMedia: (username, podcast, episode) => {
      dispatch(
        actions.mediaRequested(username, podcast, episode)
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeRow);
