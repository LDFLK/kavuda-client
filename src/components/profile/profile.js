import React, {Component} from "react";
import {withStyles} from "@mui/material";
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
import ReactDOMServer from 'react-dom/server';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      translatedTitle: "",
      language: "en",
      content: [],
    };
    this.translateText = this.translateText.bind(this);
    this.translateValue = this.translateValue.bind(this);
    this.translateValues = this.translateValues.bind(this);
  }

  async translateValue(value) {
    const lang = this.props.language;
    let translatorUrl = 'translate?lang=' + lang;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/text'},
      body: value
    };
    const response = await fetch(translatorUrl, requestOptions);

    return await response.json();
  }

  async translateValues(values) {
    if (this.props.loadedEntity.attributes && values) {
      let contentArray = JSON.parse(JSON.stringify(values));
      for (let item of contentArray) {
        item.value_string = await this.translateValue(item.value_string);
      }
      return contentArray;
    }
    return values;
  }

  async translateText(text) {
    const lang = this.props.language;
    let values = [];
    if (this.props.loadedEntity.attributes && this.props.loadedEntity.attributes.content) {
      values = this.props.loadedEntity.attributes.content.values;
    }

    if (lang === 'en') {
      this.setState({title: text, translatedTitle: text, language: 'en', content: values})
    }
    else {
      let translatorUrl = 'translate?lang=' + lang;
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/text'},
        body: text
      };
      const response = await fetch(translatorUrl, requestOptions);

      const translated_text = await response.json();

      const translated_values = await this.translateValues(values);

      this.setState({translatedTitle: translated_text, title: text, language: lang, content: translated_values})
    }

  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title);
    this.props.getRelatedResults(this.props.match.params.title, true);
    this.setState({translatedTitle: "", title: "", content: []})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title);
      this.props.getRelatedResults(this.props.match.params.title, true);
    }
    if (this.state.title !== this.props.loadedEntity.title || this.props.language !== this.state.language) {
      this.translateText(this.props.loadedEntity.title);
    }
    if (this.props.loadedEntity.attributes && this.props.loadedEntity.attributes.content) {
      console.log(this.props.loadedEntity.attributes.content.values);
    }
  }

  render() {
    const ignoreCategories = ["News", "PERSON", "ORGANIZATION", "LOCATION", "arbitrary-entities", "OrgChart-Level1"];
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
              <img src={loadedEntity.image_url} width="100%"/>
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
}

export default withStyles(Styles)(Profile);
