import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../types';
import { userLoggedOut } from '../../redux/actions/auth/actions';

const AuthLinks = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IStore) => state.auth);

  const logoutHandler = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      {authState.currentUser ? (
        <>
          <Link to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </>
      ) : (
        <>
          {!authState.isLoading ? (
            <>
              <Link to="/login">Login</Link>
              <span style={{ padding: '0 0.5rem' }}></span>
              <Link style={{ padding: '12px', borderRadius: '40px', background: 'black', color: 'white' }} to="/register">
                Get started
              </Link>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default AuthLinks;
