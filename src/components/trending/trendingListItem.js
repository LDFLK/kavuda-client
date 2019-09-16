import {Component} from "react";
import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Divider from "@material-ui/core/Divider/Divider";

class TrendingListItem extends Component {

  render() {
    return (
      <div>
        <Divider variant="inset" component="li"/>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="avatar.png"/>
          </ListItemAvatar>
          <ListItemText
            primary="Presidential Election: Still not decided to contest - President"
            secondary={
              <React.Fragment>
                {"Mon Aug 05 2019"}
              </React.Fragment>

            }
          />
        </ListItem>
      </div>
    )
  }
}

export default TrendingListItem;
