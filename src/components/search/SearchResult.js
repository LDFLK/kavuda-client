import React, {useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import TrendingList from "../trending-list/TrendingList";
import {InfiniteList, MainContentList} from "@lsflk/gig-client-shared/components"
import Typography from "@mui/material/Typography/Typography";
import {getResults} from "@lsflk/gig-client-shared/functions";
import {useParams} from "react-router-dom";
import {AppRoutes} from "../../routes";
import {ApiRoutes} from "@lsflk/gig-client-shared/routes"

function SearchResult(props) {

  const {searchParam} = useParams();
  const {classes, setIsLoading, trendingResults, trendingPage, getTrendingResults} = props;
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(0);
  const [searchState, setSearchState] = useState("");

  function getSearchResults(page = 1) {
    if (searchParam.length > 1) {
      getResults(searchParam, ApiRoutes.search, page).then((data) => {
        if (data === null && page === 1) {
          setSearchResults([]);
          setSearchPage(1)
        }
        else if (page === 1 || !searchResults) {
          setSearchResults(data);
          setSearchPage(2)
        } else {
          setSearchResults([...searchResults, ...data]);
          setSearchPage(searchPage + 1);
        }
        setIsLoading(false);
      })
    }
  }

  if (searchParam !== searchState) {
    console.log("loading search results:", searchParam);
    setSearchState(searchParam);
    getSearchResults();
  }

  return (
    <Grid className={classes.container} container width={1}>
      <Grid item xs={3} className={classes.leftContentColumn}>
        <Typography variant="body2" color="inherit" className={classes.headerText} noWrap>Most Viewed</Typography>
        <InfiniteList listItems={trendingResults}
                      getResultItems={() => getTrendingResults(trendingPage)}
                      list={<TrendingList listItems={trendingResults}/>}
        />
      </Grid>
      <Grid item xs={6} className={classes.mainContentColumn}>
        <InfiniteList listItems={searchResults}
                      getResultItems={() => getSearchResults(searchPage)}
                      list={<MainContentList
                        entityRoute={AppRoutes.entity}
                        searchRoute={AppRoutes.search}
                        listItems={searchResults}/>}
        />
      </Grid>

    </Grid>
  );
}

export default withStyles(Styles)(SearchResult);
