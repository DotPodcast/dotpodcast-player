import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Alert } from 'react-bootstrap';
import { actions } from '../reducers/podto';
import { StyleSheet, css } from 'aphrodite';
import PodcastDetail from '../components/PodcastDetail';

class Subscribe extends Component {
  state = {};

  componentDidMount() {
    const instruction = this.props.location.search;
    const parse = (url) => {
      let qs = {};

      url.split('&').map(
        pair => pair.split('=')
      ).forEach(
        pair => {
          const key = decodeURIComponent(pair[0]);
          const value = decodeURIComponent(pair[1]);

          qs[key] = value;
        }
      )

      return qs;
    }

    if(!instruction) {
      return
    }

    const queryParams = parse(instruction.substr(1))

    if(!queryParams.q) {
      return
    }

    if(queryParams.q.substr(0, 10) == 'web+podto:') {
      const podtoParams = parse(queryParams.q.substr(10));

      this.props.getPodcast(podtoParams.url, podtoParams.type);
    }
  }

  render() {
    if(this.props.requesting) {
      return (
        <Grid>Getting podcast information</Grid>
      )
    }

    if(this.props.error) {
      return (
        <Grid>
          <Alert bsStyle='danger'>
            <p class="lead">Unable to subscribe to feed</p>
            <p>{this.props.error.message}</p>
          </Alert>
        </Grid>
      )
    }

    if(this.props.podcast) {
      return <PodcastDetail podcast={this.props.podcast} />
    }

    return null
  }
}

const mapStateToProps = state => {
  return {
    podcast: state.podto.podcast,
    requesting: state.podto.requesting,
    error: state.podto.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPodcast: (url, type) => {
      dispatch(actions.podcastRequested(url, type));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
