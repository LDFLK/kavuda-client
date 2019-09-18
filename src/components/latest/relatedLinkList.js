import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import RelatedLinkItem from "./relatedLinkItem";
import Typography from "@material-ui/core/Typography/Typography";

class RelatedLinkList extends Component {

  render() {
    const {links} = this.props;
    return (
      <Grid container width={1} spacing={2}>
        {Array.isArray(links) ?
          links.map((title) => (
            <RelatedLinkItem key={title}
                             imageUrl="" title={title}/>
          ))
          :
          <Typography component="p">
            No Results Found
          </Typography>
        }
      </Grid>
    )
  }
}

export default RelatedLinkList;
