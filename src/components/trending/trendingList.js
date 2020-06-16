import {Component} from "react";
import React from "react";
import List from "@material-ui/core/List/List";
import {withStyles} from "@material-ui/core";
import Styles from "../../styles/styles";
import TrendingListItem from "./trendingListItem";
import Typography from "@material-ui/core/Typography/Typography";
import Moment from "moment";

class TrendingList extends Component {

  componentDidMount() {
    if (this.props.results && this.props.results.length === 0) {
      this.props.getResults(this.props.searchParam);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.searchParam !== this.props.searchParam) {
      this.props.getResults(this.props.searchParam, true);
    }
  }


  render() {
    const {classes, listItems} = this.props;
    return (
      <List className={classes.trendingListContainer}>
        {Array.isArray(listItems) ?
          listItems.map((item) => (
            <TrendingListItem key={item.title}
                              imageUrl={item.image_url} title={item.title}
                              subtitle={Moment(item.updated_at).format('DD  MMM YYYY h:mm A')}
                              categories={item.categories}
            />

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

export default withStyles(Styles)(TrendingList);
