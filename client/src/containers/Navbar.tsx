import React from 'react';

import { Link } from 'react-router-dom';
import { Button, makeStyles, Grid } from '@material-ui/core';

import AuthLinks from '../components/auth-links/AuthLinks';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: '80px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'white',
    zIndex: 999,
    padding: '0 16px',
    [theme.breakpoints.down('md')]: {
      padding: '0 8px'
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
  const classes = useStyles();

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
      <Grid item className={classes.authLinks}>
        <AuthLinks />
      </Grid>
    </Grid>
  );
};

export default Navbar;
