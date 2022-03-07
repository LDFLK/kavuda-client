import React, {useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import TrendingList from "../trending/TrendingList";
import MainContentList from "../latest/MainContentList"
import Typography from "@mui/material/Typography/Typography";
import InfiniteList from "../infinite_list/InfiniteList";
import {getResults} from "../../functions/api/GetQueries";
import {useParams} from "react-router-dom";

function SearchResult(props) {

  const {searchKey} = useParams();
  const {classes, setIsLoading} = props;
  const [searchResults, setSearchResults] = useState(null);
  const [searchPage, setSearchPage] = useState(0);
  const [trendingResults, setTrendingResults] = useState(null);
  const [trendingPage, setTrendingPage] = useState(0);
  const [searchState, setSearchState] = useState("");

  function getTrendingResults() {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=&categories=News';
    getResults(searchUrl, false, trendingResults, trendingPage, setTrendingResults, setTrendingPage, 15);
  }

  async function getSearchResults(initialSearch) {
    if (searchKey.length > 1) {
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
      if (searchKey.includes(":")) {
        let searchArray = searchKey.split(":", 2);
        searchUrl += searchArray[1] + '&categories=' + searchArray[0];
      } else {
        searchUrl += searchKey;
      }
      let result= await getResults(searchUrl, initialSearch, searchResults, searchPage, setSearchResults, setSearchPage, 15);
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
