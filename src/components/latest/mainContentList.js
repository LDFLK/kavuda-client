import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles"
import List from "@material-ui/core/List/List";
import MainContentItem from "./mainContentItem";
import Typography from '@material-ui/core/Typography';
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
                             links={entity.links}
                              categories={entity.categories}/>
          ))
          :
          <Typography component="p">
            No Results Found
          </Typography>
        }
      </List>
    )
  }
}

export default withStyles(Styles)(MainContentList);
