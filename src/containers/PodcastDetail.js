import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/podcast-detail';

class PodcastDetail extends Component {
  componentDidMount() {
    this.props.getDetails(this.props.match.params.slug);
  }
  render() {
    return (<div>it worked!- {this.props.match.params.slug}</div>);
  }
}

const mapStateToProps = state => {
}

const mapDispatchToProps = dispatch => {
  return {
    getDetails: (slug) => {
      dispatch(actions.detailRequested(slug));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
