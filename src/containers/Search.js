import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Grid } from 'react-bootstrap';
import SearchResults from '../components/SearchResults';
import PodcastTileList from '../components/PodcastTileList';
import PodcastTile from '../components/PodcastTile';
import { actions as playerActions } from '../reducers/player';
import { actions as searchActions } from '../reducers/search';

class Search extends Component {
  componentDidMount() {
    const qParams = new URLSearchParams(this.props.location.search);
    const q = qParams.get('q');
    if(this.props.searchText !== q) {
      this.props.updateSearch(q || '');
    }
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            {this.props.searchText && <span>{this.props.podcastResults.total} podcasts found.</span>}
            <PodcastTileList>
              {this.props.podcastResults.hits.map((podcast, idx) => <PodcastTile key={idx} {...podcast._source}/>)}
            </PodcastTileList>
            <SearchResults onPlay={this.props.playEpisode} results={this.props.episodeResults} searchText={this.props.searchText}/>
          </Col>
        </Row>
      </Grid>
    )
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
      dispatch(playerActions.playUrl(url));
    },
    updateSearch: (text) => dispatch(searchActions.updateQuery(text)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
