import jwtDecode from 'jwt-decode';
import { User } from '../@types/user';
// routes
import authorizedAxios from './authorizedAxios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

type UserStorage = {
  user: User;
  accessToken: string;
};

export const ACCESS_TOKEN = 'accessToken';
export const USER = 'user';

export const getSessionFromStorage = (): UserStorage | null => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const userData = localStorage.getItem(USER);
  if (accessToken && isValidToken(accessToken) && userData) {
    return {
      user: JSON.parse(userData),
      accessToken,
    };
  }

  return null;
};

export const endSession = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(USER);
  delete authorizedAxios.defaults.headers.common.Authorization;
};
