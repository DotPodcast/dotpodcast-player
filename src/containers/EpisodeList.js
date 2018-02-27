import React, { Component} from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from '../reducers/episode-list';
import { StyleSheet, css } from 'aphrodite';
import { Row, Col, Grid } from 'react-bootstrap';
import EpisodeRow from '../containers/EpisodeRow';
import StandardButton from '../components/StandardButton';

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
        (episode, idx) => {
          if(episode.content_audio) {
            return (<EpisodeRow key={idx} podcast={this.props.podcast} episode={episode} />)
          }
        }
      )

      return (
        <Grid className={css(styles.table)}>
          <Row className={css(styles.row)} onMouseOver={() => this.setState({hovering: true})} onMouseOut={() => this.setState({hovering: false})}>
            <Col xs={1} className={css(styles.header)}></Col>
            <Col xs={8} sm={5} className={css(styles.header)}>Title</Col>
            <Col xsHidden sm={4} className={css(styles.header)}>Release Date</Col>
            <Col xs={3} smHidden mdHidden lgHidden className={css(styles.header)}>Release Date</Col>
            <Col xsHidden sm={2} className={css(styles.header)}>Duration</Col>
          </Row>
          {renderedList}
          {!!this.props.paginator && !!this.props.paginator.next_url && <Row><Col xs={12} className={css(styles.loadMore)}><StandardButton onClick={() => this.props.getMore(this.props.paginator.next_url)}>Load More Episodes</StandardButton></Col></Row>}
        </Grid>
      )
    }

    if(this.props.requesting) {
      return (<div>Loading episode list...</div>)
    }

    return (<div>Loading...</div>)
  }
};

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
  header: {
    paddingBottom: 7,
    color: '#bbb',
  },
  loadMore: {
    textAlign: 'center',
    padding: 20,
  },
});

const mapStateToProps = state => {
  return {
    episodes: state.episodeList.episodes,
    requesting: state.episodeList.requesting,
    paginator: state.episodeList.paginator,
    error: state.episodeList.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMore: (url) => {
      dispatch(actions.moreEpisodesRequested(url));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList);
