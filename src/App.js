import React, {useEffect, useState} from 'react';
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
import {getResults} from "@lsflk/gig-client-shared/functions";
import {ApiRoutes} from "@lsflk/gig-client-shared/routes";

const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const localeToken = 'kavuda-locale';

function App() {
  const [trendingResults, setTrendingResults] = useState([]);
  const [trendingPage, setTrendingPage] = useState(0);

  function setLocale(value) {
    localStorage.setItem(localeToken, value);
    setLocaleState(value);
  }

  function getLocaleCookie() {
    return localStorage.getItem(localeToken);
  }

  if (!getLocaleCookie()) {
    localStorage.setItem(localeToken, Locales.en);
  }

  function getTrendingResults(page = 1) {
    getResults('&categories=News', ApiRoutes.search, page).then((data) => {
      if (data === null && page === 1) {
        setTrendingResults([]);
        setTrendingPage(1)
      }
      else if (page === 1 || !setTrendingResults) {
        setTrendingResults(data);
        setTrendingPage(2)
      } else {
        setTrendingResults([...trendingResults, ...data]);
        setTrendingPage(trendingPage + 1);
      }
    });
  }

  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocaleState] = useState(getLocaleCookie());

  const app_props = {
    isLoading,
    setIsLoading,
    locale,
    setLocale,
    trendingResults,
    trendingPage,
    getTrendingResults,
    searchKey, setSearchKey
  };

  useEffect(() => {
    if (trendingResults.length === 0) {
      console.log("loading trending results");
      getTrendingResults();
    }
  });

  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Routes>
          <Route element={<Header {...app_props}/>}>
            <Route path={AppRoutes.home} element={<Home {...app_props}/>}/>
            <Route path={AppRoutes.search + ":searchParam"} element={<SearchResult {...app_props}/>}/>
            <Route path={AppRoutes.entity + ":title"} element={<Profile {...app_props}/>}/>
            <Route path="*" element={<div>invalid url!</div>}/>
          </Route>
        </Routes>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default App;
