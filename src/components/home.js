import React, {Component, useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../styles/styles"
import Grid from '@mui/material/Grid';
import TrendingList from "./trending/trendingList";
import MainContentList from "./latest/mainContentList";
import Typography from '@mui/material/Typography';
import InfiniteList from "./infinite-list/infinite-list";

function Home(props) {

  const {classes} = props;
  const [homeResults, setHomeResults] = useState([]);
  const [homePage, setHomePage] = useState(0);
  const [trendingResults, setTrendingResults] = useState([]);
  const [trendingPage, setTrendingPage] = useState(0);

  async function getResults(searchUrl, newSearch, result, page, setResults,setPage, limit) {
    searchUrl += '&limit=' + limit + '&page=' + (newSearch ? 1 : (page + 1));
    const response = await fetch(searchUrl, {method: 'GET'});
    const json = await response.json();

    if (response.status === 200) {
      if (newSearch) {
        setResults(json);
        setPage(1);
      } else {
        if (json) {
          setResults(result.concat(json));
          setPage(page+1);
        } else {
          return false;
        }
      }
    }
    return true
  }

  async function getHomeResults() {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
    return await getResults(searchUrl, false, homeResults, homePage, setHomeResults, setHomePage, 15);

  }
  if (homeResults.length===0){
    console.log("homeresuls");
    getHomeResults();
  }

  async function getTrendingResults() {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
    return await getResults(searchUrl, false, trendingResults, trendingPage, setTrendingResults, setTrendingPage, 15);

  }
  if (trendingResults.length===0){
    console.log("trendingresuls");
    getTrendingResults();
  }


  return (
    <Grid className={classes.container} container width={1}>
      <Grid item xs={3} className={classes.leftContentColumn}>
        <Typography variant="h4" className={classes.headerText} noWrap>Most Viewed</Typography>
        <InfiniteList listItems={trendingResults}
                      getResultItems={getTrendingResults}
                      list={<TrendingList listItems={trendingResults}/>}
        />
      </Grid>
      <Grid item xs={6} className={classes.mainContentColumn}>
        <InfiniteList listItems={homeResults}
                      getResultItems={getHomeResults}
                      list={<MainContentList listItems={homeResults}/>}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(Styles)(Home);
