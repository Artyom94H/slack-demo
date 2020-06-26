import axios from 'axios';
import { getSubdomain, getToken } from 'utils';

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${ getToken() }`,
  },
});

export const getAuthUser = (token = getToken()) => {
  const config = {
    params: {
      subDomain: getSubdomain()
    },
    headers: {
      Authorization: `Bearer ${ token }`
    }
  };

  return instance.get('/auth/me', config);
}

export const signIn = params => instance.post('/auth/sign-in', params);

export const signUp = params => instance.post('/auth/sign-up', params);

export const logout = () => instance.get('/auth/logout', {
  ...getHeaders(),
});

export const getAvailabilityWorkspaces = (params = {}) => instance.get('/workspaces/get-availability', {
  ...getHeaders(),
  params,
});

export const createWorkspace = params => instance.post('/workspaces', params, {
  ...getHeaders(),
});

export const updateWorkspace = (id, params) => instance.put(`/workspaces/${ id }`, params, {
  ...getHeaders(),
});

export const deleteWorkspace = id => instance.delete(`/workspaces/${ id }`, {
  ...getHeaders(),
});

export const getWorkspace = id => instance.get(`/workspaces/${ id }`, {
  ...getHeaders(),
});
