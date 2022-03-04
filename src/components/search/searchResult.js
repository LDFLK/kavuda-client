import React, {Component} from "react";
import {withStyles} from "@mui/material";
import Styles from "../../styles/styles"
import Grid from '@mui/material/Grid';
import TrendingList from "../trending/trendingList";
import MainContentList from "../latest/mainContentList"
import Typography from "@mui/material/Typography/Typography";
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
          <Typography variant="body2" color="inherit" className={classes.headerText} noWrap>Most Viewed</Typography>
          <InfiniteList listItems={trendingResults}
                        getResultItems={getTrendingResults}
                        list={<TrendingList listItems={trendingResults}/>}
          />
        </Grid>
        <Grid item xs={6} className={classes.mainContentColumn}>
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
