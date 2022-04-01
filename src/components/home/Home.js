import React from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import {InfiniteList, MainContentList} from "@lsflk/gig-client-shared/components";
import Typography from '@mui/material/Typography';
import {getResults} from "@lsflk/gig-client-shared/functions";
import {AppRoutes} from "../../routes";
import {ApiRoutes} from "@lsflk/gig-client-shared/routes"
import TrendingList from "../trending-list/TrendingList";

function Home(props) {

  const {classes} = props;

  return (
    <Grid className={classes.container} container width={1}>
      <Grid item xs={3} className={classes.leftContentColumn}>
        <Typography variant="h4" className={classes.headerText} noWrap>Most Viewed</Typography>
        <InfiniteList
          searchKey={'News:'}
          getResults={(page = 1) => getResults('News:', ApiRoutes.search, page)}
          list={(results) => <TrendingList
            elevation={3}
            listItems={results}
            entityRoute={AppRoutes.entity}
            searchRoute={AppRoutes.search}/>}
        />
      </Grid>
      <Grid item xs={6} className={classes.mainContentColumn}>
        <InfiniteList
          searchKey={'News:'}
          getResults={(page = 1) => getResults('News:', ApiRoutes.search, page)}
          list={(results) => <MainContentList
            elevation={3}
            listItems={results}
            entityRoute={AppRoutes.entity}
            searchRoute={AppRoutes.search}/>}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(Styles)(Home);
