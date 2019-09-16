import {Component} from "react";
import React from "react";
import List from "@material-ui/core/List/List";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles";
import TrendingListItem from "./trendingListItem";

class TrendingList extends Component {

  render() {
    const {classes} = this.props;
    return (
        <List className={classes.listContainer}>
          <TrendingListItem/>
          <TrendingListItem/>
          <TrendingListItem/>
          <TrendingListItem/>
          <TrendingListItem/>
          <TrendingListItem/>
        </List>
    )
  }
}

export default withStyles(Styles)(TrendingList);
