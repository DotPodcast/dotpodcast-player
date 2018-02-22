import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const StandardButton = (props) => {
  return (
    <button className={css(styles.button)} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    border: 'none',
    color: 'black',
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

export default StandardButton;
