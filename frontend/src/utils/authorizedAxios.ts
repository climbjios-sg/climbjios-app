import axios from 'axios';
// config
import { HOST_API } from '../config';
import { refreshAccessToken } from '../services/token';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './jwt';

// ----------------------------------------------------------------------

const authorizedAxios = axios.create({
  baseURL: HOST_API,
});

// Response interceptor for API calls
authorizedAxios.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    // If token expires, replay request
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const { data } = await refreshAccessToken(refreshToken);
      localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
      axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
      return authorizedAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default authorizedAxios;
