import { AuthProvider } from 'src/@types/auth';
import { PATH_AUTH } from 'src/routes/paths';
import { getUserIdentity } from 'src/services/user';

// TODO: move to utils?

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const endSession = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const hasAuthenticated = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  return accessToken !== null && refreshToken !== null;
};

const isPublicUrl = (url: string) => [PATH_AUTH.root].includes(url);

export const jwtAuthProvider: AuthProvider = {
  /// will try to convert from unauth to auth state
  /// but if no access and refresh token, this cannot be used since BE doesnot support custom auth
  login: async () => {
    // const response = await authorizedAxios.post()
    /// no implementation
  },
  logout: async () => {
    // TODO: use utils

    // localStorage.removeItem(ACCESS_TOKEN);
    // localStorage.removeItem(REFRESH_TOKEN);
    endSession();

    return;
  },
  checkError: async (status) => {
    // TODO: define error type, better way?
    // const { status } = error;
    if (status === 401 || status === 403) {
      endSession();
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
