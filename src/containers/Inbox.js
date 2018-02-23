import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../reducers/inbox';
import { StyleSheet, css } from 'aphrodite';
import EpisodeRow from '../containers/EpisodeRow';
import moment from 'moment';

class Inbox extends Component {
  state = {}

  componentDidMount() {
    this.props.getInbox(this.props.userPublicKey)
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <h4>Your Subscriptions</h4>
        <hr />
        {this.props.subscriptions.map(({podcast, episodes}, idx) => {
          return(
            <Grid className={css(styles.subscriptionRow)} key={idx} fluid>
              <Row className={(css(styles.headerRow))}>
                <Col xs={2} smHidden mdHidden lgHidden>
                  {podcast.artwork['@1x'] && <img src={podcast.artwork['@1x']} width='100%' height='100%'/>}
                </Col>
                <Col xs={10} sm={12}>
                  <span className={css(styles.podcastTitle)}>{podcast.title} ({episodes.length} New)</span>
                </Col>
              </Row>
              <Row>
                <Col xsHidden sm={3}>
                    <div className={css(styles.artContainer)}>
                      {podcast.artwork['@2x'] && <img src={podcast.artwork['@2x']} width='100%' height='100%'/>}
                    </div>
                </Col>
                <Col xs={12} sm={9}>
                  <Grid fluid>
                    <Row>
                      <Col xs={1} className={css(styles.header)}></Col>
                      <Col xs={8} sm={5} className={css(styles.header)}>Title</Col>
                      <Col xsHidden sm={4} className={css(styles.header)}>Release Date</Col>
                      <Col xs={3} smHidden mdHidden lgHidden className={css(styles.header)}>Release Date</Col>
                      <Col xsHidden sm={2} className={css(styles.header)}>Duration</Col>
                    </Row>
                    {episodes.map((e, idx) => {
                      return(!!e.content_audio && <EpisodeRow  key={idx} podcast={podcast} episode={e} />);
                    }
                    )}
                  </Grid>
                </Col>
              </Row>
            </Grid>
          );
        }
        )}
      </div>
    )
  }
}

const sortAlpha = subscriptions => {
  return subscriptions.sort((a,b) => {return (a.podcast.title > b.podcast.title) ? 1 : ((b.podcast.title > a.podcast.title) ? -1 : 0)})
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  podcastTitle: {
    fontSize: 18,
  },
  headerRow: {
    marginBottom: 20,
  },
  header: {
    paddingBottom: 7,
    color: '#bbb',
  },
  table: {
    width: '100%',
    marginBottom: 20
  },
  header: {
    paddingBottom: 7,
    color: '#bbb',
  },
  subscriptionRow: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16
  },
  artContainer: {
  },
});

const mapStateToProps = state => {
  return {
    userPublicKey: state.user.publicKey,
    subscriptions: sortAlpha(state.inbox.episodes)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInbox: function(userPublicKey) {
      dispatch(actions.fetchRequested(userPublicKey))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
