import * as types from '../actions/search/types';

import { ISearchState, Action } from '../../types';

const initialState: ISearchState = {
  results: null,
  timezone: null,
  isLoading: true,
  err: null
};

export const searchReducer = (
  state = initialState,
  action: Action
): ISearchState => {
  switch (action.type) {
    case types.GET_ADDRESS:
      return {
        ...state
      };
    case types.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
        err: null
      };
    case types.GET_TIMEZONE:
      return {
        ...state
      };
    case types.GET_TIMEZONE_SUCCESS:
      return {
        ...state,
        timezone: action.payload,
        isLoading: false,
        err: null
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    default:
      return state;
  }
};
