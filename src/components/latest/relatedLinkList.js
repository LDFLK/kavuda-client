import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import RelatedLinkItem from "./relatedLinkItem";

class RelatedLinkList extends Component {

  render() {
    return (
      <Grid container width={1} spacing={2}>
        <RelatedLinkItem/>
        <RelatedLinkItem/>
        <RelatedLinkItem/>
        <RelatedLinkItem/>
        <RelatedLinkItem/>
      </Grid>
    )
  }
}

export default RelatedLinkList;
