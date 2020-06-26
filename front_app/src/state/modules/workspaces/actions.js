import * as types from './types';
import { push } from 'connected-react-router';
import {
  getAvailabilityWorkspaces,
  updateWorkspace,
  createWorkspace,
} from 'api';
import routesCode from 'routes/routesCode';

export const getAvailability = params => dispatch => {
  return getAvailabilityWorkspaces(params)
    .then(({ data }) => {
      dispatch({
        type: types.GET_AVAILABILITY_WORKSPACES,
        payload: data,
      });
    })
    .catch(console.error);
};

export const resetErrors = () => dispatch => dispatch({ type: types.RESET_WORKSPACES_ERRORS });

export const create = params => dispatch => {
  return createWorkspace(params)
    .then(() => {
      dispatch(resetErrors());
      dispatch(push(routesCode.workspaces));
    })
    .catch(err => {
      dispatch({
        type: types.POST_OR_PUT_REQUEST_FAILURE,
        payload: err.response.data,
      });
    });
}

export const update = (id, params) => dispatch => {
  return updateWorkspace(id, params)
    .then(() => {
      dispatch(resetErrors())
    })
    .catch(err => {
      dispatch({
        type: types.POST_OR_PUT_REQUEST_FAILURE,
        payload: err.response.data,
      })
    })
}
