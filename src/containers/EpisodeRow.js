import React, { Component } from 'react';
import MiniPlayButton from '../components/MiniPlayButton';
import { anonymousPlayAlert } from '../utils/alerts'
import { actions } from '../reducers/media';
import { connect } from 'react-redux';
import { Row, Col, Grid } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';


class EpisodeRow extends Component {
  constructor() {
    super();

    this.state = {
      showPlay: false,
    };
  }

  handleMediaRequest = (podcast, episode) => {
    this.props.requestMedia(this.props.userPublicKey, podcast, episode);
  }

  render() {
    let durationText = '';
    if(this.props.episode.content_audio) {
      // This is a bit of a hack and only works well when the audio in question is less than an hour.
      // For some reason, moment.js hasn't added duration formatting in the last 5 years, so hack away.
      durationText = moment.utc(this.props.episode.content_audio.duration * 1000).format('HH:mm:ss');
    }

    return (
      <Row className={css(styles.row)} onMouseOver={() => this.setState({showPlay: true})} onMouseOut={() => this.setState({showPlay: false})}>
        <Col xs={1} className={css(styles.cell, styles.playCell)}>
          <div className={css(styles.hiddenPlay, (this.props.userHasTouched || this.state.showPlay) && styles.visiblePlay)}>
            <MiniPlayButton
              podcast={this.props.podcast}
              episode={this.props.episode}
              action={this.handleMediaRequest}
            />
          </div>
        </Col>
        <Col xs={8} sm={5} className={css(styles.cell, styles.cellPrimary)}>
          {this.props.episode.title}
        </Col>
        <Col xsHidden sm={4} className={css(styles.cell)}>
          {this.props.episode.date_published && moment(this.props.episode.date_published).format('MMMM Do, YYYY')}
        </Col>
        <Col xs={3} smHidden mdHidden lgHidden className={css(styles.cell)}>
          {this.props.episode.date_published && moment(this.props.episode.date_published).format('L')}
        </Col>
        <Col xsHidden sm={2} className={css(styles.cell)}>
          {durationText}
        </Col>
      </Row>
    )
  }
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #444',
    ':hover': {
      backgroundColor: '#1f1f1f',
    },
  },
  playCell: {
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
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    userIsAnonymous: state.user.anonymous,
    userPublicKey: state.user.publicKey,
    userHasTouched: state.behaviors.touched,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestMedia: (userPublicKey, podcast, episode) => {
      dispatch(
        actions.mediaRequested(userPublicKey, userPublicKey, podcast, episode)
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeRow);
