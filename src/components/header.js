import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {withStyles} from "@material-ui/core";
import Styles from "../styles/styles"
import InputBase from "@material-ui/core/InputBase/InputBase";
import BeatLoader from 'react-spinners/BeatLoader';
import {css} from '@emotion/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.searchKey.length > 1) {
      this.props.history.push(`/search/` + this.props.searchKey);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.searchKey !== this.props.match.params.searchKey) {
      this.props.getSearchResults(this.props.match.params.searchKey, true);
    }
  }

  render() {
    const {classes, searchKey} = this.props;
    return (
      <AppBar className={classes.appBar} position="sticky">
        <Grid container width={1} style={{textAlign: 'left'}}>
          <Grid item xs={3}>
            <Typography component={Link} to="/" style={{textDecoration: 'none'}}
                        variant="h4"
                        color="inherit" noWrap>
              Kavuda.lk
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.search}>
              <form id="search-form" onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <InputBase
                  name="search"
                  placeholder="Search…"
                  value={searchKey}
                  onChange={(e) => this.props.handleChange("searchKey", e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </form>
            </div>
          </Grid>
          <Grid item>
            <BeatLoader
              css={override}
              sizeUnit={"px"}
              size={14}
              color={'#36D7B7'}
              loading={this.props.loading}
            />
          </Grid>
        </Grid>
      </AppBar>
    )
  }
}

export default withStyles(Styles)(Header);
