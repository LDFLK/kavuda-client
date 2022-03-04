import React, {Component} from "react";
import {withStyles} from "@mui/material";
import Typography from '@mui/material/Typography';
import Styles from "../../styles/styles"
import Grid from "@mui/material/Grid/Grid";
import ListItem from "@mui/material/ListItem/ListItem";
import {Link} from "react-router-dom";
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Avatar from "@mui/material/Avatar/Avatar";
import moment from 'moment';

class MainContentItem extends Component {

  render() {
    const ignoreCategories = ["News", "PERSON", "ORGANIZATION", "LOCATION", "arbitrary-entities", "OrgChart-Level1"];
    const {classes, imageUrl, title, subtitle, description, links, categories, vertical} = this.props;
    if (vertical) {
      return (
        <Paper className={classes.paper}>
          <div style={{padding: '20px'}}>
            <Link className={classes.itemLink} to={"/profile/" + title}>
              <table width='100%'>
                <tbody>
                <tr>
                  <td style={{paddingRight: '10px'}}>
                    <Avatar alt={title} src={imageUrl === "" ? "avatar.png" : imageUrl}/>
                  </td>
                  <td width='100%'>
                    <Typography className={classes.mainContentItemTitle} variant='h4'>
                      <span className={"news-title"}>{title}</span>
                    </Typography>
                  </td>
                </tr>
                </tbody>
              </table>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {moment(subtitle,'DD  MMM YYYY h:mm A').fromNow()}
              </Typography>
              <Typography
                className={"news-description"}
                style={{marginBottom: '10px'}}
                variant="body2"
                color="textSecondary"
              >
                {description}
              </Typography>
            </Link>
            {categories ? categories.map((category) => (
              ignoreCategories.includes(category) ? null :
                <Link key={category} className={classes.link} to={"/search/" + category + ":"}>
                  <Chip style={{cursor: 'pointer'}}
                        size="small"
                        label={category}
                        variant="outlined"
                  />
                </Link>
            )) : null}
          </div>
        </Paper>
      )
    }
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
                <Link className={classes.itemLink} to={"/profile/" + title}>
                  <Typography className={classes.mainContentItemTitle} variant='h4'><span
                    className={"news-title"}>{title}</span></Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {moment(subtitle,'DD  MMM YYYY h:mm A').fromNow()}
                  </Typography>
                  <Typography
                    className={"news-description"}
                    style={{marginBottom: '10px'}}
                    variant="body2"
                    color="textSecondary"
                  >
                    {description}
                  </Typography>
                </Link>
                <div>
                  {categories ? categories.map((category) => (
                    ignoreCategories.includes(category) ? null :
                      <Link key={category} className={classes.link} to={"/search/" + category + ":"}>
                        <Chip style={{cursor: 'pointer'}}
                              size="small"
                              label={category}
                              variant="outlined"
                        />
                      </Link>
                    )) : null}
                </div>
                {/*<RelatedLinkList links={links}/>*/}
              </div>
            </Grid>
          </Grid>
        </ListItem>
      </Paper>
    )
  }
}

export default withStyles(Styles)(MainContentItem);
