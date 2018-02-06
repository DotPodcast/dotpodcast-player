import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
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
        if(this.props.subscription && this.props.subscription.meta_url == this.props.podcast.meta_url) {
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
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={4}>Podcast name</Col>
                <Col md={8}>{podcast.title}</Col>
              </Row>
              <Row>
                <Col md={4}>Author</Col>
                <Col md={8}>{podcast.author.name}</Col>
              </Row>
              <Row>
                <Col md={4}>Description</Col>
                <Col md={8}>{podcast.description}</Col>
              </Row>
              <Row>
                <Col md={4}>Website</Col>
                <Col md={8}><a href={podcast.home_page_url} target="_blank">{podcast.home_page_url}</a></Col>
              </Row>
              <Row>
                <Col mdOffset={4} md={8}>
                  {button}
                </Col>
              </Row>
            </Col>

            <Col md={6}>
              <img className={css(styles.artwork)} src={podcast.artwork['@2x']} alt='Podcast artwork' />
            </Col>
          </Row>
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
  artwork: {
    width: '300px',
    float: 'right',
    marginRight: '15px',
    maxWidth: '100%'
  }
})

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
