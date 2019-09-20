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
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider/Divider";
import {Link} from "react-router-dom";

class Profile extends Component {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title);
    this.props.getRelatedResults(this.props.match.params.title);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title);
      this.props.getRelatedResults(this.props.match.params.title);
    }
  }

  render() {
    const {classes, loadedEntity, internalLinks, getInternalLinks, relatedResults} = this.props;
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Internal Links
            <Box height="90vh" overflow="auto">
              <TrendingList results={internalLinks} getResults={getInternalLinks}
                            searchParam={loadedEntity ? loadedEntity.title : ""}/>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Grid container width={1}>
              <Grid item>
                <Avatar alt={loadedEntity.title}
                        src={loadedEntity.image_url === "" ? "avatar.png" : loadedEntity.image_url}
                        className={classes.bigAvatar}/>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h4" gutterBottom>
                  {loadedEntity.title}
                </Typography>
                <Box maxHeight="70vh" overflow="auto">
                  <table>
                    <tbody>
                    {loadedEntity.attributes ? loadedEntity.attributes.map((attribute) => (
                      <FormattedContent key={attribute.name} content={attribute}/>
                    )) : null}
                    </tbody>
                  </table>
                </Box>
                <Typography variant="subtitle1">
                  {loadedEntity.categories ? loadedEntity.categories.map((tag) =>
                    <Link key={tag} className={classes.link} to={"/search/" + tag+":"}>
                      {tag}
                    </Link>
                  ) : null}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="inset" component="div"/>
            </Grid>
            <Grid item xs={11}>
              <br/>
              Related Articles
              <Box maxHeight="70vh" overflow="auto">
                <MainContentList listItems={relatedResults}/>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Profile);
