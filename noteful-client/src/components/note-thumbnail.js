import React from 'react';
import {Link} from 'react-router-dom';

function NoteThumbnail(props) {
  return (
  <div>
    <Link to={`/note/${props.noteId}`}>
      <h2>{props.name}</h2>
      <p>Modified on: {new Date(props.modified).toLocaleDateString()}</p>
      <button>Delete Note</button>
    </Link>
  </div>);
}

export default NoteThumbnail;