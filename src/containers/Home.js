import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/player';
import { Grid } from 'react-bootstrap';
import Inbox from '../containers/Inbox';

class Home extends Component {
  render() {
    return (
      <Grid fluid>
        <Inbox />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
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
