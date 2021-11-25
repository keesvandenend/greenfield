import { CSSProperties } from 'react';

export type UserCreds = {
  email: string;
  password: string;
};

export type CurrentUser = {
  id: string;
  createdOn: Date;
  email: string;
  token?: string;
};

export type Address = {
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

export type AlertType = 'success' | 'info' | 'warning' | 'error' | undefined;

export type SnackBarAlert = {
  type: AlertType;
  msg: string;
};

export type HeaderStyle = CSSProperties;
export type RowStyle = CSSProperties;

export type Action = {
  type: string;
  payload: any;
};

export interface ISearchState {
  search: any;
  isLoading: boolean;
  err: any;
}

export interface IStore {
  search: ISearchState;
  ui: IUiState;
  auth: IAuth;
}

export interface IUiState {
  snackbar: SnackBarAlert;
}

export interface IAuth {
  currentUser: CurrentUser | null;
  err: any;
  isLoading: boolean;
}
