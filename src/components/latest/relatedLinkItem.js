import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Styles from "../../styles/styles"
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";

class RelatedLinkItem extends Component {

  render() {
    const {classes, imageUrl, title} = this.props;
    return (
      <Grid item>
        <Link className={classes.link} to={"/profile/"+title}>
          {imageUrl === "" ?
            <Avatar alt={title} src="avatar.png"/>
            :<Avatar alt={title} src={imageUrl}/>
          }
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary">
            {title}
          </Typography>
        </Link>
      </Grid>
    )
  }
}

export default withStyles(Styles)(RelatedLinkItem);
