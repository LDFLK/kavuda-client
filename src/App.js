import React, {useState} from 'react';
import {Route, Routes,} from "react-router-dom";
import './App.css';
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/home/Home";
import SearchResult from "./components/search/SearchResult";
import Profile from "./components/profile/Profile";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Locales} from "./components/constants/Locales";
import {AppRoutes} from "./routes";

const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  function setLocale(value) {
    localStorage.setItem('kavuda-locale', value);
    setLocaleState(value);
  }

  function getLocaleCookie() {
    return localStorage.getItem('kavuda-locale');
  }

  if (!getLocaleCookie()) {
    localStorage.setItem('kavuda-locale', Locales.en);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocaleState] = useState(getLocaleCookie());

  const app_props = {isLoading, setIsLoading, locale, setLocale};
  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Header {...app_props}/>
        <Routes>
          <Route path={AppRoutes.home} element={<Home/>}/>
          <Route path={AppRoutes.search + ":searchKey"} element={<SearchResult {...app_props}/>}/>
          <Route path={AppRoutes.entity + ":title"} element={<Profile {...app_props}/>}/>
          <Route path="*" element={<div>invalid url!</div>}/>
        </Routes>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default App;
