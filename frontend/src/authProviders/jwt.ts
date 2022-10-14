import { AuthProvider } from 'src/@types/auth';

export const jwtAuthProvider: AuthProvider = {
  /// will try to convert from unauth to auth state
  /// but if no access and refresh token, this cannot be used since BE doesnot support custom auth
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
  checkError: async () => Promise.resolve(),
  checkAuth: async () => Promise.resolve(),
  getIdentity: async () =>
    Promise.resolve({
      id: '',
      name: '',
      username: '',
      telegramHandle: '',
    }),
};
