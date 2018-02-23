import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../reducers/inbox';
import { StyleSheet, css } from 'aphrodite';
import EpisodeRow from '../containers/EpisodeRow';

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
        {this.props.subscriptions.map(item => {
          return(
            <table className={css(styles.table)}>
                <tr>
                  <td colspan="4" className={css(styles.title)}>{item.podcast.title} ({item.episodes.length} New)</td>
                </tr>
                {item.episodes.map(e => {
                    return(<EpisodeRow podcast={item.podcast} episode={e} />)
                  }
                )}
            </table>);
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
  table: {
    width: '100%',
    marginBottom: 20
  },
  header: {
    paddingBottom: 7,
    color: '#bbb',
  },
  title: {
    fontSize: 16
  }
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
