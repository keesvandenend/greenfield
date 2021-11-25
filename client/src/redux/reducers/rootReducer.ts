import { combineReducers } from 'redux';
import { searchReducer } from './searchReducer';
import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  search: searchReducer,
  ui: uiReducer,
  auth: authReducer
});
