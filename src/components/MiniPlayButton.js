import React from 'react';
import GlyphButton from './GlyphButton';

const miniPlayButton = function(props) {
  const dispatch = () => {
    props.action(props.username, props.podcast, props.episode);
  }

  return (
    <GlyphButton icon="play" onClick={dispatch} />
  )
}

export default miniPlayButton;
