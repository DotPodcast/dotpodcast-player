import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Glyphicon } from 'react-bootstrap';

const PlayButton = (props) => {
  return (
    <div className={css(styles.container, !props.playing && props.touched && styles.ready)} onClick={props.onClick}>
      <Glyphicon className={css(styles.icon)} glyph={props.playing ? 'pause' : 'play'}/>
    </div>
  )
};

const size = 36;

const borderColorKeyframes = {
  '0%': {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },

  '50%': {
    boxShadow: '0 0 6px 6px #090',
    backgroundColor: '#060'
  },

  '100%': {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: size,
    height: size,
    borderRadius: '50%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'solid',
    transform: 'scale(1)',
    boxShadow: 'none',
    ':hover': {
      transform: 'scale(1.1)',
      borderColor: 'white',
      color: 'white',
    },
    ':active': {
      transform: 'scale(1)',
      borderColor: '#888',
      color: '#888',
    }
  },
  icon: {
    top: 0,
    left: 1,
  },
  ready: {
    animationName: [borderColorKeyframes],
    animationDuration: '3s',
    animationIterationCount: 'infinite',
  }
});

export default PlayButton;
