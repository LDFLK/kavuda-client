import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TrendingList from "../trending/trendingList";
import MainContentList from "../latest/mainContentList"
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Profile extends Component {

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Related
            <TrendingList/>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Grid container width={1}>
              <Grid item>
                <Avatar alt="Profile Image" src="avatar.png" className={classes.bigAvatar}/>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h4" gutterBottom>
                  Profile Name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                  unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                  dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>

              </Grid>
            </Grid>
            <MainContentList/>
            <MainContentList/>
            <MainContentList/>
            <MainContentList/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Profile);
