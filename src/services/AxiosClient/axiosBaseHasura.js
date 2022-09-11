import axios from 'axios';

import AuthService from '../Auth/AuthService';

const baseHasura = axios.create({
  baseURL: 'http://216.48.178.57/hasura',
});

baseHasura.interceptors.request.use(
  (req) => {
    const token = AuthService.getToken();
    if (token) {
      AuthService.setToken(token)
      req.headers.common.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

baseHasura.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      AuthService.removeToken();
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export default baseHasura;

