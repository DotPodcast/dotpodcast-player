import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../reducers/podcast-detail';
import { StyleSheet, css } from 'aphrodite';

class PodcastDetail extends Component {
  state = {};

  componentDidMount() {
    this.props.getDetails(this.props.match.params.slug);
  }
  render() {
    if(this.props.podcast) {
      const podcast = this.props.podcast;
      console.debug(podcast);

      return (
        <Row>
          <Col md={6}>
            <Row>
              <Col md={4}>Podcast name</Col>
              <Col md={8}>{podcast.title}</Col>
            </Row>
          </Col>

          <Col md={6}>
            <img className={css(styles.artwork)} src={podcast.artwork['@2x']} alt='Podcast artwork' />
          </Col>
        </Row>
      );
    }

    if(this.props.error) {
      console.log(this.props.error);
      return (<Alert bsStyle="danger">{this.props.error.message}</Alert>)
    }

    return (<div>Loading</div>);
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
    error: state.podcastDetail.error
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
