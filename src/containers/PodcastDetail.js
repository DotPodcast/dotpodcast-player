import React, { Component } from 'react';
import { Grid, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../reducers/podcast-detail';
import { StyleSheet, css } from 'aphrodite';
import EpisodeList from './EpisodeList';
import SubscriptionChoice from './SubscriptionChoice';

class PodcastDetail extends Component {
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
            <Grid>
            <div className={css(styles.headerContainer)}>
            <div className={css(styles.imageContainer)}>
            <img className={css(styles.artwork)} src={podcast.artwork['@2x']} alt='Podcast artwork' />
            </div>
            <div className={css(styles.detailContainer)}>
            <div className={css(styles.title)}>{podcast.title}</div>
            <div className={css(styles.author)}>{podcast.author.name}</div>
            <div><a href={podcast.home_page_url} target="_blank">{podcast.home_page_url}</a></div>
            <p className={css(styles.description)}>{podcast.description_text}</p>
            <SubscriptionChoice podcast={podcast} />
            </div>
            </div>
            <EpisodeList podcast={podcast} />
            </Grid>
    );

  }
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    marginBottom: 40,
  },
  imageContainer: {
    width: 300,
    minWidth: 200,
  },
  artwork: {
    marginRight: '15px',
    width: '100%'
  },
  detailContainer: {
    marginLeft: 30,
  },
  title: {
    fontSize: 28,
  },
  author: {
    color: '#bbb',
    fontStyle: 'italic',
  },
  description: {
    marginTop: 20,
    marginBottom: 20,
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
