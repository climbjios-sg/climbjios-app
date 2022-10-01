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
  isInitialized: boolean;
};

export type JWTContextType = {
  isInitialized: boolean;
  isAuthenticated: () => boolean;
  isOnboarded: () => boolean;
  user: User | null;
  loginLinkedin: (accessToken: string) => Promise<void>;
  loginFromSession: () => void;
  logout: () => void;
  updateProfile: (user: User) => Promise<void>;
  refetchUser: () => Promise<void>;
};
