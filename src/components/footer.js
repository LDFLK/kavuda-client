import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Styles from "../styles/styles"

class Footer extends Component {

  render() {
    const {classes} = this.props;
    return (
      <AppBar className={classes.footer} position="static">
        <Typography component="p">
          A Social Network of High Profile Personals and Organizations in Sri Lanka.
        </Typography>
      </AppBar>
    )
  }
}

export default withStyles(Styles)(Footer);
