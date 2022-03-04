import React, {Component} from "react";
import {withStyles, Button} from "@mui/material";
import Styles from "../../styles/styles"
import BeatLoader from "react-spinners/BeatLoader";
import Tooltip from "@mui/material/Tooltip/Tooltip";

class InfiniteList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      listEnded: false
    };

    this.loadResults = this.loadResults.bind(this);
  }

  componentDidMount() {
    if (this.props.results && this.props.results.length === 0) {
      this.props.getResultItems(this.props.searchParam);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.searchParam !== this.props.searchParam) {
      this.props.getResultItems(this.props.searchParam, true);
      this.setState({listEnded: false})
    }
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
              <Tooltip title={'view more'} aria-label="add">
              <Button style={{width: "100%"}} onClick={() => this.loadResults()}><img alt={"view more"} width={"15px"}
                                                                                      src={"down.png"}/></Button>
              </Tooltip>
              : <Button style={{width: "100%"}}> </Button>
            }
          </div>
          : null}
      </div>
    )
  }
}

export default withStyles(Styles)(InfiniteList);
