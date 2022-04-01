import React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import {withStyles} from "@mui/styles";
import Styles from "../../styles/Styles"
import InputBase from "@mui/material/InputBase/InputBase";
import BeatLoader from 'react-spinners/BeatLoader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link, useLocation, useNavigate, useParams,Outlet} from "react-router-dom";
import {Locales} from "../constants/Locales";
import {AppRoutes} from "../../routes";

function Header(props) {
  const {searchParam} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);
  const {classes, isLoading, setIsLoading, setLocale, searchKey, setSearchKey} = props;

  function handleSubmit(event) {
    event.preventDefault();
    const routePath = AppRoutes.search;
    const url = routePath + encodeURI(searchKey);
    if (searchKey.length > 1 && url !== location.pathname) {
      setIsLoading(true);
      navigate(url);
    }
  }

  useEffect(() => {
    if (initialLoad && searchParam && searchKey === "") {
      setSearchKey(searchParam);
      setInitialLoad(false);
    }
  }, [initialLoad, searchParam, searchKey, setInitialLoad, setSearchKey]);

  return (
    <div>
      <AppBar className={classes.appBar} style={{backgroundColor: '#282c34'}} position="sticky">
        <Grid container width={1} style={{textAlign: 'left'}}>
          <Grid item xs={3}>
            <Typography component={Link} to={AppRoutes.home}
                        variant="h3"
                        color="inherit" noWrap>
              Kavuda.lk
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.headerColumn}>
            <div className={classes.search}>
              <form id="search-form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <InputBase
                  name="search"
                  placeholder="Search…"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </form>
            </div>
          </Grid>
          <Grid item xs={1} className={classes.loaderColumn}>
            <BeatLoader
              sizeUnit={"px"}
              size={14}
              color={'#36D7B7'}
              loading={isLoading}
            />
          </Grid>
          <Grid item xs={2} className={classes.headerColumn}>
            <Grid container width={1} justify="flex-end" style={{textAlign: 'right'}}>
              <Grid item>
                <Button onClick={() => setLocale(Locales.en)} size="small" variant="outlined"
                        style={{color: 'white'}}>English</Button>
                <Button onClick={() => setLocale(Locales.sinhala)} size="small" variant="outlined"
                        style={{color: 'white'}}>සිංහල</Button>
                <Button onClick={() => setLocale(Locales.tamil)} size="small" variant="outlined"
                        style={{color: 'white'}}>
                  தமிழ்</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <div>
        <Outlet/>
      </div>
    </div>

  )
}

export default withStyles(Styles)(Header);
