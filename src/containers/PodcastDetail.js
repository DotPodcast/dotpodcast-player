import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
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
                <SubscriptionChoice podcast={podcast} />
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
    detail: state.podcastDetail,
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
