import React, {useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import TrendingList from "../trending-list/TrendingList";
import {FormattedContentViewer, InfiniteList, MainContentList} from "@lsflk/gig-client-shared/components"
import Typography from "@mui/material/Typography/Typography";
import {getResults} from "@lsflk/gig-client-shared/functions";
import {useParams} from "react-router-dom";
import {ApiRoutes, getServerUrl} from "@lsflk/gig-client-shared/routes";

function SearchResult(props) {

  const {searchKey} = useParams();
  const {classes, setIsLoading} = props;
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(0);
  const [trendingResults, setTrendingResults] = useState(null);
  const [trendingPage, setTrendingPage] = useState(0);
  const [searchState, setSearchState] = useState("");

  function getTrendingResults() {
    let searchUrl = getServerUrl(ApiRoutes.search) + '&categories=News';
    getResults(searchUrl, false, trendingResults, trendingPage, setTrendingResults, setTrendingPage, 15);
  }

  async function getSearchResults(initialSearch) {
    if (searchKey.length > 1) {
      let result = await getResults(searchKey, initialSearch, searchResults, searchPage, setSearchResults, setSearchPage, 15);
      setIsLoading(false);
      return result
    }
    return false
  }

  if (searchKey !== searchState) {
    console.log("loading search results:", searchKey);
    getSearchResults(true);
    getTrendingResults();
    setSearchState(searchKey);
  }

  return (
    <Grid className={classes.container} container width={1}>
      <Grid item xs={3} className={classes.leftContentColumn}>
        <Typography variant="body2" color="inherit" className={classes.headerText} noWrap>Most Viewed</Typography>
        <InfiniteList listItems={trendingResults}
                      getResultItems={getTrendingResults}
                      list={<TrendingList listItems={trendingResults}/>}
        />
      </Grid>
      <Grid item xs={6} className={classes.mainContentColumn}>
        <InfiniteList listItems={searchResults}
                      getResultItems={getSearchResults}
                      list={<MainContentList listItems={searchResults}/>}
        />
      </Grid>

    </Grid>
  );
}

export default withStyles(Styles)(SearchResult);
