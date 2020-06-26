import * as types from './types';

export const showNotification = params => dispatch => {
  return dispatch({
    type: types.SHOW_NOTIFICATION,
    payload: params,
  });
};


export const closeNotification = () => dispatch => dispatch({
  type: types.CLOSE_NOTIFICATION,
});
