import { Dispatch } from 'react';

import * as types from './types';

import { Address } from '../../../types';
import { setSnackBar } from '../ui/actions';

import * as geoAPI from '../../../api/geo';

//----- GET ADDRESS ----- //
export const getAddressSuccess = (data: any) => {
  return {
    type: types.GET_ADDRESS_SUCCESS,
    payload: data
  };
};

export const getAddress = (address: any) => async (dispatch: Dispatch<any>) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const res = await geoAPI.getLocation(address);
    console.log('res', res);
    dispatch(getAddressSuccess(res));
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
