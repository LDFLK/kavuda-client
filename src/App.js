import React, {Component} from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import SearchResult from "./components/search/searchResult";
import Profile from "./components/profile/profile";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      searchResults: [],
      loadedEntity: [],
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.endLoading = this.endLoading.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.getEntity = this.getEntity.bind(this);
  }

  startLoading() {
    this.setState({loading: true});
  }

  endLoading() {
    this.setState({loading: false});
  }

  handleChange(key, value) {
    this.setState({[key]: value});
  }

  getSearchResults(searchKey) {
    this.startLoading();
    if (searchKey.length > 1) {
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
      if (searchKey.includes(":")) {
        let searchArray = searchKey.split(":", 2);
        searchUrl += searchArray[1] + '&categories=' + searchArray[0];
      } else {
        searchUrl += searchKey;
      }
      fetch(searchUrl, {
        method: 'GET'
      }).then(results => {
        return results.json();
      }).then(data => {
        this.handleChange("searchResults", data);
      }).then(
        end => this.endLoading()
      );
    }

  }

  getEntity(title) {
    this.startLoading();
    fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + title, {
      method: 'GET'
    }).then(results => {
      if (results.status === 200) {
        return results.json();
      }
      return null
    }).then(data => {
      this.handleChange("loadedEntity", data);
    }).then(
      end => this.endLoading()
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HashRouter>
            <Route path="/"
                   render={(props) => <Header {...props}
                                              searchKey={this.state.searchKey}
                                              handleChange={this.handleChange}
                                              getSearchResults={this.getSearchResults}
                                              loading={this.state.loading}
                   />}
            />
            <Route exact path="/"
                   render={(props) => <Home {...props}
                   />
                   }
            />
            <Route path="/search"
                   render={(props) => <SearchResult {...props}
                                                    searchKey={this.state.searchKey}

                   />
                   }
            />
            <Route path="/profile/:title"
                   render={(props) => <Profile {...props}
                                                  getEntity={this.getEntity}
                                                  loadedEntity={this.state.loadedEntity}
                                                  handleChange={this.handleChange}
                   />}
            />
            <Route path="/"
                   render={(props) => <Footer {...props}
                   />
                   }
            />
          </HashRouter>
        </header>
      </div>
    );
  }
}

export default App;
