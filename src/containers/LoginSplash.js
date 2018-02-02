import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  redirectToSignIn,
} from 'blockstack';
import dotPodcastLogo from '../images/app-icon-dotpodcast-192x192.png';
import blockstackIcon from '../images/blockstack-app-icon.png';
import { StyleSheet, css } from 'aphrodite';
import RibbonSplash from '../components/RibbonSplash';

class LoginSplash extends Component {
  handleLogin() {
    redirectToSignIn(`${window.location.origin}/callback`);
  }
  render() {
    return (
      <RibbonSplash>
        <div className={css(styles.inline)}>
          <img className={css(styles.appLogo)} src={dotPodcastLogo} alt=""/>
        </div>
        <div className={css(styles.inline)}>
          <h3>DOTPODCAST</h3>
          <p>
            Enabling listeners to search, subscribe, and support podcasters without being tracked or censored.
          </p>
          <button className={css(styles.loginButton)} onClick={this.handleLogin}>
            <img className={css(styles.loginIcon)} alt="" src={blockstackIcon}/>Login with Blockstack</button>
        </div>
      </RibbonSplash>
    );
  }
}

const styles = StyleSheet.create({
  inline: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  appLogo: {
    marginTop: 16,
    marginRight: 20,
    width: 64,
    height: 64,
  },
  loginIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  loginButton: {
    marginTop: 10,
    padding: 0,
    paddingRight: 10,
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#cecece',
    transition: '.1s',
    boxShadow: '0 0 5px #666',
    ':hover': {
      backgroundColor: '#d4d4d4',
      boxShadow: '0 0 10px #666',
    },
    ':active': {
      outline: 'none',
      backgroundColor: '#aaa',
      boxShadow: '0 0 1px #666',
    },
    ':focus': {
      outline: 'none',
    }
  }
});

export default connect()(LoginSplash);
