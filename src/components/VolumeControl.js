import React from 'react';
import GlyphButton from './GlyphButton';
import { StyleSheet, css } from 'aphrodite';
import ProgressSeeker from '../components/ProgressSeeker';

const VolumeControl = (props) => {
  return (
    <div className={css(styles.container)}>
      <GlyphButton icon={props.muted ? 'volume-off' : 'volume-up'} onClick={props.onMuteToggle} />
      <ProgressSeeker
        style={{flex: 1}}
        max={1}
        value={props.muted ? 0 : props.volume}
        knobShowing={true}
        onChange={props.onVolumeChange}
      />
    </div>
  )
};

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default VolumeControl;
