import React, { Component } from 'react';
import MiniPlayButton from '../components/MiniPlayButton';
import { anonymousPlayAlert } from '../utils/alerts'
import { actions } from '../reducers/media';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';


class EpisodeRow extends Component {
  constructor() {
    super();

    this.state = {
      hovering: false,
    };
  }

  handleMediaRequest = (username, podcast, episode) => {
    if (this.props.userIsAnonymous) {
      anonymousPlayAlert(this.props.userIsAnonymous);
    }
    this.props.requestMedia(username, podcast, episode);
  }

  render() {
    let durationText = '';
    if(this.props.episode.content_audio) {
      // This is a bit of a hack and only works well when the audio in question is less than an hour.
      // For some reason, moment.js hasn't added duration formatting in the last 5 years, so hack away.
      durationText = moment.utc(this.props.episode.content_audio.duration * 1000).format('HH:mm:ss');
    }

    return (
      <tr className={css(styles.row)} onMouseOver={() => this.setState({hovering: true})} onMouseOut={() => this.setState({hovering: false})}>
        <td className={css(styles.cell, styles.playCell)}>
          <div className={css(styles.hiddenPlay, this.state.hovering && styles.visiblePlay)}>
            <MiniPlayButton
              username={this.props.username}
              url={this.props.episode.content_audio.url}
              podcast={this.props.podcast}
              episode={this.props.episode}
              action={this.handleMediaRequest}
            />
          </div>
        </td>
        <td className={css(styles.cell, styles.cellPrimary)}>
          {this.props.episode.title}
        </td>
        <td className={css(styles.cell)}>
          {this.props.episode.date_published && moment(this.props.episode.date_published).format('MMMM Do, YYYY')}
        </td>
        <td className={css(styles.cell)}>
          {durationText}
        </td>
      </tr>
    )
  }
};

const styles = StyleSheet.create({
  row: {
    borderTop: '1px solid #444',
    ':hover': {
      backgroundColor: '#1f1f1f',
    },
  },
  playCell: {
    width: 60,
  },
  cellPrimary: {
    color: '#ddd',
  },
  cell: {
    color: '#bbb',
    paddingTop: 5,
    paddingBottom: 5,
  },
  hiddenPlay: {
    visibility: 'hidden',
  },
  visiblePlay: {
    visibility: 'visible',
  }
});

const mapStateToProps = state => {
  return {
    userIsAnonymous: state.user.anonymous,
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
