import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";
import ReactTooltip from 'react-tooltip'

class RelatedLinkItem extends Component {

  render() {
    const {classes, imageUrl, title} = this.props;
    return (
      <Grid item>
        <Link data-tip={title} className={classes.link} to={"/profile/" + title}>
          <Avatar alt={title} src={imageUrl === "" ? "avatar.png" : imageUrl}/>
          <ReactTooltip/>
        </Link>
      </Grid>
    )
  }
}

export default withStyles(Styles)(RelatedLinkItem);
