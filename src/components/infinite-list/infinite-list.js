import React, {Component} from "react";
import {withStyles, Button, Typography} from "@material-ui/core";
import Styles from "../../styles/styles"
import BeatLoader from "react-spinners/BeatLoader";

class InfiniteList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.loadResults = this.loadResults.bind(this);
  }

  async loadResults() {
    this.setState({isLoading: true});
    await this.props.getResults();
    this.setState({isLoading: false});
  }

  render() {
    const {listItems, list} = this.props;
    const {isLoading} = this.state;

    return (
      <div>
        {list}
        {Array.isArray(listItems) ?
          <Typography component="p" style={{textAlign: 'center'}}>
            {isLoading ?
              <BeatLoader
                sizeUnit={"px"}
                size={14}
                color={'#36D7B7'}
                loading={this.props.loading}
              /> : null}
            {!isLoading ?
              <Button onClick={() => setTimeout(this.loadResults(), 3000)} variant="contained">View More</Button>
              : null}
          </Typography>
          : null}
      </div>
    )
  }
}

export default withStyles(Styles)(InfiniteList);
