import React, {useEffect, useState} from "react";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TrendingList from "../trending-list/TrendingList";
import {FormattedContentViewer, InfiniteList} from "@lsflk/gig-client-shared/components"
import Typography from '@mui/material/Typography';
import {Link, useParams} from "react-router-dom";
import Chip from "@mui/material/Chip/Chip";
import extractHostname from "../../functions/ExtractHostnames";
import {getEntity, getResults} from "@lsflk/gig-client-shared/functions";
import {Locales} from "../constants/Locales";
import {translateEntityContent, translateText} from "../../functions/translator/Translate";
import {Facebook} from 'react-content-loader'
import {appendStateObj} from "../../functions/AppendStateObj";
import {AppRoutes} from "../../routes";
import {ApiRoutes} from "@lsflk/gig-client-shared/routes";

function Profile(props) {
  const {classes, locale} = props;
  const {title} = useParams();
  const [loadedEntity, setLoadedEntity] = useState(null);
  const [translatedContent, setTranslatedContent] = useState({});
  const [translatedTitle, setTranslatedTitle] = useState({[Locales.en]: title});
  const [internalLinks, setInternalLinks] = useState([]);
  const [internalPage, setInternalPage] = useState(0);
  const [relatedLinks, setRelatedLinks] = useState([]);
  const [relatedPage, setRelatedPage] = useState(0);


  function getInternalLinks(page = 1) {
    getResults(title, ApiRoutes.links, page).then((data) => {
      if (data === null && page === 1) {
        setInternalLinks([]);
        setInternalPage(1)
      }
      else if (page === 1 || !internalLinks) {
        setInternalLinks(data);
        setInternalPage(2)
      } else {
        setInternalLinks([...internalLinks, ...data]);
        setInternalPage(internalPage + 1);
      }
    });
  }

  function getRelatedResults(page = 1) {
    getResults(title, ApiRoutes.relations, page).then((data) => {
      if (data === null && page === 1) {
        setRelatedLinks([]);
        setRelatedPage(1)
      }
      else if (page === 1 || !relatedLinks) {
        setRelatedLinks(data);
        setRelatedPage(2)
      } else {
        setRelatedLinks([...relatedLinks, ...data]);
        setRelatedPage(relatedPage + 1);
      }
    });
  }

  function updateTranslatedStates(text, lang) {
    translateText(text, lang).then((translatedText) =>
      appendStateObj(translatedTitle, setTranslatedTitle, lang, translatedText)
    )
  }

  function updateTranslatedContent(entity, lang) {
    translateEntityContent(entity, lang).then((translated_values) =>
      appendStateObj(translatedContent, setTranslatedContent, locale, translated_values)
    )
  }

  useEffect(() => {
    if (title !== loadedEntity?.title) {
      console.log("get profile entity:", title);
      getEntity(title).then((result) => {
        setLoadedEntity(result);
        setTranslatedTitle({[Locales.en]: result.title});
        setTranslatedContent({[Locales.en]: result.attributes.content ? result.attributes.content.values : []});
        getInternalLinks();
        getRelatedResults();
      });
    }
  }, [title]);

  useEffect(() => {
    if (!(locale in translatedTitle) && loadedEntity) {
      updateTranslatedStates(loadedEntity.title, locale);
      updateTranslatedContent(loadedEntity, locale);
    }
  }, [locale, loadedEntity]);

  // ignore showing category chips for the following in kavuda
  const ignoreCategories = ["News", "PERSON", "ORGANIZATION", "LOCATION", "arbitrary-entities", "OrgChart-Level1"];
  if (loadedEntity) {
    return (
      <Grid className={classes.container} container width={1}>
        <Grid item xs={3} className={classes.leftContentColumn}>
          <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Article Mentions</Typography>
          <InfiniteList
            searchKey={loadedEntity.title}
            getResults={(page = 1) => getResults(loadedEntity.title, ApiRoutes.links, page)}
            list={(results) => <TrendingList
              elevation={3}
              listItems={results}
              entityRoute={AppRoutes.entity}
              searchRoute={AppRoutes.search}/>}
          />
        </Grid>
        < Grid item xs={6} className={classes.mainContentColumn}>
          <Paper className={classes.profilePaper}>
            <Grid container width={1}>
              <Grid item xs={9}>
                <Typography className={classes.mainContentItemTitle} variant='h4'>
                  {translatedTitle[locale] ? translatedTitle[locale] : <Facebook/>}
                </Typography>
                {loadedEntity?.source &&
                <Typography variant="body2">
                  <a className={classes.link} href={loadedEntity.source}>
                    {extractHostname(loadedEntity.source)}
                  </a>
                </Typography>}
                {loadedEntity?.attributes &&
                <Typography variant="body2">
                  {loadedEntity?.attributes?.author?.values[0]?.value_string} -
                  {new Date(loadedEntity?.attributes?.date?.values[0]?.value_string).toDateString()}
                </Typography>}
                <div style={{paddingTop: '10px'}}>
                  {loadedEntity?.categories?.map((category) => (
                    ignoreCategories?.includes(category) ? null :
                      <Link key={category} className={classes.link} to={AppRoutes.search + category + ":"}>
                        <Chip style={{cursor: 'pointer'}}
                              size="small"
                              label={category}
                              variant="outlined"
                        />
                      </Link>
                  ))}
                </div>
              </Grid>
            </Grid>
            <br/>
            <img src={loadedEntity.image_url} alt={loadedEntity.title} width="100%"/>
            {loadedEntity?.attributes?.content && translatedContent[locale] ?
              <FormattedContentViewer key={loadedEntity?.attributes?.content?.name}
                                      content={translatedContent[locale]}/>
              : <Facebook/>}
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.rightContentColumn}>
          <Typography variant="h4" color="inherit" className={classes.headerText} noWrap>Related Articles</Typography>
          <InfiniteList
            searchKey={loadedEntity.title}
            getResults={(page = 1) => getResults(loadedEntity.title, ApiRoutes.relations, page)}
            list={(results) => <TrendingList
              elevation={3}
              listItems={results}
              entityRoute={AppRoutes.entity}
              searchRoute={AppRoutes.search}/>}
          />

        </Grid>
      </Grid>
    );
  }
  return <div/>
}

export default withStyles(Styles)(Profile);
