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
import {Link} from "react-router-dom";
import InfiniteList from "../infinite-list/infinite-list";
import Chip from "@material-ui/core/Chip/Chip";

class Profile extends Component {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title);
    this.props.getRelatedResults(this.props.match.params.title, true);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title);
      this.props.getRelatedResults(this.props.match.params.title, true);
    }
  }

  render() {
    const {classes, loadedEntity, internalLinks, getInternalLinks, relatedResults, getRelatedResults} = this.props;

    if (loadedEntity == null) {
      return (
        <Grid className={classes.container} container width={1}>
          <Grid item xs={6} className={classes.mainContentColumn}>
            <Paper className={classes.profilePaper}>
              <Typography
                component="p"
                style={{paddingLeft: '20px'}}
                variant="body2"
                color="textSecondary">
                Document not found
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid className={classes.container} container width={1}>
          <Grid item xs={3} className={classes.leftContentColumn}>
            <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Related Links</Typography>
            <InfiniteList listItems={internalLinks}
                          getResultItems={getInternalLinks}
                          searchParam={loadedEntity.title}
                          list={<TrendingList listItems={internalLinks} getResults={getInternalLinks}
                                              searchParam={loadedEntity.title}/>}
            />
          </Grid>
          < Grid item xs={6} className={classes.mainContentColumn}>
            <Paper className={classes.profilePaper}>
              <Grid container width={1}>
                <Grid item xs={3}>
                  <img alt={loadedEntity.title}
                       src={loadedEntity.image_url === "" ? "avatar.png" : loadedEntity.image_url}
                       className={classes.profileAvatar}/>
                </Grid>
                <Grid item xs={9} style={{paddingLeft: '20px'}}>
                  <Typography className={classes.mainContentItemTitle} variant="body2">
                    {loadedEntity.categories ? loadedEntity.categories.map((category) => (
                      <Link key={category} className={classes.link} to={"/search/" + category + ":"}>
                        <Chip style={{cursor:'pointer'}}
                          size="small"
                          label={category}
                          variant="outlined"
                        />
                      </Link>
                    )) : null}
                  </Typography>
                  <Typography className={classes.mainContentItemTitle} variant='h4'>
                    {loadedEntity.title}
                  </Typography>
                  {loadedEntity.source ?
                    <Typography variant="body2">
                      Original Source: <a className={classes.link} href={loadedEntity.source}>
                      {loadedEntity.source}
                    </a>
                    </Typography> : null}
                  {loadedEntity.attributes ?
                    <Typography variant="body2">
                      {loadedEntity.attributes.author && loadedEntity.attributes.author.values[0].value_string ?
                        "Author: " + loadedEntity.attributes.author.values[0].value_string
                        : null}
                      {loadedEntity.attributes.date && loadedEntity.attributes.date.values[0].value_string ?
                        "Date: " + new Date(loadedEntity.attributes.date.values[0].value_string).toDateString()
                        : null}
                    </Typography> : null}

                </Grid>
              </Grid>
              <br/>
              {loadedEntity.attributes && loadedEntity.attributes.content ?
                <FormattedContent key={loadedEntity.attributes.content.name}
                                  content={loadedEntity.attributes.content}/>
                : null}
            </Paper>
          </Grid>
          <Grid item xs={3} className={classes.rightContentColumn}>
            {/*<Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Related Articles</Typography>*/}
            {/*<InfiniteList listItems={relatedResults}*/}
            {/*getResultItems={() => getRelatedResults(loadedEntity.title)}*/}
            {/*list={<MainContentList listItems={relatedResults}/>}*/}
            {/*/>*/}
          </Grid>
        </Grid>
      );
    }
  }
}

export default withStyles(Styles)(Profile);
