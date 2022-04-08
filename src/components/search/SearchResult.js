import React from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import {InfiniteList, MainContentList} from "gig-client-shared/components"
import Typography from "@mui/material/Typography/Typography";
import {getResults} from "gig-client-shared/functions";
import {useParams} from "react-router-dom";
import {AppRoutes} from "../../routes";
import {ApiRoutes} from "gig-client-shared/routes"
import TrendingList from "../trending-list/TrendingList";

function SearchResult(props) {

  const {searchParam} = useParams();
  const {classes, setIsLoading} = props;

  async function getSearchResults(searchKey, page = 1) {
    const response = await getResults(searchKey, ApiRoutes.search, page);
    setIsLoading(false);
    return response
  }

  return (
    <Grid className={classes.container} container width={1}>
      <Grid item xs={3} className={classes.leftContentColumn}>
        <Typography variant="h3" className={classes.headerText}>Most Viewed</Typography>
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
          searchKey={searchParam}
          getResults={(page = 1) => getSearchResults(searchParam, page)}
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

export default withStyles(Styles)(SearchResult);
