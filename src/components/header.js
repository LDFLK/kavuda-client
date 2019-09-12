import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {withStyles} from "@material-ui/core";
import Styles from "../styles/styles"

class Header extends Component {

  render() {
    const {classes} = this.props;
    return (
      <AppBar className={classes.appBar} position="static">
        Kavuda.lk
      </AppBar>
    )
  }
}

export default withStyles(Styles)(Header);
