import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TrendingList from "../trending/trendingList";
import MainContentList from "../latest/mainContentList"
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormattedContent from "./formattedContent";

class Profile extends Component {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title);
    }
  }

  render() {
    const {classes, loadedEntity} = this.props;
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
                <Avatar alt={loadedEntity.title} src={loadedEntity.image_url === "" ? "avatar.png" : loadedEntity.image_url} className={classes.bigAvatar}/>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h4" gutterBottom>
                  {loadedEntity.title}
                </Typography>
                  <table>
                    <tbody>
                    {loadedEntity.attributes ? loadedEntity.attributes.map((attribute) => (
                      <FormattedContent key={attribute.name} content={attribute}/>
                    )) : null}
                    </tbody>
                  </table>
              </Grid>
            </Grid>
            <MainContentList/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Profile);
