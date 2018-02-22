import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { actions } from '../reducers/player';
import ProgressSeeker from '../components/ProgressSeeker';
import EpisodeDetail from '../components/EpisodeDetail';
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

  toggleModal = () => {
    if(this.props.player.detailsVisible) {
      this.props.hideDetail()
    } else {
      this.props.showDetail()
    }
  }

  render() {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate, trackMetadata } = this.props.player;

    if(loaded) {
        console.debug('Duration', duration);
    }

    const detail = (
      <div>
        <h2 className={css(styles.detailHeader)}>
          <small>{trackMetadata.title}<br /></small>
          {trackMetadata.episode}
        </h2>
        <p>{trackMetadata.description}</p>
      </div>
    )

    return (
      <div>
        <div className={css(styles.footerPlayer, this.props.active && styles.footerPlayerActive)}>
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
          <div className={css(styles.meta)} onClick={this.toggleModal}>
            <img className={css(styles.artwork, this.props.player.detailsVisible && styles.largerArtwork)} src={trackMetadata.image_url}></img>
              <span className={css(styles.playerMeta, this.props.player.detailsVisible && styles.hiddenMeta)}>
                <small>{trackMetadata.title}<br /></small>
                {trackMetadata.episode}
              </span>
          </div>
          <div className={css(styles.controls)}>
            <ButtonRow>
              <GlyphButton icon="step-backward" onClick={this.backwardTen} />
              <PlayButton playing={playing} onClick={() => this.props.setPlaying(!playing)} />
              <GlyphButton icon="step-forward" onClick={this.forwardTen} />
            </ButtonRow>

            <ProgressSeeker max={1} value={played} />
          </div>
        </div>
        <EpisodeDetail active={this.props.player.detailsVisible}>
          {this.props.player.detailsVisible && detail}
        </EpisodeDetail>
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
    zIndex: 20
  },
  footerPlayerActive: {
    bottom: 0,
    boxShadow: '0 0 10px black'
  },
  controls: {
    width: '50%',
    margin: '0 auto 25%'
  },
  playPause: {
    backgroundColor: '#333',
    color: '#aaa',
    borderRadius: 15,
    outline: 'none'
  },
  meta: {
    float: 'left',
    width: '25%',
    cursor: 'pointer'
  },
  playerMeta: {
    display: 'none',
    float: 'left',
    marginLeft: 10,
    transition: '.2s',
    '@media (min-width: 960px)': {
      display: 'block'
    }
  },
  hiddenMeta: {
    transform: 'translate(0, -40vw) scale(2, 2)',
    opacity: 0
  },
  artwork: {
    transform: 'scale(1, 1)',
    transformOrigin: 'bottom left',
    transition: '.2s',
    transitionDelay: '.1s',
    width: 56,
    height: 56,
    display: 'block',
    float: 'left'
  },
  largerArtwork: {
    '@media (min-width: 720px)': {
      transform: 'translate(20px, -100px) scale(5.35, 5.35)',
    }
  },
  detailHeader: {
    marginTop: 0
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
    updateProgress: (progress) => dispatch(actions.updateProgress(progress)),
    showDetail: () => dispatch(actions.showDetail()),
    hideDetail: () => dispatch(actions.hideDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
