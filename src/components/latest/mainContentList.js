import React, {Component} from "react";
import {withStyles, Typography} from "@material-ui/core";
import Styles from "../../styles/styles"
import List from "@material-ui/core/List/List";
import MainContentItem from "./mainContentItem";
import Moment from 'moment';

class MainContentList extends Component {

  render() {
    const {classes, listItems} = this.props;

    return (
      <List className={classes.listContainer}>
        {Array.isArray(listItems) ?
          listItems.map((entity) => (
            <MainContentItem key={entity.title}
                             imageUrl={entity.image_url} title={entity.title}
                             subtitle={Moment(entity.updated_at).format('DD  MMM YYYY h:mm A')}
                             description={entity.snippet}
                             links={entity.links.slice(0, 20)}
                             categories={entity.categories}/>
          ))
          :
          <Typography component="p" style={{textAlign: 'center'}}>
            No Results Found
          </Typography>
        }
      </List>
    )
  }
}

export default withStyles(Styles)(MainContentList);
