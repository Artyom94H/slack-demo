import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PrivateLayout from 'layouts/Private';
import { getAuthUser } from 'state/modules/user/actions';
import queryString  from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';

const AuthRoute = ({ component: Component, ...rest }) => {

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user);
  useEffect(() => {
    const token = queryString.parse(window.location.search).token;
    dispatch(getAuthUser(token));
  }, [dispatch]);

  return (isLoggedIn && !!user) ? (
    <PrivateLayout isAuth={ isLoggedIn }>
      <Route
        { ...rest }
        render={ matchProps => (
          <Component { ...matchProps } />
        ) }
      />
    </PrivateLayout>
  ) : (
    <CircularProgress />
  );
};

export default AuthRoute;
