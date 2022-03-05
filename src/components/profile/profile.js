import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/styles"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TrendingList from "../trending/trendingList";
import MainContentList from "../latest/mainContentList"
import Typography from '@mui/material/Typography';
import FormattedContent from "./formattedContent";
import {Link} from "react-router-dom";
import InfiniteList from "../infinite-list/infinite-list";
import Chip from "@mui/material/Chip/Chip";
import extractHostname from "../../functions/extractHostnames";

function Profile(props) {

  const ignoreCategories = ["News", "PERSON", "ORGANIZATION", "LOCATION", "arbitrary-entities", "OrgChart-Level1"];
  const {classes} = props;
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
          <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Article Mentions</Typography>
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
              {/*<Grid item xs={3}>*/}
              {/*<img alt={loadedEntity.title}*/}
              {/*src={loadedEntity.image_url === "" ? "avatar.png" : loadedEntity.image_url}*/}
              {/*className={classes.profileAvatar}/>*/}
              {/*</Grid>*/}
              <Grid item xs={9}>
                <Typography className={classes.mainContentItemTitle} variant='h4'>
                  {this.state.translatedTitle}
                </Typography>
                {loadedEntity.source ?
                  <Typography variant="body2">
                    <a className={classes.link} href={loadedEntity.source}>
                      {extractHostname(loadedEntity.source)}
                    </a>
                  </Typography> : null}
                {loadedEntity.attributes ?
                  <Typography variant="body2">
                    {loadedEntity.attributes.author && loadedEntity.attributes.author.values[0].value_string ?
                      loadedEntity.attributes.author.values[0].value_string
                      : null}
                    {loadedEntity.attributes.date && loadedEntity.attributes.date.values[0].value_string ?
                      new Date(loadedEntity.attributes.date.values[0].value_string).toDateString()
                      : null}
                  </Typography> : null}
                <div style={{paddingTop: '10px'}}>
                  {loadedEntity.categories ? loadedEntity.categories.map((category) => (
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
              </Grid>
            </Grid>
            <br/>
            <img src={loadedEntity.image_url} alt={loadedEntity.title} width="100%"/>
            {loadedEntity.attributes && loadedEntity.attributes.content ?
              <FormattedContent key={this.props.loadedEntity.attributes.content.name}
                                content={this.state.content}/>
              : null}
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.rightContentColumn}>
          <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Related Articles</Typography>
          <InfiniteList listItems={relatedResults}
                        getResultItems={() => getRelatedResults(loadedEntity.title)}
                        list={<MainContentList listItems={relatedResults} vertical={true}/>}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Profile);
