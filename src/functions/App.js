import {createTheme} from "@mui/material";

const THEME = createTheme({
  typography: {
    "fontFamily": `"Helvetica", "Arial", sans-serif`,
  },
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

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
    alertOpen: false,
    language: 'en'
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





async getSearchResults(searchKey, newSearch) {
  if (searchKey.length > 1) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
    if (searchKey.includes(":")) {
      let searchArray = searchKey.split(":", 2);
      searchUrl += searchArray[1] + '&categories=' + searchArray[0];
    } else {
      searchUrl += searchKey;
    }
    return await this.getResults(searchUrl, newSearch, "searchResults", 15)
  }
}




