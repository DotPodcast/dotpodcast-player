import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProgressSeeker = (props) => {
  return (
    <div className={css(styles.progressArea)}>
      <div className={css(styles.progressShape)}>
        <div className="progress-loaded" />
        <div className={css(styles.progressShape, styles.progressPlayed)} style={{width: `${props.value * 100}%`}}/>
        <div className="progress-current" />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  progressArea: {
    padding: 10,
  },
  progressShape: {
    height: 6,
    borderRadius: 6,
    backgroundColor: '#333'
  },
  progressPlayed: {
    backgroundColor: '#666'
  }
})

export default ProgressSeeker;
