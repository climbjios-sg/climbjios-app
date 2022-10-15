import { User, UserIdentity } from './user';

// TODO: to be deprecated
// export type NewUserContextType = {
//   user: User;
//   updateName: (input: string) => void;
//   updateTelegram: (input: string) => void;
//   updateUsername: (input: string) => void;
//   hasFilledProfile: () => boolean;
//   hasFilledOnboardingInfo: () => boolean;
// };

/**
 * new auth logic:
 */

// TODO: allow pass in where to redirect to?

export type AuthProvider = {
  // TODO: fix any types, dont use token type here, since we dont want to constraint the auth method

  login: (params?: any) => Promise<any>;
  // login: () => Promise<any>;
  // logout: () => Promise<void | false | string>;
  logout: () => Promise<any>;
  checkAuth: () => Promise<void>;
  // checkAuth: (params: any) => Promise<void>;
  checkError: (status: number) => Promise<void>;
  // getPermissions: (params: any) => Promise<any>;
  getIdentity?: () => Promise<UserIdentity>;
  // [key: string]: any;
};

export type AuthProviderType = 'default' | 'jwt';
