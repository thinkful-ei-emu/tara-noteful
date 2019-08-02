import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteContent: '',
      error: null
    };
  }

  static contextType = ApiContext;

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    });
  }

  validateNote = (name, content) => {
    return ((typeof name === 'string') && typeof content === 'string');
  }

  handleSubmit = (e) => {
    const { noteName, noteContent } = this.state;
    if(this.validateNote(noteName, noteContent)) {
      e.preventDefault();
      fetch(`${config.API_ENDPOINT}/notes/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          'name': noteName,
          'content': noteContent
        })
      })
      .then(res => {
        ApiContext.addNote(res.body);
      });
    }
    else {
      this.setState({
        error: 'Please provide valid inputs'
      })
    }

  }

  render() {

    return (
      <form className="addNoteForm" onSubmit={e => this.handleSubmit(e)}>
        <input 
          type="text" 
          className="newNoteName" 
          name="newNoteName" 
          id="newNoteName" 
          defaultValue = {this.state.noteName}
          onChange = {e => this.handleChange(e)}
          required />
        <button type="submit">Add Note</button>
      </form>
    )
  }
}