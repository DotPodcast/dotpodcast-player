import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/player';
import Header from '../components/Header';
import FooterPlayer from '../containers/Player';
import EpisodeList from '../components/SearchResults';
import PodcastTileList from '../components/PodcastTileList';
import PodcastTile from '../components/PodcastTile'
import { Row, Col, Grid } from 'react-bootstrap';
import Home from '../containers/Home';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />

        {this.props.children}

        <FooterPlayer active={this.props.itemToPlay}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemToPlay: state.player.url
  }
}

export default connect(mapStateToProps)(Layout);
