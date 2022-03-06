import React, {useState} from 'react';
import {
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import SearchResult from "./components/search/searchResult";
import Profile from "./components/profile/profile";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Locale} from "./components/locale";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState(Locale.en);
  const app_props = {isLoading, setIsLoading, locale, setLocale};
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header {...app_props}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="search/:searchKey" element={<SearchResult {...app_props}/>}/>
          <Route path="profile/:title" element={<Profile {...app_props}/>}/>
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
