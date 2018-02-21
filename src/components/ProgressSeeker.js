import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProgressSeeker = (props) => {
  return (
    <div className={css(styles.progressArea)}>
      <div className={css(styles.timeDisplay)}>{props.playedSeconds}</div>
      <div className={css(styles.progressShape, styles.progressContainer)}>
        <div className="progress-loaded" />
        <div className={css(styles.progressShape, styles.progressPlayed)} style={{width: `${props.value * 100}%`}}/>
        <div className="progress-current" />
      </div>
      <div className={css(styles.timeDisplay)}>{props.duration}</div>
    </div>
  );
}

const styles = StyleSheet.create({
  progressArea: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  progressShape: {
    height: 6,
    borderRadius: 6,
    backgroundColor: '#333',
    flex: 1,
  },
  progressPlayed: {
    backgroundColor: '#666'
  },
  timeDisplay: {
    color: '#999',
  },
})

export default ProgressSeeker;
