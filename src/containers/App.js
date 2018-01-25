import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Player from './player/Player'
import { actions } from '../reducers/player';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <input type="button" className="btn btn-primary" value="Load Test Audio" onClick={() => { this.props.playEpisode('http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3') }}/>
        </p>
        <Player />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playEpisode: (url) => {
      dispatch(actions.playUrl(url));
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
