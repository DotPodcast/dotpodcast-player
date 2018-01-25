import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { actions } from '../../reducers/player';

class Player extends Component {
  ref = (player) => {
    this.player = player;
  }
  render() {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.props.player;
    return (
      <div className='podcast-player-container'>
        <ReactPlayer
          height='0'
          url={url}
          playing={playing}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          loop={loop}
          ref={this.ref}
        />
        <input type="button" disabled={!url} value={playing ? 'Pause' : 'Play'} onClick={() => this.props.setPlaying(!playing)}/>
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
    setPlaying: (isPlaying) => dispatch(actions.setPlaying(isPlaying))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

