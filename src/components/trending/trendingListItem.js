import {Component} from "react";
import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Divider from "@material-ui/core/Divider/Divider";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles";

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
      <div>
        <Divider variant="inset" component="li"/>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Link className={classes.itemLink} to={"/profile/" + title}>
              <Avatar alt={title} src={imageUrl === "" ? defaultImageUrl : imageUrl}/>
            </Link>
          </ListItemAvatar>
          <Link className={classes.itemLink} to={"/profile/" + title}>
            <ListItemText
              primary={title}
              secondary={
                <React.Fragment>
                  {subtitle}
                </React.Fragment>

              }
            />
          </Link>
        </ListItem>
      </div>
    )
  }
}

export default withStyles(Styles)(TrendingListItem);

