import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import List from "@material-ui/core/List/List";
import MainContentItem from "./mainContentItem"

class MainContentList extends Component {

  render() {
    const {classes} = this.props;
    return (
      <List className={classes.listContainer}>
        <MainContentItem/>
      </List>
    )
  }
}

export default withStyles(Styles)(MainContentList);
