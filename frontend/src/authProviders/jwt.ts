import jwtDecode from 'jwt-decode';
import { AuthProvider } from 'src/@types/auth';
import { PATH_AUTH } from 'src/routes/paths';
import { refreshAccessToken } from 'src/services/token';
import { getUserIdentity } from 'src/services/user';

// TODO: move to utils?

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

// TODO: basically just refresh response type ?
interface Session {
  // user: User;
  accessToken: string;
  refreshToken: string;
}

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
  // const userData = localStorage.getItem(USER);
  if (
    accessToken &&
    isValidToken(accessToken) &&
    refreshToken &&
    isValidToken(refreshToken)
    // && userData
  ) {
    return {
      // user: JSON.parse(userData),
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

// TODO: use redux persist
const deleteSession = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const hasAuthenticated = () =>
  // const accessToken = localStorage.getItem(ACCESS_TOKEN);
  // const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  // if

  // const {accessToken, refreshToken} = getSession()
  // return accessToken !== null && refreshToken !== null;

  getSession() !== null;
const isPublicUrl = (url: string) => [PATH_AUTH.root].includes(url);

// TODO: avoid using global axios object
export const jwtAuthProvider: AuthProvider = {
  /// will try to convert from unauth to auth state
  /// but if no access and refresh token, this cannot be used since BE doesnot support custom auth
  login: async () => {
    // const response = await authorizedAxios.post()
    /// no implementation

    const session = getSession();

    if (session === null) {
      return;
    }

    const { refreshToken } = session;

    // try {
    const response = await refreshAccessToken(refreshToken);

    // const collections: Jio[] = response.data;
    // dispatch(slice.actions.list(collections));
    // onSuccess?.();

    // const {refreshToken: newRefreshToken, accessToken: newAccessToken} = response.data

    setSession(response.data);

    // } catch (err) {
    //   dispatch(slice.actions.failure(err));
    //   onError?.();
    // }
  },
  logout: async () => {
    // TODO: use utils

    // localStorage.removeItem(ACCESS_TOKEN);
    // localStorage.removeItem(REFRESH_TOKEN);
    deleteSession();

    return;
  },
  // TODO: better way? pass in error?
  // rename to check response and; check status;

  /**
   * 401 error means two things
   * - token expires -> can auto relogin
   * - access and refresh token expire -> need to relogin
   */
  checkError: async (status) => {
    // TODO: define error type, better way?
    // const { status } = error;

    if (status === 401 || status === 403) {
      deleteSession();
      throw new Error();
    }

    return;
  },
  checkAuth: async () => {
    if (isPublicUrl(window.location.hash)) {
      return;
    }

    if (!hasAuthenticated()) {
      throw new Error();
    }

    return;
  },
  getIdentity: async () => {
    const response = await getUserIdentity();
    const userIdentity = response.data;
    return userIdentity;
  },
};
