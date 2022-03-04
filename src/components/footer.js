import React, {Component} from "react";
import {withStyles} from "@mui/material";
import Typography from '@mui/material/Typography';
import Styles from "../styles/styles"

class Footer extends Component {

  render() {
    const {classes} = this.props;
    return (
        <Typography className={classes.footer} component="p" color="textSecondary">
          A Social Network of High Profile Personals and Organizations in Sri Lanka.
        </Typography>
    )
  }
}

export default withStyles(Styles)(Footer);
