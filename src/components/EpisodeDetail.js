import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const EpisodeDetail = (props) => {
  return (
    <div className={css(styles.episodeDetail, props.active && styles.episodeDetailActive)}>
      {props.children}
    </div>
  );
};

const styles = StyleSheet.create({
  episodeDetail: {
    position: 'fixed',
    padding: 20,
    backgroundColor: '#222',
    transition: '.2s',
    zIndex: 10,
    width: '100vw',
    height: 'calc(100vh - 100px)',
    left: 0,
    bottom: '-100vh',
    '@media (min-width: 720px)': {
      width: 340,
      height: 'calc(100vh - 170px)',
      left: 20,
    }
  },
  episodeDetailActive: {
    bottom: 100,
    boxShadow: '0 0 10px black'
  }
});

export default EpisodeDetail;
