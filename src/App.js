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
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Didact Gothic',
      'sans-serif',
    ].join(','),
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      searchResults: [],
      searchResultsPage: 0,
      trendingResults: [],
      trendingResultsPage: 0,
      homeResults: [],
      homeResultsPage: 0,
      loadedEntity: [],
      relatedResults: [],
      relatedResultsPage: 0,
      internalLinks: [],
      internalLinksPage: 0,
      loading: true,
      alertOpen: false
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
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
    this.getResults(searchUrl, false, "homeResults", "homeResultsPage")

  }

  async getResults(searchUrl, newSearch, results) {
    let page = results + "Page";
    this.startLoading();
    searchUrl += '&limit=15&page=' + (newSearch ? 1 : (this.state[page] + 1));
    const response = await fetch(searchUrl, {method: 'GET'});
    const json = await response.json();

    if (response.status === 200) {
      if (newSearch) {
        this.setState({
          [results]: json,
          [page]: 1
        });
      } else {
        if (json) {
          this.setState({
            [results]: this.state[results].concat(json),
            [page]: (this.state[page] + 1)
          })
        } else {
          this.handleChange("alertOpen", true);
        }
      }
    }
    this.endLoading();
  }

  async getTrendingResults() {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News,PERSON,ORGANIZATION';
    await this.getResults(searchUrl, false, "trendingResults")

  }

  getSearchResults(searchKey, newSearch) {
    if (searchKey.length > 1) {
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
      if (searchKey.includes(":")) {
        let searchArray = searchKey.split(":", 2);
        searchUrl += searchArray[1] + '&categories=' + searchArray[0];
      } else {
        searchUrl += searchKey;
      }
      this.getResults(searchUrl, newSearch, "searchResults")
    }
  }

  getRelatedResults(title, newSearch) {
    if (title !== undefined) {
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/relations/' + title;
      this.getResults(searchUrl + '?', newSearch, "relatedResults")
    }

  }

  getInternalLinks(title, newSearch) {
    if (title !== undefined) {
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/links/' + title;
      this.getResults(searchUrl + '?', newSearch, "internalLinks")
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
      <ThemeProvider theme={theme}>
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
                                              searchKey={this.state.searchKey}
                                              homeResults={this.state.homeResults}
                                              getHomeResults={this.getHomeResults}
                                              trendingResults={this.state.trendingResults}
                                              getTrendingResults={this.getTrendingResults}
                                              getSearchResults={this.getSearchResults}
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
          <Dialog
            open={this.state.alertOpen}
            onClose={() => this.handleChange("alertOpen", false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Typography variant="body2" id="alert-dialog-description">
                No items found!
              </Typography>
            </DialogContent>
            <DialogActions style={{justifyContent: "center"}}>
              <Button onClick={() => this.handleChange("alertOpen", false)} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
