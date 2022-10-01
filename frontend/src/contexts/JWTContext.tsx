import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { ACCESS_TOKEN, endSession, getSessionFromStorage, USER } from '../utils/jwt';
// @types
import { ActionMap, AuthState, JWTContextType } from '../@types/auth';
import { ApiUser, User } from '../@types/user';
import { apiUserToUser, BE_API } from '../utils/api';
import authorizedAxios from '../utils/authorizedAxios';

// ----------------------------------------------------------------------

enum Types {
  Initialize = 'INITIALIZE',
  LoginFromSession = 'LOGIN_FROM_SESSION',
  LoginLinkedin = 'LOGIN_LINKEDIN',
  Logout = 'LOGOUT',
  UpdateProfile = 'UPDATE_PROFILE',
  RefetchUser = 'REFETCH_USER',
}

type JWTAuthPayload = {
  [Types.LoginLinkedin]: {
    user: User;
  };
  [Types.LoginFromSession]: {
    user: User | null;
  };
  [Types.UpdateProfile]: {
    user: User;
  };
  [Types.RefetchUser]: {
    user: User;
  };
  [Types.Initialize]: undefined;
  [Types.Logout]: undefined;
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  user: null,
  isInitialized: false,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  console.log(state, action);
  switch (action.type) {
    case Types.Initialize:
      return {
        ...state,
        isInitialized: true,
      };
    case Types.LoginFromSession:
      return {
        ...state,
        isInitialized: true,
        user: action.payload.user,
      };
    case Types.RefetchUser:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.LoginLinkedin:
      return {
        ...state,
        user: action.payload.user,
        isInitialized: true,
      };
    case Types.UpdateProfile:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.user.name,
          telegram: action.payload.user.telegram,
          username: action.payload.user.username,
        },
      };
    case Types.Logout:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  // Gets user data from localStorage
  // Set to context and session
  const loginFromSession = () => {
    // Only login if is not alr logged in
    if (isAuthenticated()) {
      dispatch({ type: Types.Initialize });
      return;
    }

    const data = getSessionFromStorage();
    // If there is session data, login
    if (data) {
      authorizedAxios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      dispatch({ type: Types.LoginFromSession, payload: { user: data.user } });
      return;
    }

    // Else just initialize
    dispatch({ type: Types.Initialize });
  };

  const refetchUser = async () => {
    const { data: apiUserData } = await authorizedAxios.get<ApiUser>(BE_API.profile);
    const userData = apiUserToUser(apiUserData);
    dispatch({ type: Types.RefetchUser, payload: { user: userData } });
  };

  // Send jwt token to login
  const loginLinkedin = async (accessToken: string) => {
    authorizedAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const { data: apiUserData } = await authorizedAxios.get<ApiUser>(BE_API.profile);
    const userData = apiUserToUser(apiUserData);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    dispatch({ type: Types.LoginLinkedin, payload: { user: userData } });
  };

  const logout = () => {
    endSession();
    dispatch({ type: Types.Logout });
  };

  const updateProfile = async (user: User) => {
    // Struct for backend
    await authorizedAxios.put(BE_API.profile, {
      name: user.name,
      telegramUsername: user.telegram,
      climbJiosUsername: user.username,
    });

    // Update context
    dispatch({ type: Types.UpdateProfile, payload: { user } });
  };

  const isOnboarded = () => !!state.user?.name && !!state.user?.telegram && !!state.user.username;

  /* TESTTEST: PUT TO TRUE FOR TESTING PURPOSES!! DO NOT FORGET */
  // const isAuthenticated = () => !!state.user;
  const isAuthenticated = () => true;

  useEffect(() => {
    if (state.isInitialized) {
      localStorage.setItem(USER, JSON.stringify(state.user));
    }
  }, [state.user, state.isInitialized]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginLinkedin,
        loginFromSession,
        logout,
        updateProfile,
        refetchUser,
        isOnboarded,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
