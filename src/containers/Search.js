import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Grid } from 'react-bootstrap';
import SearchResults from '../components/SearchResults';
import PodcastTileList from '../components/PodcastTileList';
import PodcastTile from '../components/PodcastTile';
import { actions as searchActions } from '../reducers/search';
import { actions as mediaActions } from '../reducers/media';

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
            <SearchResults onPlay={this.props.playEpisode} results={this.props.episodeResults} userPublicKey={this.props.userPublicKey} searchText={this.props.searchText}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchText: state.search.text,
    userPublicKey: state.user.publicKey,
    podcastResults: state.search.podcastResults,
    episodeResults: state.search.episodeResults,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playEpisode: (userPublicKey, podcast, episode) => {
      dispatch(mediaActions.mediaRequested(null, userPublicKey, podcast, episode));    
    },
    updateSearch: (text) => dispatch(searchActions.updateQuery(text)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));