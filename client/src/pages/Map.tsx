import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core';

import MapWrapper from '../components/map-wrapper/MapWrapper';

import { IStore } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  mapWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.rem',
    fontWeight: 'bold',
    height: '100%',
    margin: '0 auto',
    paddingTop: '100px',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '0 128px',
    [theme.breakpoints.down('md')]: {
      padding: '128px 16px'
    }
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '3rem',
    lineHeight: '4.5rem'
  },
  description: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1rem',
    maxWidth: '380px',
    marginTop: '0'
  }
}));

const Map = () => {
  const classes = useStyles();
  const searchState = useSelector((state: IStore) => state.search);

  console.log('Map search', searchState);
  const d = new Date();
  const { hours, amOrPm } = {
    hours: d.getHours() > 12 ? d.getHours() - 12 : d.getHours(),
    amOrPm: d.getHours() > 12 ? 'pm' : 'am'
  }
  const timezone = searchState.timezone || 'google timezone api failed';

  return searchState.results && searchState.results[0] ? (
    <div className={classes.mapWrapper}>
      <h1 className={classes.title}>{searchState.results[0].formatted_address}</h1>
      <p className={classes.description}>{`${hours}:${d.getMinutes()} ${amOrPm} ${timezone}`}</p>
      <MapWrapper center={searchState.results[0].geometry.location} />
    </div>
  ) : <Redirect to="/search" />;
};

export default Map;
