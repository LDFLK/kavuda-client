import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import Grid from '@material-ui/core/Grid';
import TrendingList from "../trending/trendingList";
import MainContentList from "../latest/mainContentList"
import Typography from "@material-ui/core/Typography/Typography";
import InfiniteList from "../infinite-list/infinite-list";

class SearchResult extends Component {

  componentDidMount() {
    this.props.handleChange("searchKey", this.props.match.params.searchKey);
    this.props.getSearchResults(this.props.match.params.searchKey, true);
    if (this.props.trendingResults.length === 0) {
      this.props.getTrendingResults();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.searchKey !== this.props.match.params.searchKey) {
      this.props.getSearchResults(this.props.match.params.searchKey, true);
    }
  }

  render() {
    const {classes, searchResults, trendingResults, getTrendingResults, getSearchResults} = this.props;
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={3} className={classes.leftContentColumn}>
          <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Trending</Typography>
          <InfiniteList listItems={trendingResults}
                        getResultItems={getTrendingResults}
                        list={<TrendingList listItems={trendingResults}/>}
          />
        </Grid>
        <Grid item xs={6} className={classes.mainContentColumn}>
          <Typography variant="h4" color="inherit" noWrap>Search Results:</Typography>
          <InfiniteList listItems={searchResults}
                        getResultItems={() => getSearchResults(this.props.match.params.searchKey, false)}
                        list={<MainContentList listItems={searchResults}/>}
          />
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(Styles)(SearchResult);
