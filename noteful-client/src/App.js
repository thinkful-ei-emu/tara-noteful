import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./components/Main-Page";
import NotePage from "./components/Note-Page";
import MainSidebar from "./components/Main-Sidebar";
import NoteSidebar from "./components/Note-Sidebar";
import FolderPage from "./components/Folder-Page";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import NotFound from "./components/Not-Found";
import config from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolder: "",
      folders: [],
      notes: [],
      error: null
    };
  }

  setFolders = folders => {
    this.setState({
      folders,
      error: null
    });
  };

  setNotes = notes => {
    this.setState({
      notes,
      error: null
    });
  };

  setCurrentFolder = folderId => {
    this.setState({
      currentFolder: folderId
    });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT + "folders", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        console.log('fetched folders!');
        return res.json();
      })
      .then(data => {
        this.setFolders(data);
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });

    fetch(config.API_ENDPOINT + "notes", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        console.log('fetched notes!');
        return res.json();
      })
      .then(data => {
        this.setNotes(data);
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Sidebar>
          <BrowserRouter>
            <Switch>
              <Route
                path="/note/:noteId"
                render={({ history }) => {
                  return <NoteSidebar history={history} />;
                }}
              />
              <Route
                path="/"
                render={() => {
                  return (
                    <MainSidebar
                      setCurrentFolder={this.setCurrentFolder}
                      folders={this.state.folders}
                    />
                  );
                }}
              />
            </Switch>
          </BrowserRouter>
        </Sidebar>
        <Main>
          <BrowserRouter>
            <Switch>
              <Route
                path="/note/:noteId"
                render={({ match, history }) => {
                  return (
                    <NotePage
                      match={match}
                      history={history}
                      notes={this.state.notes}
                    />
                  );
                }}
              />
              <Route
                path="/folder/:folderId"
                render={({ match }) => {
                  return (
                    <FolderPage
                      match={match}
                      folders={this.state.folders}
                      notes={this.state.notes}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <MainPage
                      notes={this.state.notes}
                      folders={this.state.folders}
                    />
                  );
                }}
              />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </Main>
      </div>
    );
  }
}

export default App;
