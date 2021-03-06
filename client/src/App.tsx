import React, { useEffect } from 'react';
import Navbar from './containers/Navbar';

import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import SnackBar from './components/snackbar/SnackBar';
import Loading from './components/loading/Loading';
import Home from './pages/Home';
import Login from './pages/Login';
import Map from './pages/Map';
import Register from './pages/Register';
import Search from './pages/Search';

import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './redux/actions/auth/actions';
import { IStore } from './types';

import PrivateRoute from './components/private-route';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  const { currentUser, isLoading } = useSelector((state: IStore) => state.auth);
  //const { currentUser, isLoading } = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    dispatch(getProfile(history));
  }, []);

  return (
    <>
      <div className="App">
        <Navbar />
        {!isLoading ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/search" component={Search} />
            <Route path="/map" component={Map} />
            {// --><PrivateRoute
              //isLoggedIn={!!currentUser}
              //path="/search"
              //component={Search}
            ///>
            }
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        ) : <Loading />}
      </div>
      <SnackBar
        position={{ vertical: 'bottom', horizontal: 'left' }}
        duration={3000}
      />
    </>
  );
}

export default App;
