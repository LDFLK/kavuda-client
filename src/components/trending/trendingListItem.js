import {Component} from "react";
import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItem from "@material-ui/core/ListItem/ListItem";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles";
import Typography from "@material-ui/core/Typography/Typography";
import moment from "moment";

class TrendingListItem extends Component {

  render() {
    const {classes, title, subtitle, imageUrl, categories} = this.props;
    let defaultImageUrl = "unknown.png";
    if (categories.includes("PERSON")) {
      defaultImageUrl = "avatar.png"
    } else if (categories.includes("ORGANIZATION")) {
      defaultImageUrl = "organization.png"
    }

    return (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Link className={classes.itemLink} to={"/profile/" + title}>
              <Avatar alt={title} src={imageUrl === "" ? defaultImageUrl : imageUrl}/>
            </Link>
          </ListItemAvatar>
          <Link className={classes.itemLink} to={"/profile/" + title}>
            <Typography className={classes.trendingItemTitle} variant='h4'><span className={"news-title"}>{title}</span></Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {moment(subtitle,'DD  MMM YYYY h:mm A').fromNow()}
            </Typography>
          </Link>
        </ListItem>
    )
  }
}

export default withStyles(Styles)(TrendingListItem);

