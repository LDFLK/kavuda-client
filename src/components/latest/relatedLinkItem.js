import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";
import Tooltip from '@material-ui/core/Tooltip';

class RelatedLinkItem extends Component {

  render() {
    const {classes, imageUrl, title} = this.props;
    return (
      <Grid item>
        <Tooltip title={title} aria-label="add">
          <Link data-tip={title} className={classes.link} to={"/profile/" + title}>
            <Avatar alt={title} src={imageUrl === "" ? "avatar.png" : imageUrl}/>
          </Link>
        </Tooltip>
      </Grid>
    )
  }
}

export default withStyles(Styles)(RelatedLinkItem);
