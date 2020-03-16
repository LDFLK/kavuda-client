import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Styles from "../../styles/styles"
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";
import Divider from "@material-ui/core/Divider/Divider";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import RelatedLinkList from "./relatedLinkList";
import {Link} from "react-router-dom";

class MainContentItem extends Component {

  render() {
    const {classes, imageUrl, title, subtitle, description, links, categories} = this.props;
    return (
      <div>
        <Divider variant="inset" component="li"/>
        <ListItem alignItems="flex-start">
          <Grid container width={1}>
            <Grid item md={1}>
              <Link className={classes.itemLink} to={"/profile/" + title}>
                <Avatar alt={title} src={imageUrl === "" ? "avatar.png" : imageUrl} className={classes.searchAvatar}/>
              </Link>
            </Grid>
            <Grid item md={11}>
              <Grid container width={1}>
                <Grid item md={12}>
                  <Typography variant="body2">{categories ? categories.map((category) => (
                    <Link key={category} className={classes.link} to={"/search/" + category + ":"}>
                      {category}
                    </Link>
                  )) : null}</Typography>
                  <Link className={classes.itemLink} to={"/profile/" + title}>
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
              </Grid>
              <Grid item md={11}>
                <RelatedLinkList links={links}/>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </div>
    )
  }
}

export default withStyles(Styles)(MainContentItem);
