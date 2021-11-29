import { Dispatch } from 'react';

import * as types from './types';

import { Address, Location } from '../../../types';
import { setSnackBar } from '../ui/actions';

import * as geoAPI from '../../../api/geo';

//----- GET ADDRESS ----- //
export const getAddressSuccess = (data: any) => {
  return {
    type: types.GET_ADDRESS_SUCCESS,
    payload: data
  };
};

export const getAddress = (address: Address) => async (
  dispatch: Dispatch<any>
) => {
  try {
    // TODO check if google maps api allows return only first result
    const res = await geoAPI.getLocation(address);
    console.log('res', res.data?.results);
    dispatch(getAddressSuccess(res.data?.results));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

//----- GET TIMEZONE ----- //
export const getTimezoneSuccess = (data: any) => {
  return {
    type: types.GET_TIMEZONE_SUCCESS,
    payload: data
  };
};

export const getTimezone = (location: Location) => async (
  dispatch: Dispatch<any>
) => {
  try {
    // TODO check if google maps api allows return only first result
    const res = await geoAPI.getTimezone(location);
    console.log('res', res.data?.timeZoneName);
    dispatch(getTimezoneSuccess(res.data?.timeZoneName));
  } catch (err) {
    dispatch(catchRequestErr(err));
  }
};

const catchRequestErr = (err: any) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: types.REQUEST_FAILURE,
    payload: err.message
  });
  setSnackBar({ type: 'error', msg: err.message });
};
