import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/player';
import { Row, Col, Grid } from 'react-bootstrap';
import EpisodeList from '../components/SearchResults';
import PodcastTileList from '../components/PodcastTileList';
import PodcastTile from '../components/PodcastTile';

class Home extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <p>
              <input type="button" className="btn btn-primary" value="Load Test Audio" onClick={() => { this.props.playEpisode('http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3') }}/>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.props.searchText && <span>{this.props.podcastResults.total} podcasts found.</span>}
            <PodcastTileList>
              {this.props.podcastResults.hits.map((podcast, idx) => <PodcastTile key={idx} {...podcast._source}/>)}
            </PodcastTileList>
            <EpisodeList onPlay={this.props.playEpisode} results={this.props.episodeResults} searchText={this.props.searchText}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchText: state.search.text,
    podcastResults: state.search.podcastResults,
    episodeResults: state.search.episodeResults,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playEpisode: (url) => {
      dispatch(actions.playUrl(url));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
