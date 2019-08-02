import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
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

  validateFolder = (name) => {
    return (typeof name === 'string');
  }

  handleSubmit = (e) => {
    const { folderName } = this.state;
    if(this.validateFolder(folderName)) {
      e.preventDefault();
      fetch(`${config.API_ENDPOINT}/folders/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          'name': folderName
        })
      })
      .then(res => {
        ApiContext.addFolder(res.body);
      });
    }
    else {
      this.setState({
        error: 'Please provide a valid name'
      })
    }

  }

  render() {

    return (
      <form className="addFolderForm" onSubmit={e => this.handleSubmit(e)}>
        <input 
          type="text" 
          className="newFolderName" 
          name="newFolderName" 
          id="newFolderName" 
          defaultValue = {this.state.folderName}
          onChange = {e => this.handleChange(e)}
          required />
        <button type="submit">Add Folder</button>
      </form>
    )
  }
}