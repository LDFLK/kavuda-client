import React, {Component} from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/styles";
import Styles from "../styles/styles"
import InputBase from "@mui/material/InputBase/InputBase";
import BeatLoader from 'react-spinners/BeatLoader';
import {css} from '@emotion/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function RedirectUser(url){
  const navigate = useNavigate();
  return navigate(url);
}

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.searchKey.length > 1) {
      return RedirectUser(`/search/` + this.props.searchKey);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.match.params.searchKey !== this.props.match.params.searchKey) {
    //   this.props.getSearchResults(this.props.match.params.searchKey, true);
    // }
    console.log(this.props.searchKey);
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
          <Grid item xs={1}>
            <BeatLoader
              css={override}
              sizeUnit={"px"}
              size={14}
              color={'#36D7B7'}
              loading={this.props.loading}
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container width={1} justify="flex-end" style={{textAlign: 'right'}}>
              <Grid item>
                <Button onClick={() => this.props.handleChange('language', 'en')} size="small" variant="outlined"
                        style={{color: 'white'}}>English</Button>
                <Button onClick={() => this.props.handleChange('language', 'sinhala')} size="small" variant="outlined"
                        style={{color: 'white'}}>සිංහල</Button>
                <Button onClick={() => this.props.handleChange('language', 'tamil')} size="small" variant="outlined"
                        style={{color: 'white'}}>
                  தமிழ்</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    )
  }
}

export default withStyles(Styles)(Header);
