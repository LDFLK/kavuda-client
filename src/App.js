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
      trendingResults: [],
      homeResults: [],
      loadedEntity: [],
      relatedResults: [],
      internalLinks: [],
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.endLoading = this.endLoading.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.getTrendingResults = this.getTrendingResults.bind(this);
    this.getRelatedResults = this.getRelatedResults.bind(this);
    this.getInternalLinks = this.getInternalLinks.bind(this);
    this.getHomeResults = this.getHomeResults.bind(this);
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

  getHomeResults() {
    this.startLoading();
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
    fetch(searchUrl, {
      method: 'GET'
    }).then(results => {
      return results.json();
    }).then(data => {
      this.handleChange("homeResults", data);
    }).then(
      end => this.endLoading()
    );

  }

  getTrendingResults() {
    this.startLoading();
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
    fetch(searchUrl, {
      method: 'GET'
    }).then(results => {
      return results.json();
    }).then(data => {
      this.handleChange("trendingResults", data);
    }).then(
      end => this.endLoading()
    );

  }

  getRelatedResults(title) {
    if (title !== undefined) {
      this.startLoading();
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/relations/' + title;
      fetch(searchUrl, {
        method: 'GET'
      }).then(results => {
        return results.json();
      }).then(data => {
        this.handleChange("relatedResults", data);
      }).then(
        end => this.endLoading()
      );
    }

  }

  getInternalLinks(title) {
    if (title !== undefined) {
      this.startLoading();
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/linked/' + title;
      fetch(searchUrl, {
        method: 'GET'
      }).then(results => {
        return results.json();
      }).then(data => {
        this.handleChange("internalLinks", data);
      }).then(
        end => this.endLoading()
      );
    }

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
                                            homeResults={this.state.homeResults}
                                            getHomeResults={this.getHomeResults}
                                            trendingResults={this.state.trendingResults}
                                            getTrendingResults={this.getTrendingResults}
                   />
                   }
            />
            < Route path="/search/:searchKey"
                    render={(props) => <SearchResult {...props}
                                                     searchKey={this.state.searchKey}
                                                     handleChange={this.handleChange}
                                                     searchResults={this.state.searchResults}
                                                     getSearchResults={this.getSearchResults}
                                                     trendingResults={this.state.trendingResults}
                                                     getTrendingResults={this.getTrendingResults}

                    />
                    }
            />
            <Route path="/profile/:title"
                   render={(props) => <Profile {...props}
                                               getEntity={this.getEntity}
                                               loadedEntity={this.state.loadedEntity}
                                               handleChange={this.handleChange}
                                               relatedResults={this.state.relatedResults}
                                               getRelatedResults={this.getRelatedResults}
                                               internalLinks={this.state.internalLinks}
                                               getInternalLinks={this.getInternalLinks}
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
