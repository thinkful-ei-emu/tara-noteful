import React from 'react';
import NoteThumbnail from './note-thumbnail'

function NoteList(props) {
  const allNotes = props.notes.map((note, index) => {
    return (<NoteThumbnail 
      key={note.id} 
      noteId={note.id} 
      modified={note.modified}
      name={note.name}
    />);
  })

  return (
    <div>
      {allNotes}
    </div>
  );
}

export default NoteList;