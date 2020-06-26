import { createReducer } from 'state/util';
import * as types from './types';

const initialState = {
  isLoggedIn: false,
  user: null,
  signInErrors: null,
  signUpErrors: null,
  signUpInProcess: false,
  signInInProcess: false,
};

const reducersMap = {
  [types.GET_AUTH_USER_REQUEST]: state => {
    return {
      ...state,
    }
  },
  [types.SIGN_IN_REQUEST]: state => {
    return {
      ...state,
      signInInProcess: true,
    }
  },
  [types.SIGN_UP_REQUEST]: state => {
    return {
      ...state,
      signUpInProcess: true,
    }
  },
  [types.GET_AUTH_USER_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload,
      signInErrors: null,
    }
  },
  [types.GET_AUTH_USER_REQUEST_FAILURE]: state => {
    return {
      ...state,
      isLoggedIn: false,
      user: null,
    }
  },
  [types.SIGN_IN_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload,
      signInErrors: null,
      signInInProcess: false,
    }
  },
  [types.SIGN_IN_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoggedIn: false,
      signInErrors: action.payload,
      signInInProcess: false,
    }
  },
  [types.SIGN_UP_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload,
      signUpErrors: null,
      signUpInProcess: false,
    }
  },
  [types.SIGN_UP_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoggedIn: false,
      user: null,
      signUpErrors: action.payload,
      signUpInProcess: false,
    }
  },
  [types.LOGOUT_REQUEST_SUCCESS]: state => {
    return {
      ...state,
      ...initialState,
    }
  },
  [types.RESET_AUTH_ERRORS]: state => {
    return {
      ...state,
      signInErrors: null,
      signUpErrors: null,
    };
  },
};

export default createReducer(initialState)(reducersMap);
