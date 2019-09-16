import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Styles from "../../styles/styles"
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";
import Divider from "@material-ui/core/Divider/Divider";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import RelatedLinkList from "./relatedLinkList";
import {Link} from "react-router-dom";

class MainContentItem extends Component {

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Divider variant="inset" component="li"/>
        <ListItem alignItems="flex-start">
          <Grid container width={1} spacing={2}>
              <Grid item md={1}>
                <Link className={classes.itemLink} to={'#'}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="avatar.png"/>
                </ListItemAvatar>
                </Link>
              </Grid>
              <Grid item md={11}>
                <Link className={classes.itemLink} to={'#'}>
                <ListItemText
                  primary="Presidential Election: Still not decided to contest - President"
                  secondary={
                    <React.Fragment>
                      {"Mon Aug 05 20 19"}
                      <br/>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        President Maithripala Sirisena said he has not yet decided whether to contest or not at the
                        next
                        presidential election although there are many requests for him to contest.
                      </Typography>
                    </React.Fragment>

                  }
                />
                </Link>
              </Grid>
            <Grid item md={1}>
            </Grid>
            <Grid item md={11}>
              <RelatedLinkList/>
            </Grid>
          </Grid>
        </ListItem>
      </div>
    )
  }
}

export default withStyles(Styles)(MainContentItem);
