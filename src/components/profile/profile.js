import React, {useEffect, useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/styles"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TrendingList from "../trending/trendingList";
import MainContentList from "../latest/mainContentList"
import Typography from '@mui/material/Typography';
import FormattedContent from "./formattedContent";
import {Link} from "react-router-dom";
import InfiniteList from "../infiniteList/infiniteList";
import Chip from "@mui/material/Chip/Chip";
import extractHostname from "../../functions/extractHostnames";
import {useParams} from "react-router-dom";
import {getResults} from "../../functions/api/getQueries";
import {Locale} from "../constants/locale";
import {translateValue} from "../../functions/translator/translate";
import {Facebook} from 'react-content-loader'

function Profile(props) {
  const {classes, locale} = props;
  const {title} = useParams();
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [translatedContent, setTranslatedContent] = useState({});
  const [translatedTitle, setTranslatedTitle] = useState({[Locale.en]: title});
  const [internalLinks, setInternalLinks] = useState([]);
  const [internalPage, setInternalPage] = useState(0);
  const [relatedLinks, setRelatedLinks] = useState([]);
  const [relatedPage, setRelatedPage] = useState(0);

  function appendStateObj(currentState, setStateFunction, key, value) {
    let currentStateObj = {...currentState};
    currentStateObj[key] = value;
    setStateFunction(currentStateObj);
  }

  function getEntity(entityTitle) {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/get/' + entityTitle, {
      method: 'GET'
    }).then(results => {
      if (results.status === 200) {
        return results.json();
      }
      return null
    }).then(data => {
      setLoadedEntity(data);
      setTranslatedTitle({[Locale.en]:data.title});
      setTranslatedContent({[Locale.en]:data.attributes.content.values});
    }).then(
      end => {
        getInternalLinks(true);
        getRelatedResults(true);
      }
    );
    return true
  }

  async function translateValues(values) {
    if (loadedEntity.attributes && values) {
      let contentArray = JSON.parse(JSON.stringify(values));
      for (let item of contentArray) {
        item.value_string = await translateValue(item.value_string, locale);
      }
      return contentArray;
    }
    return values;
  }

  async function translateText(text, lang) {
    if (lang !== Locale.en) {
      let translatorUrl = 'translate?lang=' + lang;
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/text'},
        body: text
      };
      const response = await fetch(translatorUrl, requestOptions);

      const translated_text = await response.json();
      appendStateObj(translatedTitle, setTranslatedTitle, lang, translated_text);
    }

  }

  function getInternalLinks(initialSearch) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/links/' + encodeURI(title) + "?";
    return getResults(searchUrl, initialSearch, internalLinks, internalPage, setInternalLinks, setInternalPage, 15);
  }

  function getRelatedResults(initialSearch) {
    let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/relations/' + encodeURI(title) + "?";
    return getResults(searchUrl, initialSearch, relatedLinks, relatedPage, setRelatedLinks, setRelatedPage, 15);
  }

  async function translateContent() {
    let values = [];
    if (loadedEntity.attributes && loadedEntity.attributes.content) {
      values = loadedEntity.attributes.content.values;
      const translated_values = await translateValues(values);
      appendStateObj(translatedContent, setTranslatedContent, locale, translated_values);
    }
  }

  useEffect(() => {
    if (!loadedEntity || loadedEntity.title !== title) {
      console.log("get profile entity:", title);
      getEntity(title);
    }
    if (loadedEntity) {
      if (!(locale in translatedTitle)) {
        translateText(title, locale);
        translateContent();
      }
    }

  });

  // const ignoreCategories = ["News", "PERSON", "ORGANIZATION", "LOCATION", "arbitrary-entities", "OrgChart-Level1"];
  const ignoreCategories = [];
  if (loadedEntity) {
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={3} className={classes.leftContentColumn}>
          <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Article Mentions</Typography>
          <InfiniteList listItems={internalLinks}
                        getResultItems={getInternalLinks}
                        searchParam={loadedEntity.title}
                        list={<TrendingList listItems={internalLinks} getResults={getInternalLinks}
                        />}
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
                  {translatedTitle[locale] ? translatedTitle[locale] : <Facebook/>}
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
            {loadedEntity.attributes && loadedEntity.attributes.content && translatedContent[locale] ?
              <FormattedContent key={loadedEntity.attributes.content.name}
                                content={translatedContent[locale]}/>
              : <Facebook/>}
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.rightContentColumn}>
          <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Related Articles</Typography>
          <InfiniteList listItems={relatedLinks}
                        getResultItems={() => getRelatedResults(loadedEntity.title)}
                        list={<MainContentList listItems={relatedLinks} vertical={true}/>}
          />
        </Grid>
      </Grid>
    );
  }
  return <div/>
}

export default withStyles(Styles)(Profile);
