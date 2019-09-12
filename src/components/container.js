import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../styles/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom'


class Container extends Component {

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <List className={classes.listContainer}>
              <ListItem alignItems="flex-start">
                <Grid container width={1} spacing={2}>
                  <Grid item md={1}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="avatar.png"/>
                    </ListItemAvatar>
                  </Grid>
                  <Grid item md={11}>
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
                  </Grid>
                  <Grid item md={1}>
                  </Grid>
                  <Grid item md={11}>
                    <Grid container width={1} spacing={2}>
                      <Grid item>
                        <Link className={classes.link} to={'#'}>
                          <Avatar alt="No Image" src="avatar.png"/>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            Long Entity Text 1
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link className={classes.link} to={'#'}>
                          <Avatar alt="No Image" src="avatar.png"/>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            Long Entity Text 2
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link className={classes.link} to={'#'}>
                          <Avatar alt="No Image" src="avatar.png"/>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            Long Entity Text 3
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link className={classes.link} to={'#'}>
                          <Avatar alt="No Image" src="avatar.png"/>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            Long Entity Text 4
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link className={classes.link} to={'#'}>
                          <Avatar alt="No Image" src="avatar.png"/>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            Long Entity Text 5
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider variant="inset" component="li"/>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Trending
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Container);
