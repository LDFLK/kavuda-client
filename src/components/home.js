import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../styles/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TrendingList from "./trending/trendingList";
import MainContentList from "./latest/mainContentList";
import Typography from '@material-ui/core/Typography';

class Home extends Component {

  componentDidMount() {
    this.props.getHomeResults();
  }

  render() {
    const {classes, homeResults, trendingResults, getTrendingResults} = this.props;
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="inherit" noWrap>Latest</Typography>
            <MainContentList listItems={homeResults}
                             getSearchResults={() => this.props.getHomeResults()}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.trendingContainer}>
            <Typography variant="h4" color="inherit" noWrap>Trending</Typography>
            <TrendingList results={trendingResults} getResults={getTrendingResults}/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Home);
