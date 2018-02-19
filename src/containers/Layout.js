import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Header from '../components/Header';
import FooterPlayer from '../containers/Player';

class Layout extends Component {
  render() {
    return (
      <div className={css(styles.layoutContainer, !!this.props.itemToPlay && styles.playerActive)}>
        <Header />

        {this.props.children}

        <FooterPlayer active={this.props.itemToPlay}/>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  layoutContainer: {
    paddingTop: 80,
  },
  playerActive: {
    paddingBottom: 100,
  },
});

const mapStateToProps = state => {
  return {
    itemToPlay: state.player.url
  }
}

export default connect(mapStateToProps)(Layout);
