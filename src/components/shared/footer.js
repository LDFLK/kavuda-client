import React from "react";
import {withStyles} from "@mui/styles";
import Typography from '@mui/material/Typography';
import Styles from "../../styles/styles"

function Footer(props) {

    const {classes} = props;
    return (
        <Typography className={classes.footer} component="p" color="textSecondary">
          A Social Network of High Profile Personals and Organizations in Sri Lanka.
        </Typography>
    )
}

export default withStyles(Styles)(Footer);
