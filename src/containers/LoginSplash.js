import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  redirectToSignIn,
} from 'blockstack';
import dotPodcastLogo from '../images/app-icon-dotpodcast-192x192.png';
import blockstackIcon from '../images/blockstack-app-icon.png';
import { StyleSheet, css } from 'aphrodite';

class LoginSplash extends Component {
  handleLogin() {
    redirectToSignIn(`${window.location.origin}/callback`);
  }
  render() {
    return (
      <div className={css(styles.loginContainer)}>
        <div className={css(styles.content)}>
          <div className={css(styles.inline)}>
            <img className={css(styles.appLogo)} src={dotPodcastLogo} width={64} height={64}/>
          </div>
          <div className={css(styles.inline)}>
            <h3>DOTPODCAST</h3>
            <p>
              Enabling listeners to search, subscribe, and support podcasters without being tracked or censored.
            </p>
            <button className={css(styles.loginButton)} onClick={this.handleLogin}>
              <img className={css(styles.loginIcon)} src={blockstackIcon}/>Login with Blockstack</button>
          </div>
        </div>
      </div>
    );
  }
}

const montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: "local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/zhcz-_WihjSQC0oHJ9TCYAzyDMXhdD8sAj6OAJTFsBI.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215"
};

const defaultFonts = [montserrat, 'sans-serif'];

const styles = StyleSheet.create({
  loginContainer: {
    position: 'fixed',
    width: '100%',
    top: '50%',
    background: 'white',
    padding: '80px 0',
    textAlign: 'center',
    transform: 'translateY(-50%)',
  },
  content: {
    textAlign: 'left',
    display: 'inline-block',
    fontFamily: defaultFonts,
    color: 'black',
  },
  inline: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  appLogo: {
    marginTop: 16,
    marginRight: 20
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
