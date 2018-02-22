import React, { Component } from 'react';
import { Grid, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../reducers/podcast-detail';
import PodcastDetail from '../components/PodcastDetail';

class PodcastWrapper extends Component {
  state = {};

  componentDidMount() {
    this.props.getDetails(this.props.match.params.slug);
  }

  componentWillUnmount() {
    this.props.closePodcast();
  }

  render() {
    if(this.props.detail.requesting || !this.props.detail.podcast) {
      return (<Grid fluid><center>Loading</center></Grid>);
    }

    if(this.props.detail.error) {
      return (
        <Grid fluid>
          <Alert bsStyle="danger">{this.props.detail.error.message}</Alert>
        </Grid>
      )
    }

    const podcast = this.props.detail.podcast;
    return (
      <PodcastDetail podcast={podcast} />
    );
  }
}

const mapStateToProps = state => {
  return {
    detail: state.podcastDetail,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDetails: (slug) => {
      dispatch(actions.detailRequested(slug));
    },
    closePodcast: () => dispatch(actions.detailClosed())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastWrapper);
