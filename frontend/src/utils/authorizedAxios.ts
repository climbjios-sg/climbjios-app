import axios from 'axios';
// config
import { HOST_API } from '../config';
import { refreshAccessToken } from '../services/token';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './jwt';

// ----------------------------------------------------------------------

const authorizedAxios = axios.create({
  baseURL: HOST_API,
});

// Request interceptor for API calls
authorizedAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
authorizedAxios.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    // If token expires, replay request
    // TODO: to be deprecated

    if (error.response.status === 401 && !originalRequest._retry) {
      // TODO: use authprovider.login()

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const { data } = await refreshAccessToken(refreshToken);
      localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);

      // TODO: why need this?
      authorizedAxios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
      return authorizedAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default authorizedAxios;
