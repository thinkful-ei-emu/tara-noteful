import React from 'react';
import NoteList from './note-list'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <NoteList notes={this.props.notes} />
      </div>);
  }
}

export default MainPage;