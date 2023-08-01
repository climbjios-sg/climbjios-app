import { AuthProvider } from 'src/@types/auth';
import { CacheName } from 'src/@types/cache';
import { PATH_AUTH } from 'src/routes/paths';
import { refreshAccessToken, checkValidity as refreshSessionTokens } from 'src/services/token';
import { getUser } from 'src/services/users';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/jwt';
import mixpanel_actions from 'src/mixpanel';

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
   * Resolves if session tokens are valid.
   * In case of invalid access token, refreshes it using the current refresh token and resolves.
   * In case of invalid refresh token, throws an error.
   */
  checkAuth: async () => {
    if (isPublicUrl(window.location.hash)) {
      return;
    }

    const session = getSession();
    if (session === null) {
      throw new Error();
    }

    if (!isTokenExpired(session.accessToken)) {
      return;
    }

    await refreshSessionTokens();
  },
  checkOnboarded: async () => {
    const response = await getUser();
    const userIdentity = response.data;

    if (!userIdentity.name) {
      throw new Error('user has no name - new user');
    }
    mixpanel_actions.identify(userIdentity.userId);
    mixpanel_actions.people.set(userIdentity);
  },
  getIdentity: async () => {
    const response = await getUser();
    const userIdentity = response.data;
    return userIdentity;
  },
};
