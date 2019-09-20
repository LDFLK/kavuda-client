import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TrendingList from "../trending/trendingList";
import MainContentList from "../latest/mainContentList"

class SearchResult extends Component {

  componentDidMount() {
    this.props.handleChange("searchKey", this.props.match.params.searchKey);
    this.props.getSearchResults(this.props.match.params.searchKey);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.searchKey !== this.props.match.params.searchKey) {
      this.props.getSearchResults(this.props.match.params.searchKey);
    }
  }

  render() {
    const {classes, searchResults, trendingResults, getTrendingResults} = this.props;
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            Search Results:
            <MainContentList listItems={searchResults}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Trending
            <TrendingList results={trendingResults} getResults={getTrendingResults}/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(SearchResult);
