import { UserIdentity } from './user';

export type AuthProvider = {
  // TODO: fix any types, dont use token type here, since we dont want to constraint the auth method
  login: (params?: any) => Promise<any>;
  logout: () => Promise<any>;
  checkAuth: () => Promise<void>;
  checkError: (status: number) => Promise<void>;
  getIdentity?: () => Promise<UserIdentity>;
};

export type AuthProviderType = 'default' | 'jwt';
