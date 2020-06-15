import React, {Component} from "react";
import {withStyles, Button, Typography} from "@material-ui/core";
import Styles from "../../styles/styles"
import BeatLoader from "react-spinners/BeatLoader";

class InfiniteList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      listEnded: false
    };

    this.loadResults = this.loadResults.bind(this);
  }

  async loadResults() {
    this.setState({isLoading: true});
    const results = await this.props.getResultItems();
    if (!results) {
      this.setState({
        isLoading: false,
        listEnded: true,

      });
    } else {
      this.setState({isLoading: false});
    }
  }

  render() {
    const {listItems, list} = this.props;
    const {isLoading, listEnded} = this.state;

    return (
      <div>
        {list}
        {Array.isArray(listItems) ?
          <div style={{textAlign: 'center'}}>
            {isLoading ?
              <BeatLoader
                sizeUnit={"px"}
                size={14}
                color={'#36D7B7'}
                loading={this.props.loading}
              /> : null}
            {!(isLoading || listEnded) ?
              <Button style={{width:"100%"}} onClick={() => this.loadResults()}><img width={"15px"} src={"down-arrow.svg"}/></Button>
              :<Button style={{width:"100%"}}> </Button>
            }
          </div>
          : null}
      </div>
    )
  }
}

export default withStyles(Styles)(InfiniteList);
