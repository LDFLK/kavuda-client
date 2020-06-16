import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../styles/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TrendingList from "./trending/trendingList";
import MainContentList from "./latest/mainContentList";
import Typography from '@material-ui/core/Typography';
import InfiniteList from "./infinite-list/infinite-list";

class Home extends Component {

  componentDidMount() {
    if (this.props.trendingResults.length === 0) {
      this.props.getHomeResults();
    }
    if (this.props.trendingResults.length === 0) {
      this.props.getTrendingResults();
    }
  }

  render() {
    const {classes, homeResults, trendingResults, getTrendingResults, getHomeResults} = this.props;
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="inherit" noWrap>Latest</Typography>
            <InfiniteList listItems={homeResults}
                          getResultItems={getHomeResults}
                          list={<MainContentList listItems={homeResults}/>}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.trendingContainer}>
            <Typography variant="h4" color="inherit" noWrap>Trending</Typography>
            <InfiniteList listItems={trendingResults}
                          getResultItems={getTrendingResults}
                          list={<TrendingList listItems={trendingResults}/>}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Home);
