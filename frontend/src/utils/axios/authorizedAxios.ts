import axios from 'axios';
import { refreshAccessToken } from 'src/services/token';
// config
import { HOST_API } from '../../config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../jwt';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const authorizedAxios = axios.create({
  baseURL: HOST_API,
});

// Request interceptor for API calls
authorizedAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    return config;
  },
  async (error) => {
    throw error;
  }
);

authorizedAxios.interceptors.response.use(
  (response) => response,
  (error) =>
    mutex.runExclusive(async () => {
      const originalRequest = error.config;

      // If token expires, replay request
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
          throw error;
        }

        try {
          const res = await refreshAccessToken(refreshToken);
          localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
          localStorage.setItem(REFRESH_TOKEN, res.data.refreshToken);
        } catch {
          throw error;
        }

        return authorizedAxios(originalRequest);
      }

      throw error;
    })
);

export default authorizedAxios;
