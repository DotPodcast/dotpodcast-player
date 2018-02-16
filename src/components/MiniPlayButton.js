import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const miniPlayButton = function(props) {
  const dispatch = () => {
    props.action(props.username, props.podcast, props.episode);
  }

  return (
    <Button bsStyle="primary" onClick={dispatch}>
      <Glyphicon glyph="play" />
    </Button>
  )
}

export default miniPlayButton;
