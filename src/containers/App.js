import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import { actions } from '../reducers/player';
import Header from '../components/Header';
import FooterPlayer from '../containers/Player';
import SearchResults from '../components/SearchResults';
import { Row, Col, Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <p className="App-intro">
                <input type="button" className="btn btn-primary" value="Load Test Audio" onClick={() => { this.props.playEpisode('http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3') }}/>
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <SearchResults onPlay={this.props.playEpisode} results={this.props.searchResults} searchText={this.props.searchText}/>
            </Col>
          </Row>
        </Grid>
        <FooterPlayer active={this.props.itemToPlay}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchText: state.search.text,
    searchResults: state.search.results,
    itemToPlay: state.player.url
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playEpisode: (url) => {
      dispatch(actions.playUrl(url));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
