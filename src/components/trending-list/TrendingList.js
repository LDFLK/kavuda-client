import React, {Component} from "react";
import List from "@mui/material/List/List";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles";
import TrendingListItem from "./TrendingListItem";
import Typography from "@mui/material/Typography/Typography";
import Moment from "moment";
import {AppDateFormat, ZeroDateString} from "../constants/DateFormats";

class TrendingList extends Component {

  render() {
    const {classes, listItems} = this.props;
    return (
      <List className={classes.trendingListContainer}>
        {Array.isArray(listItems) ?
          listItems.map((item) => (
            <TrendingListItem key={item.title}
                              imageUrl={item.image_url} title={item.title}
                              subtitle={item.source_date !== ZeroDateString ?
                                Moment(item.source_date).format(AppDateFormat) :
                                Moment(item.updated_at).format(AppDateFormat)}
                              categories={item.categories}
            />

          ))
          :
          <Typography
            component="p"
            style={{paddingLeft: '20px'}}
            variant="body2"
            color="textSecondary">
            No Results Found
          </Typography>
        }
      </List>
    )
  }
}

export default withStyles(Styles)(TrendingList);
