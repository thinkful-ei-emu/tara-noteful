import React from 'react';
import NoteThumbnail from './note-thumbnail';

class FolderPage extends React.Component {
  
  render() {
    const folderId = this.props.match.params.folderId;
    const filteredNotes = this.props.notes.filter(note => {
      return note.folderId===folderId;
    });

    const notes = filteredNotes.map(note => {
      return (
        <NoteThumbnail
          key={note.id}
          noteId={note.id}
          modified={note.modified}
          name={note.name}
        />
      );
    });
    return <div>{notes.length ? notes : 'Nothing was Found.'}</div>;
  }
}

export default FolderPage;