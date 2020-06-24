import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Styles from "../../styles/styles"
import Grid from "@material-ui/core/Grid/Grid";
import ListItem from "@material-ui/core/ListItem/ListItem";
import RelatedLinkList from "./relatedLinkList";
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

class MainContentItem extends Component {

  render() {
    const {classes, imageUrl, title, subtitle, description, links, categories} = this.props;
    return (
      <Paper className={classes.paper}>
        <ListItem alignItems="flex-start">
          <Grid container width={1}>
            <Grid item md={5}>
              <Link className={classes.itemLink} to={"/profile/" + title}>
                <img alt={title} src={imageUrl === "" ? "avatar.png" : imageUrl} className={classes.searchAvatar}/>
              </Link>
            </Grid>
            <Grid item md={7}>
              <div style={{padding: '20px'}}>
                <Typography className={classes.mainContentItemTitle} variant="body2">
                  {categories ? categories.map((category) => (
                    <Link key={category} className={classes.link} to={"/search/" + category + ":"}>
                      <Chip style={{cursor:'pointer'}}
                        size="small"
                        label={category}
                        variant="outlined"
                      />
                    </Link>
                  )) : null}
                </Typography>
                <Link className={classes.itemLink} to={"/profile/" + title}>
                  <Typography className={classes.mainContentItemTitle} variant='h4'><span className={"news-title"}>{title}</span></Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {subtitle}
                  </Typography>
                  <Typography
                    className={"news-description"}
                    style={{marginBottom:'10px'}}
                    variant="body2"
                    color="textSecondary"
                  >
                    {description}
                  </Typography>
                </Link>
                <RelatedLinkList links={links}/>
              </div>
            </Grid>
          </Grid>
        </ListItem>
      </Paper>
    )
  }
}

export default withStyles(Styles)(MainContentItem);
