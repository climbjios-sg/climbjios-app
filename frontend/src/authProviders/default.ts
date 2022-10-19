import { AuthProvider } from 'src/@types/auth';

export const defaultAuthProvider: AuthProvider = {
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
  checkError: async () => Promise.resolve(),
  checkAuth: async () => Promise.resolve(),
  checkOnboarded: async () => Promise.resolve(),
  getIdentity: async () =>
    Promise.resolve({
      id: '',
      name: '',
      username: '',
      telegramHandle: '',
    }),
};
