import { UserIdentity } from './user';

export type AuthProvider = {
  login: (params?: unknown) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkOnboarded: () => Promise<void>;
  checkError: (status: number) => Promise<void>;
  getIdentity: () => Promise<UserIdentity>;
};

export type AuthProviderType = 'default' | 'jwt';
