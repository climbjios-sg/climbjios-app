import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { ACCESS_TOKEN, endSession, getSessionFromStorage, REFRESH_TOKEN, USER } from '../utils/jwt';
// @types
import { ActionMap, AuthState, JWTContextType } from '../@types/auth';
import { ApiUser, User } from '../@types/user';
import { BE_API, apiUserToUser, userToApiUser } from '../utils/api';
import authorizedAxios from '../utils/authorizedAxios';

// ----------------------------------------------------------------------

enum Types {
  FinishedLoading = 'FINISHED_LOADING',
  LoginWithUserData = 'LOGIN_WITH_USERDATA',
  LoginWithoutUserData = 'LOGIN_WITHOUT_USER_DATA',
  SetUserData = 'SET_USER_DATA',
  Logout = 'LOGOUT',
  UpdateUserData = 'UPDATE_PROFILE',
}

type JWTAuthPayload = {
  [Types.LoginWithUserData]: {
    user: User | null;
  };
  [Types.LoginWithoutUserData]: undefined;
  [Types.SetUserData]: {
    user: User;
  };
  [Types.UpdateUserData]: {
    user: User;
  };
  [Types.FinishedLoading]: undefined;
  [Types.Logout]: undefined;
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  user: null,
  contextFinishedLoading: false,
  isLoggedIn: false,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  console.log(state, action);
  switch (action.type) {
    case Types.FinishedLoading:
      return {
        ...state,
        contextFinishedLoading: true,
      };
    case Types.LoginWithUserData:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
      };
    case Types.LoginWithoutUserData:
      return {
        ...state,
        isLoggedIn: true,
      };
    case Types.SetUserData:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.UpdateUserData:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.user.name,
          telegramHandle: action.payload.user.telegramHandle,
        },
      };
    case Types.Logout:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
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
  /* Non-exported functions & variables */
  const fetchUserDataFromBE = async () => {
    const { data: apiUserData } = await authorizedAxios.get<ApiUser>(BE_API.user);
    if (apiUserData) {
      const userData = apiUserToUser(apiUserData);
      return userData;
    }

    return null;
  };

  const patchUserDataInBE = async (user: User) => {
    // Struct for backend
    const { data: apiUserData } = await authorizedAxios.patch<ApiUser>(BE_API.user, {
      name: user.name,
      username: user.username,
      telegramHandle: user.telegramHandle,
    });

    const userData: User = apiUserToUser(apiUserData);

    return userData;
  };

  /* Exported functions & variables */
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  // Gets user data from localStorage, set to context and session
  const loginFromSession = () => {
    // If user data already exists, there is no need to login.
    if (hasUserData()) {
      dispatch({ type: Types.FinishedLoading });
      return;
    }

    const data = getSessionFromStorage();
    // If there is session data, load data
    if (data) {
      authorizedAxios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      dispatch({ type: Types.LoginWithUserData, payload: { user: data.user } });
    }
    dispatch({ type: Types.FinishedLoading });
  };

  const storeTokenAndFetchUserData = async (accessToken: string, refreshToken: string) => {
    authorizedAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    const returnedUser: User | null = await fetchUserDataFromBE();
    if (returnedUser) {
      dispatch({ type: Types.LoginWithUserData, payload: { user: returnedUser } });
    } else {
      dispatch({ type: Types.LoginWithoutUserData });
    }

    dispatch({ type: Types.FinishedLoading });
  };

  const logout = () => {
    endSession();
    dispatch({ type: Types.Logout });
  };

  const createUser = async (user: User) => {
    const userProfile = { ...user };
    delete userProfile.id;
    const returnedUser = await patchUserDataInBE(user);
    // Update context
    dispatch({ type: Types.SetUserData, payload: { user: returnedUser } });

    return returnedUser;
  };

  const updateUserData = async (user: User) => {
    const returnedUser = await patchUserDataInBE(user);
    // Update context
    dispatch({ type: Types.UpdateUserData, payload: { user: returnedUser } });

    return returnedUser;
  };

  const hasUserData = () => {
    // For new users, BE will return "id" and possibly "name", 
    // but username and telegramHandle will be null/undefined
    return !!state.user?.username && !!state.user?.telegramHandle
  };

  useEffect(() => {
    if (state.contextFinishedLoading && hasUserData()) {
      localStorage.setItem(USER, JSON.stringify(state.user));
    }
  }, [state.user, state.contextFinishedLoading]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        storeTokenAndFetchUserData,
        loginFromSession,
        logout,
        updateUserData,
        createUser,
        hasUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
