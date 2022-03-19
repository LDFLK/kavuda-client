import React, {useEffect, useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import TrendingList from "../trending/TrendingList";
import MainContentList from "../latest/MainContentList";
import Typography from '@mui/material/Typography';
import InfiniteList from "../infinite-list/infinite-list";
import {getResults} from "../../functions/api/GetQueries";
import {ApiRoutes, getServerUrl} from "../../server";

function Home(props) {

  const {classes} = props;
  const [homeResults, setHomeResults] = useState([]);
  const [homePage, setHomePage] = useState(0);
  const [trendingResults, setTrendingResults] = useState([]);
  const [trendingPage, setTrendingPage] = useState(0);

  function getHomeResults() {
    let searchUrl = getServerUrl(ApiRoutes.search) + '&categories=News';
    return getResults(searchUrl, false, homeResults, homePage, setHomeResults, setHomePage, 15);

  }

  function getTrendingResults() {
    let searchUrl = getServerUrl(ApiRoutes.search) + '&categories=News';
    getResults(searchUrl, false, trendingResults, trendingPage, setTrendingResults, setTrendingPage, 15);

  }

  useEffect(() => {
    if (homeResults.length === 0) {
      console.log("loading home results");
      getHomeResults();
      getTrendingResults();
    }
  });


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
