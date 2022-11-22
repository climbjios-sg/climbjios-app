import { User } from './user';

export type AuthProvider = {
  login: (params?: unknown) => Promise<AuthProviderId>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkOnboarded: () => Promise<void>;
  checkError: (status: number) => Promise<void>;
  getIdentity: () => Promise<User>;
};

export type AuthProviderType = 'jwt';

export type AuthProviderId = string;
