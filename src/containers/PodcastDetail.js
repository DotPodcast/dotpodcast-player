import React, { Component } from 'react';
import { Grid, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../reducers/podcast-detail';
import { StyleSheet, css } from 'aphrodite';
import SubscribeButton from './SubscribeButton';
import UnsubscribeButton from './UnsubscribeButton';
import EpisodeList from './EpisodeList';

class PodcastDetail extends Component {
  state = {};

  componentDidMount() {
    this.props.getDetails(this.props.match.params.slug);
  }

  render() {
    if(this.props.podcast) {
      const podcast = this.props.podcast;
      let button = null;

      if(this.props.podcast) {
        if(this.props.subscription && this.props.subscription.meta_url === this.props.podcast.meta_url) {
          button = <UnsubscribeButton podcast={podcast} id={this.props.subscription.id} />
        } else if (this.props.subscriptionRequesting) {
          button = <p>Getting subscription info</p>
        } else if (this.props.subscriptionRequested && !this.props.subscription) {
          button = <SubscribeButton podcast={podcast} />
        } else if (this.props.subscriptionError) {
          button = <p className='text-danger'>{this.props.subscriptionError.message}</p>
        } else {
          button = <p>Will check for subscription in a moment</p>
        }
      }

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
                {button}
            </div>
          </div>
          <EpisodeList podcast={podcast} />
        </Grid>
      );
    }

    if(this.props.error) {
      return (
        <Grid fluid>
          <Alert bsStyle="danger">{this.props.error.message}</Alert>
        </Grid>
      )
    }

    return (<Grid fluid><center>Loading</center></Grid>);
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
    podcast: state.podcastDetail.podcast,
    error: state.podcastDetail.error,
    subscription: state.subscriptionDetail.subscription,
    subscriptionRequested: state.subscriptionDetail.requested,
    subscriptionError: state.subscriptionDetail.error,
    subscriptionRequesting: state.subscriptionDetail.requesting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDetails: (slug) => {
      dispatch(actions.detailRequested(slug));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
