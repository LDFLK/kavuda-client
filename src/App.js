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
    mode: 'light',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header
        />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="search/:searchKey" element={<SearchResult/>}/>
          <Route path="profile/:title" element={<Profile/>}/>
          <Route path="*" element={<div>invalid url!</div>}/>
        </Routes>
        <Footer/>

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
