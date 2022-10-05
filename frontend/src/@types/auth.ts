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
