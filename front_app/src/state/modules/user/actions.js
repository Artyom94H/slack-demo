import * as types from './types';
import {
  signIn as signInApi,
  getAuthUser as getAuthUserApi,
  signUp as signUpApi,
  logout as logoutApi,
} from 'api';
import { push } from 'connected-react-router';
import routesCode from 'routes/routesCode';
import { getSubdomain } from 'utils';

export const signIn = params => dispatch => {
  dispatch({ type: types.SIGN_IN_REQUEST });
  return signInApi({
    ...params,
    subDomain: getSubdomain(),
  })
    .then(async ({ data }) => {
      await localStorage.setItem('auth_token', data.token);
      dispatch({ type: types.SIGN_IN_REQUEST_SUCCESS, payload: data });
      dispatch(push(routesCode.home));
    })
    .catch(err => dispatch({ type: types.SIGN_IN_REQUEST_FAILURE, payload: err.response.data }));
};

export const signUp = params => dispatch => {
  dispatch({ type: types.SIGN_UP_REQUEST });
  return signUpApi(params)
    .then(async ({ data }) => {
      await localStorage.setItem('auth_token', data.token);
      dispatch({
        type: types.SIGN_UP_REQUEST_SUCCESS,
        payload: data,
      });
      dispatch(push(routesCode.home));
    })
    .catch(err => dispatch({
      type: types.SIGN_UP_REQUEST_FAILURE,
      payload: err.response.data,
    }));
}

export const getAuthUser = token => dispatch => {
  return getAuthUserApi(token).then(async ({ data }) => {
    await localStorage.setItem('auth_token', data.token);
    dispatch({
      type: types.GET_AUTH_USER_REQUEST_SUCCESS,
      payload: data,
    });
  })
    .catch(() => {
      dispatch({
        type: types.GET_AUTH_USER_REQUEST_FAILURE,
      });
      dispatch(push(routesCode.signIn))
    });
};

export const logout = () => dispatch => {
  return logoutApi().then(() => {
    // localStorage.clear();
    dispatch({
      type: types,
    });
    dispatch(push(routesCode.signIn))
  })
    .catch((e) => {
      console.error('Logout error', e.response.data);
    });
};

export const resetAuthErrors = () => dispatch => dispatch({
  type: types.RESET_AUTH_ERRORS,
})
