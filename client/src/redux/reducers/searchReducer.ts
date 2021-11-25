import * as types from '../actions/search/types';

import { ISearchState, Action } from '../../types';

const initialState: ISearchState = {
  search: null,
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
    case types.REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case types.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        search: action.payload,
        isLoading: false,
        err: null
      };
    default:
      return state;
  }
};
