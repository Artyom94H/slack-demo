import { createReducer } from 'state/util';
import * as types from './types';

const initialState = {
  availability: [],
  availabilityMsg: '',
  errors: null,
};

const reducersMap = {
  [types.GET_AVAILABILITY_WORKSPACES]: (state, action) => {
    return {
      ...state,
      availability: action.payload.variants || [],
      availabilityMsg: action.payload.msg,
    }
  },
  [types.RESET_WORKSPACES_ERRORS]: state => {
    return {
      ...state,
      errors: null,
    }
  },
  [types.POST_OR_PUT_REQUEST_SUCCESS]: state => {
    return {
      ...state,
      errors: null,
    }
  },
  [types.POST_OR_PUT_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      errors: action.payload,

    }
  },
};

export default createReducer(initialState)(reducersMap);
