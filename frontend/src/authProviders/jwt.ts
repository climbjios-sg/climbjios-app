import { AuthProvider } from 'src/@types/auth';
import { CacheName } from 'src/@types/cache';
import { PATH_AUTH } from 'src/routes/paths';
import { refreshAccessToken, checkValidity } from 'src/services/token';
import { getUser } from 'src/services/users';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/jwt';

interface Session {
  accessToken: string;
  refreshToken: string;
}

const isPublicUrl = (url: string) => [PATH_AUTH.root].includes(url);
const isTokenExpired = (accessToken: string, offset = 0) =>
  Date.now() >= JSON.parse(atob(accessToken.split('.')[1])).exp * 1000 + offset;
const getSession = (): Session | null => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (accessToken && refreshToken) {
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
const deleteCache = (name: CacheName) =>
  caches
    .open(name)
    .then((cache) => cache.keys().then((requests) => requests.map((req) => cache.delete(req))));

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

      const response = await refreshAccessToken(sessionRefreshToken);

      if (response.status === 404) {
        throw new Error();
      }

      setSession(response.data);
    }
  },
  logout: async () => {
    try {
      deleteSession();
      await deleteCache(CacheName.API);
    } catch (err) {
      console.error(err);
    }
  },
  checkError: async (status) => {
    if (status === 401 || status === 403) {
      deleteSession();
      throw new Error();
    }
  },
  /**
   * Checks that both access token and refresh token are valid.
   * If access token is invalid, updates it using the refresh token.
   */
  checkAuth: async () => {
    // Don't check auth if it's a public url
    if (isPublicUrl(window.location.hash)) {
      return;
    }

    const session = getSession();
    // If there's no session, terminate
    if (session === null) {
      throw new Error();
    }

    // If token is expired, terminate
    if (isTokenExpired(session.accessToken)) {
      throw new Error();
    }

    // Send request to check if access token is valid
    // Will auto refresh access token if it's expired
    await checkValidity();
  },
  checkOnboarded: async () => {
    const response = await getUser();
    const userIdentity = response.data;

    if (!userIdentity.name) {
      throw new Error();
    }
  },
  getIdentity: async () => {
    const response = await getUser();
    const userIdentity = response.data;
    return userIdentity;
  },
};
