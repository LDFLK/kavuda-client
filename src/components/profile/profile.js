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

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState({collapsed: !this.state.collapsed});
  }

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
    const {collapsed} = this.state;

    if (loadedEntity == null) {
      return (
        <Grid className={classes.container} container width={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="p">
                Document not found
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid className={classes.container} container width={1}>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Related Links
              <Box height="90vh" overflow="auto">
                <TrendingList results={internalLinks} getResults={getInternalLinks}
                              searchParam={loadedEntity.title}/>
              </Box>
            </Paper>
          </Grid>
          < Grid item xs={9}>
            <Paper className={classes.paper}>
              <Grid container width={1}>
                <Grid item>
                  <Avatar alt={loadedEntity.title}
                          src={loadedEntity.image_url === "" ? "avatar.png" : loadedEntity.image_url}
                          className={classes.bigAvatar}/>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body2">{loadedEntity.categories ? loadedEntity.categories.map((category) => (
                    <Link key={category} className={classes.link} to={"/search/" + category + ":"}>
                      {category}
                    </Link>
                  )) : null}</Typography>
                  <Typography variant="h4">
                    {loadedEntity.title}
                    {collapsed ?
                      <Typography variant="subtitle1" style={{textAlign: 'right',float:'right'}}>
                        <Link onClick={this.toggleCollapse} key={"collapse-button-bottom"} className={classes.link}
                              to={"#"}>
                          {collapsed ? "Hide Content" : "Collapse All"}
                        </Link>
                      </Typography>
                      : null}
                  </Typography>
                  {loadedEntity.source ?
                    <Typography variant="body2" gutterBottom>
                      Original Source: <a className={classes.link} href={loadedEntity.source}>
                      {loadedEntity.source}
                    </a>
                    </Typography> : null}
                  <Box className={!collapsed ? classes.collapsible : null}>
                    <table className={"entity-attributes"}>
                      <tbody>
                      {loadedEntity.attributes ? loadedEntity.attributes.map((attribute) => (
                        <FormattedContent key={attribute.name} content={attribute}/>
                      )) : null}
                      </tbody>
                    </table>
                  </Box>
                  <Typography variant="subtitle1" style={{textAlign: 'right'}}>
                    <Link onClick={this.toggleCollapse} key={"collapse-button-bottom"} className={classes.link}
                          to={"#"}>
                      {collapsed ? "Hide Content" : "Collapse All"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="inset" component="div"/>
              </Grid>
              <Grid item xs={11}>
                <br/>
                Related Articles
                <Box>
                  <MainContentList listItems={relatedResults}/>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  }
}

export default withStyles(Styles)(Profile);
