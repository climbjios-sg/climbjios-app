import jwtDecode from 'jwt-decode';
import { AuthProvider } from 'src/@types/auth';
import { UserIdentity } from 'src/@types/user';
import { PATH_AUTH } from 'src/routes/paths';
import { refreshAccessToken } from 'src/services/token';
import { getUser } from 'src/services/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/jwt';

interface Session {
  accessToken: string;
  refreshToken: string;
}

const hasAuthenticated = () => getSession() !== null;
const isPublicUrl = (url: string) => [PATH_AUTH.root].includes(url);
const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const getSession = (): Session | null => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (accessToken && isValidToken(accessToken) && refreshToken && isValidToken(refreshToken)) {
    return {
      accessToken,
      refreshToken,
    };
  }

  return null;
};
const setSession = ({ accessToken, refreshToken }: Session) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};
const deleteSession = () => {
  // TODO: use redux persist
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const jwtAuthProvider: AuthProvider = {
  login: async (params) => {
    const { refreshToken, accessToken } = params as Session;

    if (refreshToken && accessToken) {
      setSession({
        refreshToken,
        accessToken,
      });
    } else {
      const session = getSession();
      if (session === null) {
        // TODO: create custom error
        throw new Error();
      }
      const { refreshToken: sessionRefreshToken } = session;
      const response = await refreshAccessToken({ refreshToken: sessionRefreshToken });
      setSession(response.data);
    }
  },
  logout: async () => {
    deleteSession();
  },

  checkError: async (status) => {
    if (status === 401 || status === 403) {
      deleteSession();
      throw new Error();
    }
  },
  checkAuth: async () => {
    if (isPublicUrl(window.location.hash)) {
      return;
    }

    if (!hasAuthenticated()) {
      throw new Error();
    }
  },
  getIdentity: async () => {
    const response = await getUser();
    const userIdentity: UserIdentity = { ...response.data, avatar: '' };
    return userIdentity;
  },
};
