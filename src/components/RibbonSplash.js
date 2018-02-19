import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class RibbonSplash extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.content)}>
          {this.props.children}
        </div>
      </div>
    );
  }
};

const montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: "local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/zhcz-_WihjSQC0oHJ9TCYAzyDMXhdD8sAj6OAJTFsBI.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215"
};

const defaultFonts = [montserrat, 'sans-serif'];

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    width: '100%',
    top: '50%',
    background: 'white',
    padding: '80px 0',
    textAlign: 'center',
    transform: 'translateY(-50%)',
    boxShadow: '0 0 17px #6d6d6d',
  },
  content: {
    margin: '10px',
    textAlign: 'left',
    display: 'inline-block',
    fontFamily: defaultFonts,
    color: 'black',
  },
});

export default RibbonSplash;
