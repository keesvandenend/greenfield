import React, { useState, useEffect, Dispatch } from 'react';
import { TextField, makeStyles, Theme } from '@material-ui/core';
import AddButton from '../components/add-button/AddButton';

import { IStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../redux/actions/search/actions';

import * as geoAPI from '../api/geo';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    fontSize: '3rem'
  },
  description: {
    height: '80px',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    fontSize: '1rem'
  },
  form: {
    width: '100%',
    height: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  formWrapper: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    fontSize: '1.rem',
    fontWeight: 'bold',
    height: '100%',
    paddingTop: '100px',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  searchFormWrapper: {
    width: '100%',
    maxWidth: '800px',
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
  userLabel: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '2rem'
  }
}));

const Search = () => {
  const [newAddress, setNewAddress] = useState<string>('');

  const dispatch = useDispatch();

  const classes = useStyles();

  const searchState = useSelector((state: IStore) => state.search);
  const authState = useSelector((state: IStore) => state.auth);

  const onGetAddressHandler = (e: React.FormEvent) => {
    console.log('get address', newAddress);
    e.preventDefault();
    if (newAddress.trim()) {
      dispatch(getAddress(newAddress));
      setNewAddress('');
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setNewAddress(content);
  };

  const getAddress = (address: any) => async (dispatch: Dispatch<any>) => {
    console.log('getAddress function', address);
    try {
      console.log('calling api with address', address);
      const res = await geoAPI.getLocation(address);
      console.log('res', res);
      //dispatch(getAddressSuccess(res));
    } catch (err) {
      console.log('err', err);
      //dispatch(catchRequestErr(err));
    }
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div style={{height: '64px'}}></div>
        <div className={classes.searchWrapper}>
          <div className={classes.searchFormWrapper}>
            <div className={classes.userLabel}>
              {authState.currentUser?.email &&
                `Hi, ${authState.currentUser?.email}`}
            </div>
            <div className={classes.title}>Where in the world ? search anywhere</div>
            <div className={classes.description}>Searching just got easier, lets take you where you want to go</div>
            <div className={classes.formWrapper}>
              <form className={classes.form} onSubmit={onGetAddressHandler}>
                <TextField
                  variant="outlined"
                  style={{ marginBottom: '1rem' }}
                  value={newAddress}
                  onChange={onChangeHandler}
                  label="Address"
                />
                <AddButton />
              </form>
            </div>
          </div>
          <div>
            <img width="400px" height="400px" src={'person-large.png'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
