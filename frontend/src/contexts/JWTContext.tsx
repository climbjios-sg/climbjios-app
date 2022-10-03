import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { ACCESS_TOKEN, endSession, getSessionFromStorage, REFRESH_TOKEN, USER } from '../utils/jwt';
// @types
import { ActionMap, AuthState, JWTContextType } from '../@types/auth';
import { ApiUser, User } from '../@types/user';
import { apiUserToUser, BE_API } from '../utils/api';
import authorizedAxios from '../utils/authorizedAxios';

// ----------------------------------------------------------------------

enum Types {
  Initialize = 'INITIALIZE',
  LoginFromSession = 'LOGIN_FROM_SESSION',
  LoginGoogle = 'LOGIN_GOOGLE',
  Logout = 'LOGOUT',
  SetProfile = 'SET_PROFILE',
  UpdateProfile = 'UPDATE_PROFILE',
  RefetchUser = 'REFETCH_USER',
}

type JWTAuthPayload = {
  [Types.LoginGoogle]: {
    user: User;
  };
  [Types.LoginFromSession]: {
    user: User | null;
  };
  [Types.SetProfile]: {
    user: User;
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
    case Types.LoginGoogle:
      return {
        ...state,
        user: action.payload.user,
        isInitialized: true,
      };
    case Types.SetProfile:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.user.id,
          name: action.payload.user.name,
          username: action.payload.user.username,
          telegramHandle: action.payload.user.telegramHandle,
        },
      };
    case Types.UpdateProfile:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.user.name,
          username: action.payload.user.username,
          telegramHandle: action.payload.user.telegramHandle,
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
    const { data: apiUserData } = await authorizedAxios.get<ApiUser>(BE_API.user);
    const userData = apiUserToUser(apiUserData);
    dispatch({ type: Types.RefetchUser, payload: { user: userData } });
  };

  const loginGoogle = async (accessToken: string, refreshToken: string) => {
    authorizedAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // TODO: Uncomment when API endpoint is ready for fetching user data
    // const { data: apiUserData } = await authorizedAxios.get<ApiUser>(BE_API.user);
    // const userData = apiUserToUser(apiUserData);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    // dispatch({ type: Types.LoginGoogle, payload: { user: userData } });
    // Fake user data
    console.log('loginGoogle, dispatching fake user data');
    dispatch({
      type: Types.LoginGoogle,
      payload: {
        user: { name: 'Name', username: 'username123', telegramHandle: 'teleuserHelloWOrld' },
      },
    });
  };

  const logout = () => {
    endSession();
    dispatch({ type: Types.Logout });
  };

  const setProfile = async (user: User) => {
    const userProfile = { ...user };
    delete userProfile.id;
    const resp = await authorizedAxios.patch<ApiUser>(BE_API.onboarding, {
      ...userProfile,
    });

    const returnedUser: User = apiUserToUser(resp.data);

    dispatch({ type: Types.SetProfile, payload: { user: returnedUser } });
  };

  const updateProfile = async (user: User) => {
    // Struct for backend
    const resp = await authorizedAxios.patch<ApiUser>(BE_API.user, {
      name: user.name,
      username: user.username,
      telegramHandle: user.telegramHandle,
    });

    const returnedUser: User = apiUserToUser(resp.data);

    // Update context
    dispatch({ type: Types.UpdateProfile, payload: { user: returnedUser } });
  };

  const isOnboarded = () =>
    !!state.user?.name && !!state.user?.username && !!state.user?.telegramHandle;

  // const isAuthenticated = () => !!state.user;
  const isAuthenticated = () => true;
  /* NOTE: SET TO TRUEFOR TESTING PURPOSES!!! */

  useEffect(() => {
    if (state.isInitialized) {
      localStorage.setItem(USER, JSON.stringify(state.user));
    }
  }, [state.user, state.isInitialized]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginGoogle,
        loginFromSession,
        logout,
        setProfile,
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
