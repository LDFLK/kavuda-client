import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../styles/styles"
import Grid from '@material-ui/core/Grid';
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
        <Grid item xs={3} className={classes.leftContentColumn}>
          <Typography variant="h4" className={classes.headerText} noWrap>Trending</Typography>
          <InfiniteList listItems={trendingResults}
                        getResultItems={getTrendingResults}
                        list={<TrendingList listItems={trendingResults}/>}
          />
        </Grid>
        <Grid item xs={6} className={classes.mainContentColumn}>
          <Typography variant="h4" className={classes.headerText} noWrap>Latest</Typography>
          <InfiniteList listItems={homeResults}
                        getResultItems={getHomeResults}
                        list={<MainContentList listItems={homeResults}/>}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Home);
