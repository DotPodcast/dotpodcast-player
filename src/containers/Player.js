import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, ProgressBar } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { actions } from '../reducers/player';
import ProgressSeeker from '../components/ProgressSeeker';
import './player.css';

class Player extends Component {
  ref = (player) => {
    this.player = player;
  }
  render() {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.props.player;
    return (
      <div className={this.props.active ? 'footer-player footer-player-active' : 'footer-player'}>
        <Row className='podcast-player-container'>
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
          />
          <Col xs={3}>
            <input type="button" className="play-pause" disabled={!url} value={playing ? 'Pause' : 'Play'} onClick={() => this.props.setPlaying(!playing)}/>
          </Col>
          <Col xs={6}>
            <ProgressSeeker max={1} value={played} />
          </Col>
          <Col xs={3}>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaying: (isPlaying) => dispatch(actions.setPlaying(isPlaying)),
    updateProgress: (progress) => dispatch(actions.updateProgress(progress))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

