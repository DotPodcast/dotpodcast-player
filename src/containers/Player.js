import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { toReadableTime } from '../utils/time';
import ReactPlayer from 'react-player';
import { actions } from '../reducers/player';
import ProgressSeeker from '../components/ProgressSeeker';
import { StyleSheet, css } from 'aphrodite';
import ButtonRow from '../components/ButtonRow';
import PlayButton from '../components/PlayButton';
import GlyphButton from '../components/GlyphButton';

class Player extends Component {
  ref = (player) => {
    this.player = player;
  }

  forwardTen = () => {
    const newPosition = Math.min(this.player.getCurrentTime() + 10, this.player.getDuration());
    this.player.seekTo(newPosition);
  }

  backwardTen = () => {
    const newPosition = Math.max(this.player.getCurrentTime() - 10, 0);
    this.player.seekTo(newPosition);
  }

  render() {
    const { url, playing, volume, muted, loop, played, playedSeconds, loaded, duration, playbackRate } = this.props.player;

    const displayDuration = toReadableTime(duration * 1000);

    return (
      <div className={css(styles.footerPlayer, this.props.active && styles.footerPlayerActive)}>
        <Row>
          <ReactPlayer
            height='0'
            url={url}
            playing={playing}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            loop={loop}
            ref={this.ref}
            onProgress={this.props.updateProgress}
            onDuration={this.props.setDuration}
          />
          <Col xs={3}>
          </Col>
          <Col xs={6}>
            <ButtonRow>
              <GlyphButton icon="step-backward" onClick={this.backwardTen} />
              <PlayButton playing={playing} onClick={() => this.props.setPlaying(!playing)} />
              <GlyphButton icon="step-forward" onClick={this.forwardTen} />
            </ButtonRow>
            <ProgressSeeker max={1} value={played} playedSeconds={toReadableTime(playedSeconds)} duration={toReadableTime(duration)}/>
          </Col>
          <Col xs={3}>
          </Col>
        </Row>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  footerPlayer: {
    position: 'fixed',
    width: '100%',
    bottom: -100,
    left: 0,
    height: 100,
    padding: 20,
    backgroundColor: '#222',
    transition: '.2s',
  },
  footerPlayerActive: {
    bottom: 0,
    boxShadow: '0 0 10px black'
  },
  playPause: {
    backgroundColor: '#333',
    color: '#aaa',
    borderRadius: 15,
    outline: 'none'
  }
})

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPlaying: (isPlaying) => dispatch(actions.setPlaying(isPlaying)),
    setDuration: (duration) => dispatch(actions.setDuration(duration)),
    updateProgress: (progress) => dispatch(actions.updateProgress(progress))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
