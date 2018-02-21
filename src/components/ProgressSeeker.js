import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProgressSeeker = (props) => {
  return (
    <div className={css(styles.progressArea)} style={props.style}>
      {props.beforeValue &&<div className={css(styles.timeDisplay)}>{props.beforeValue}</div>}
      <div className={css(styles.progressShape, styles.progressContainer)}>
        <div className="progress-loaded" />
        <div className={css(styles.progressShape, styles.progressPlayed)} style={{width: `${props.value * 100}%`}} />
        <input
          className={css(styles.slider, props.knobShowing && styles.knobShowing)}
          type="range"
          min="0"
          max="1"
          step="any"
          value={props.value}
          onMouseDown={(evt) => props.onStartChange && props.onStartChange(evt.target.value)}
          onChange={(evt) => props.onChange && props.onChange(evt.target.value) }
          onMouseUp={(evt) => props.onCompleteChange && props.onCompleteChange(evt.target.value)}
        />
      </div>
      {props.afterValue && <div className={css(styles.timeDisplay)}>{props.afterValue}</div>}
    </div>
  );
}

const styles = StyleSheet.create({
  progressArea: {
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
  slider: {
    transform: 'translateY(-68%)',
    width: '100%',
    background: 'transparent',
    appearance: 'none',
    '::-webkit-slider-thumb': {
      appearance: 'none',
    },
    '::-moz-focus-outer': {
      border: 0,
    },
    '::-moz-range-track': {
      appearance: 'none',
      backgroundColor: 'transparent',
      marginTop: 2,
    },
    '::-moz-range-thumb': {
      appearance: 'none',
    },
    ':focus': {
      outline: 'none',
    },
    '::-ms-track': {
      width: '100%',
      cursor: 'pointer',
      background: 'transparent',
      borderColor: 'transparent',
      color: 'transparent',
    },
  },
  knobShowing: {
    '::-webkit-slider-thumb': {
      appearance: 'none',
      height: 10,
      width: 10,
      borderRadius: '50%',
      cursor: 'pointer',
      backgroundColor: 'white',
      marginTop: -2,
    },
    '::-moz-range-thumb': {
      appearance: 'none',
      height: 10,
      width: 10,
      borderRadius: '50%',
      cursor: 'pointer',
      backgroundColor: 'white',
      marginTop: -2,
      border: 0,
    },
  },
});

export default ProgressSeeker;
