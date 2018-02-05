import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const miniPlayButton = function(props) {
  const dispatch = () => {
    props.action(props.podcast, props.episode);
  }

  return (
    <Button bsStyle="primary">
      <Glyphicon glyph="play" onClick={dispatch} />
    </Button>
  )
}

export default miniPlayButton;
