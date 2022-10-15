import axios from 'axios';
// config
import { HOST_API } from '../config';
import { ACCESS_TOKEN } from './jwt';

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

export default authorizedAxios;
