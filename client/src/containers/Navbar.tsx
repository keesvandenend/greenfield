import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Button, makeStyles, Grid } from '@material-ui/core';

import { Address, IStore } from '../types';
import AuthLinks from '../components/auth-links/AuthLinks';
import * as searchActions from '../redux/actions/search/actions';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: '80px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'white',
    zIndex: 999,
    padding: '0 128px',
    [theme.breakpoints.down('md')]: {
      padding: '0 16px'
    }
  },
  navLinks: {
    '& > a': {
      textDecoration: 'none',
      margin: '0 0.3rem'
    }
  },
  authLinks: {
    '& > a': {
      textDecoration: 'none',
      color: 'black',
      paddingRight: '1rem'
    }
  }
}));

const Navbar = () => {
const dispatch = useDispatch();

const classes = useStyles();

const searchState = useSelector((state: IStore) => state.search);

const handleExit = () => {
  dispatch(searchActions.getAddressSuccess(null));
}

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.navbar}
    >
      <Grid item className={classes.navLinks}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link to="/">
              <Button
                style={{
                  textDecoration: 'none',
                  border: 'none',
                  height: '48px',
                  width: '80px'
                }}
              >
                <img width="100%" height="100%" src={'logo-world.png'} />
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/search">
              <Button
                style={{
                  background: 'white',
                  border: '2px black solid',
                  color: '#0007bff',
                  textDecoration: 'none',
                  height: '48px',
                  width: '80px'
                }}
              >
                Search
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      {!searchState.results || !searchState.results[0] && <Grid item className={classes.authLinks}>
        <AuthLinks />
      </Grid>}
      {searchState.results && searchState.results[0] && <Grid item className={classes.authLinks}>
        <Grid item xs={6}>
            <Button
              onClick={handleExit}
              style={{
                background: 'black',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '40px',
                height: '48px',
                width: '80px'
              }}
            >
              Exit
            </Button>
        </Grid>
      </Grid>}
    </Grid>
  );
};

export default Navbar;
