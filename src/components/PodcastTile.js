import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const PodcastTile = (props) => {
  return (
    <div className={css(styles.tileWrapper)}>
      <img className={css(styles.tileImage)} src={props.artwork['@2x']} alt='Podcast artwork' />
    </div>
  )
};

const styles = StyleSheet.create({
  tileWrapper: {
    position: 'relative',
    display: 'inline-block',
    margin: '0 20px',
    ':first-of-type': {
      marginLeft: 0
    }
  },
  tileImage: {
    width: 300,
    height: 300,
  },
  titleWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  tileTitle: {
    width: 400,
    textAlign: 'center',
    padding: 20,
    fontSize: 25,
    whiteSpace: 'normal'
  },
  tileTitleShade: {
    position: 'absolute',
    bottom: 0,
    width: 400,
    height: '100%',
    background: 'black',
    opacity: .6
  }
});

export default PodcastTile;
