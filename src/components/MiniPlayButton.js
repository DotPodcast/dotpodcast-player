import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const miniPlayButton = function(props) {
  return (
    <Button bsStyle="primary">
      <Glyphicon glyph="play" />
    </Button>
  )
}

export default miniPlayButton;
