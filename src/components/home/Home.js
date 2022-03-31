import React, {useEffect, useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import TrendingList from "../trending-list/TrendingList";
import {InfiniteList, MainContentList} from "@lsflk/gig-client-shared/components";
import Typography from '@mui/material/Typography';
import {getResults} from "@lsflk/gig-client-shared/functions";
import {AppRoutes} from "../../routes";
import {ApiRoutes} from "@lsflk/gig-client-shared/routes"

function Home(props) {

  const {classes, trendingResults, trendingPage, getTrendingResults} = props;
  const [homeResults, setHomeResults] = useState([]);
  const [homePage, setHomePage] = useState(0);

  function getHomeResults(page = 1) {
    getResults('News:', ApiRoutes.search, page).then((data) => {
      if (data === null && page === 1) {
        setHomeResults([]);
        setHomePage(1)
      }
      else if (page === 1 || !setHomeResults) {
        setHomeResults(data);
        setHomePage(2)
      } else {
        setHomeResults([...homeResults, ...data]);
        setHomePage(homePage + 1);
      }
    });
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
                      getResultItems={() => getTrendingResults(trendingPage)}
                      list={<TrendingList listItems={trendingResults}/>}
        />
      </Grid>
      <Grid item xs={6} className={classes.mainContentColumn}>
        <InfiniteList listItems={homeResults}
                      getResultItems={() => getHomeResults(homePage)}
                      list={<MainContentList
                        entityRoute={AppRoutes.entity}
                        searchRoute={AppRoutes.search}
                        listItems={homeResults}/>}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(Styles)(Home);
