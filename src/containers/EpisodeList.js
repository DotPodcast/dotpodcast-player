import React, { Component} from 'react';
import { Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../reducers/episode-list';
import EpisodeRow from '../containers/EpisodeRow';

class EpisodeList extends Component {
  state = {}

  render() {
    if(this.props.error) {
      return (
        <Alert bsStyle="danger">{this.props.error.message}</Alert>
      )
    }

    if(this.props.episodes) {
      const renderedList = this.props.episodes.map(
        (episode) => (
          <EpisodeRow podcast={this.props.podcast} episode={episode} />
        )
      )

      return (
        <Table striped hover>
          <thead>
            <tr>
              <th width="16">&nbsp;</th>
              <th>Episode title</th>
            </tr>
          </thead>
          <tbody>
            {renderedList}
          </tbody>
        </Table>
      )
    }

    if(this.props.requesting) {
      return (<div>Loading episode list...</div>)
    }

    return (<div>Loading...</div>)
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.episodeList.episodes,
    requesting: state.episodeList.requesting,
    podcast: state.podcastDetail.podcast,
    error: state.episodeList.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getList: (url) => {
      dispatch(actions.listRequested(url));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList);
