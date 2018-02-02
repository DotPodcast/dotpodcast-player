import React from 'react';
import MiniPlayButton from './MiniPlayButton';
import { Link } from 'react-router-dom';

const episodeRow = function(props) {
  return (
    <tr>
      <td>
        <MiniPlayButton url={props.episode.content_audio.url} />
      </td>
      <td>
        <Link to='/'>{props.episode.title}</Link>
      </td>
    </tr>
  )
}

export default episodeRow
