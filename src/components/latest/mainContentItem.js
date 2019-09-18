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
    const {classes,imageUrl, title, subtitle, description, links} = this.props;
    return (
      <div>
        <Divider variant="inset" component="li"/>
        <ListItem alignItems="flex-start">
          <Grid container width={1} spacing={2}>
              <Grid item md={1}>
                <Link className={classes.itemLink} to={"profile/"+title}>
                <ListItemAvatar>
                  {imageUrl === "" ?
                    <Avatar alt={title} src="avatar.png"/>
                    :<Avatar alt={title} src={imageUrl}/>
                  }
                </ListItemAvatar>
                </Link>
              </Grid>
              <Grid item md={11}>
                <Link className={classes.itemLink} to={"/profile/"+title}>
                <ListItemText
                  primary={title}
                  secondary={
                    <React.Fragment>
                      {subtitle}
                      <br/>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {description}
                      </Typography>
                    </React.Fragment>

                  }
                />
                </Link>
              </Grid>
            <Grid item md={1}>
            </Grid>
            <Grid item md={11}>
              <RelatedLinkList links={links}/>
            </Grid>
          </Grid>
        </ListItem>
      </div>
    )
  }
}

export default withStyles(Styles)(MainContentItem);
