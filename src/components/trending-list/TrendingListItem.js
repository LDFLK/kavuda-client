import React, {Component} from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItem from "@mui/material/ListItem/ListItem";
import {Link} from "react-router-dom";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles";
import Typography from "@mui/material/Typography/Typography";
import moment from "moment";
import {AppRoutes} from "../../routes";
import {AppDateFormat} from "../constants/DateFormats";
import {EntityTypes} from "../constants/EntityTypes";
import defaultImage from "../../resources/images/unknown.png"

class TrendingListItem extends Component {

  render() {
    const {classes, title, subtitle, imageUrl, categories} = this.props;
    let entityImage = defaultImage;
    for (let entityType of Object.entries(EntityTypes)) {
      if (categories.includes(entityType.value)) {
        entityImage = entityType.image;
      }
    }

    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Link className={classes.itemLink} to={AppRoutes.entity + title}>
            <Avatar alt={title} src={imageUrl === "" ? entityImage : imageUrl}/>
          </Link>
        </ListItemAvatar>
        <Link className={classes.itemLink} to={AppRoutes.entity + title}>
          <Typography className={classes.trendingItemTitle} variant='h6'><span
            className={"news-title"}>{title}</span></Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {moment(subtitle, AppDateFormat).fromNow()}
          </Typography>
        </Link>
      </ListItem>
    )
  }
}

export default withStyles(Styles)(TrendingListItem);

