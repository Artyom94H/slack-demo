import { createReducer } from 'state/util';
import * as types from './types';

const initialState = {
  showNotification: false,
  msg: '',
};

const reducersMap = {
  [types.SHOW_NOTIFICATION]: (state, action) => {
    return {
      ...state,
      showNotification: true,
      ...action.payload,
    };
  },
  [types.CLOSE_NOTIFICATION]: state => {
    return {
      ...state,
      showNotification: false,
    }
  }
};

export default createReducer(initialState)(reducersMap);
