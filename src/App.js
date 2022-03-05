import React, {useState} from 'react';
import {
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import SearchResult from "./components/search/searchResult";
import Profile from "./components/profile/profile";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header
          // handleChange={this.handleChange}
          // getSearchResults={this.getSearchResults}
          loading={isLoading}
        />
        {/*<Routes>*/}
        {/*<Route path="/"*/}
        {/*element={<Home*/}
        {/*searchKey={this.state.searchKey}*/}
        {/*homeResults={this.state.homeResults}*/}
        {/*getHomeResults={this.getHomeResults}*/}
        {/*trendingResults={this.state.trendingResults}*/}
        {/*getTrendingResults={this.getTrendingResults}*/}
        {/*getSearchResults={this.getSearchResults}*/}
        {/*/>}*/}
        {/*/>*/}


        {/*< Route path="search/:searchKey"*/}
        {/*element={<SearchResult*/}
        {/*searchKey={this.state.searchKey}*/}
        {/*handleChange={this.handleChange}*/}
        {/*searchResults={this.state.searchResults}*/}
        {/*getSearchResults={this.getSearchResults}*/}
        {/*trendingResults={this.state.trendingResults}*/}
        {/*getTrendingResults={this.getTrendingResults}*/}

        {/*/>}*/}
        {/*/>*/}
        {/*<Route path="profile/:title"*/}
        {/*element={<Profile*/}
        {/*getEntity={this.getEntity}*/}
        {/*loadedEntity={this.state.loadedEntity}*/}
        {/*handleChange={this.handleChange}*/}
        {/*relatedResults={this.state.relatedResults}*/}
        {/*getRelatedResults={this.getRelatedResults}*/}
        {/*internalLinks={this.state.internalLinks}*/}
        {/*getInternalLinks={this.getInternalLinks}*/}
        {/*language={this.state.language}*/}
        {/*/>}*/}
        {/*/>*/}
        {/*<Route path="*" element={<div>invalid url!</div>}/>*/}
        {/*</Routes>*/}
        {/*<Footer/>*/}

        {/*<Dialog*/}
        {/*open={this.state.alertOpen}*/}
        {/*onClose={() => this.handleChange("alertOpen", false)}*/}
        {/*aria-labelledby="alert-dialog-title"*/}
        {/*aria-describedby="alert-dialog-description"*/}
        {/*>*/}
        {/*<DialogContent>*/}
        {/*<Typography variant="body2" id="alert-dialog-description">*/}
        {/*No items found!*/}
        {/*</Typography>*/}
        {/*</DialogContent>*/}
        {/*<DialogActions style={{justifyContent: "center"}}>*/}
        {/*<Button onClick={() => this.handleChange("alertOpen", false)} color="primary" autoFocus>*/}
        {/*Ok*/}
        {/*</Button>*/}
        {/*</DialogActions>*/}
        {/*</Dialog>*/}
      </div>
    </ThemeProvider>
  )
}

export default App;
