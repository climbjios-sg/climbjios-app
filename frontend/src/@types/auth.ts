import { User } from './user';

// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthState = {
  user: User | null;
  contextFinishedLoading: boolean;
  isLoggedIn: boolean;
};

export type JWTContextType = {
  user: User | null;
  isLoggedIn: boolean;
  contextFinishedLoading: boolean;
  hasUserData: () => boolean;
  storeTokenAndFetchUserData: (accessToken: string, refreshToken: string) => Promise<void>;
  loginFromSession: () => void;
  logout: () => void;
  updateUserData: (user: User) => Promise<User>;
  createUser: (user: User) => Promise<User>;
};

export type NewUserContextType = {
  user: User;
  updateName: (input: string) => void;
  updateTelegram: (input: string) => void;
  updateUsername: (input: string) => void;
  hasFilledProfile: () => boolean;
  hasFilledOnboardingInfo: () => boolean;
};

/**
 * new auth logic:
 */

// TODO: remove User and ApiUser types
export type UserIdentity = {
  id: string;
  name?: string;
  username?: string;
  telegramHandle?: string;
  avatar?: string;
};

// TODO: allow pass in where to redirect to?

export type AuthProvider = {
  // TODO: fix any types
  login: (params: any) => Promise<any>;
  // logout: () => Promise<void | false | string>;
  logout: () => Promise<any>;
  checkAuth: () => Promise<void>;
  // checkAuth: (params: any) => Promise<void>;
  checkError: (status: number) => Promise<void>;
  // getPermissions: (params: any) => Promise<any>;
  getIdentity?: () => Promise<UserIdentity>;
  [key: string]: any;
};

export type AuthProviderType = 'default' | 'jwt';
