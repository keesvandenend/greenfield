import React, { useState, useEffect, Dispatch } from 'react';
import { TextField, makeStyles, Theme } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';

import SearchButton from '../components/search-button/SearchButton';

import { Address, IStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../redux/actions/search/actions';

import * as geoAPI from '../api/geo';

const useStyles = makeStyles((theme: Theme) => ({
  searchWrapper: {
    display: 'flex',
    justifyContent: 'left',
    fontSize: '1.rem',
    fontWeight: 'bold',
    height: '100%',
    paddingTop: '100px',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: '0 128px',
    [theme.breakpoints.down('md')]: {
      padding: '128px 16px'
    }
  },
  searchFormWrapper: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    padding: '16px',

    [theme.breakpoints.down('md')]: {
      width: ' 90%',
      padding: '0 6px 6px 6px'
    }
  },
  title: {
    display: 'flex',
    justifyContent: 'left',
    fontSize: '3rem',
    lineHeight: '4.5rem'
  },
  description: {
    display: 'flex',
    justifyContent: 'left',
    fontSize: '1rem',
    maxWidth: '380px',
    marginTop: '0'
  },
  formWrapper: {
    marginBottom: '60px',
  },
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '6px',
    marginBottom: '1rem'
  },
  formItem: {
    width: '100%'
  },
  formItem50: {
    width: '50%'
  },
  formItem60: {
    width: '60%'
  },
  formItem40: {
    width: '40%'
  },
  desktopImage: {
    position: 'relative',
    right: '-64px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  userLabel: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '2rem'
  }
}));

const emptyAddress = {
  streetAddress: '',
  city: '',
  province: '',
  country: '',
  postalCode: ''
}

const Search = () => {
  const [newAddress, setNewAddress] = useState<Address>(emptyAddress);

  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  const searchState = useSelector((state: IStore) => state.search);
  const authState = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    if (searchState && searchState.results && searchState.results[0].geometry.location) {
      dispatch(searchActions.getTimezone(searchState.results[0].geometry.location));
    }
  }, [searchState]);

  const onGetAddressHandler = (e: React.FormEvent) => {
    console.log('get address', newAddress);
    e.preventDefault();
    //if (newAddress.trim()) {
    if (newAddress) {
      dispatch(searchActions.getAddress(newAddress));
      //setNewAddress(emptyAddress);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onChangeHandler id, value: ', e.target.id, e.target.value);
    const content = e.target.value;

    setNewAddress({
      ...newAddress,
      [e.target.id]: content
    });
  }

  console.log('newAddress', newAddress);
  console.log('searchState', searchState);

  return searchState && searchState.results && searchState.results[0] ? <Redirect to="/map" /> : (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div className={classes.searchWrapper}>
          <div className={classes.searchFormWrapper}>
            {//<div className={classes.userLabel}>
            //  {authState.currentUser?.email &&
            //    `Hi, ${authState.currentUser?.email}`}
            //</div>
            }
            <div style={{height: '64px'}}></div>
            <h1 className={classes.title}>Where in the world ? search anywhere</h1>
            <p className={classes.description}>Searching just got easier, lets take you where you want to go</p>
            <div className={classes.formWrapper}>
              <form className={classes.form} onSubmit={onGetAddressHandler}>
                <div className={classes.formRow}>
                  <TextField
                    id="streetAddress"
                    variant="outlined"
                    className={classes.formItem}
                    value={newAddress.streetAddress}
                    onChange={onChangeHandler}
                    label="Address"
                  />
                </div>
                <div className={classes.formRow}>
                  <TextField
                    id="city"
                    variant="outlined"
                    className={classes.formItem50}
                    value={newAddress.city}
                    onChange={onChangeHandler}
                    label="City"
                  />
                  <TextField
                    id="province"
                    variant="outlined"
                    className={classes.formItem50}
                    value={newAddress.province}
                    onChange={onChangeHandler}
                    label="Province"
                  />
                </div>
                <div className={classes.formRow}>
                  <TextField
                    id="country"
                    variant="outlined"
                    className={classes.formItem60}
                    value={newAddress.country}
                    onChange={onChangeHandler}
                    label="Country"
                  />
                  <TextField
                    id="postalCode"
                    variant="outlined"
                    className={classes.formItem40}
                    value={newAddress.postalCode}
                    onChange={onChangeHandler}
                    label="Postal Code"
                  />
                </div>
                <SearchButton style={{width: '30%', marginLeft: 'auto'}}/>
              </form>
            </div>
          </div>
          <div>
            <img width="500px" height="600px" src={'person-large.png'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
