import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';
import { UserRequest, UserIdentity } from 'src/@types/user';
import { defaultAuthProvider } from 'src/authProviders/default';
import { createUser, updateUser } from 'src/services/user';
import { AuthProvider } from 'src/@types/auth';

interface State {
  // TODO: prompt to set a default auth provider
  authProvider: AuthProvider;
  userIdentity: UserIdentity | null;
}

const initialState: State = {
  authProvider: defaultAuthProvider,
  userIdentity: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthProvider(
      state,
      action: {
        payload: AuthProvider;
        type: string;
      }
    ) {
      state.authProvider = action.payload;
    },
    updateUserIdentity(
      state,
      action: {
        payload: UserIdentity;
        type: string;
      }
    ) {
      state.userIdentity = action.payload;
    },
  },
});

export const setAuthProvider = (authProvider: AuthProvider) => async () => {
  dispatch(slice.actions.setAuthProvider(authProvider));
};

export function createUserIdentity(user: UserRequest) {
  return async () => {
    const response = await createUser(user);
    const userIdentity: UserIdentity = {
      ...response.data,
      avatar: '',
    };
    dispatch(slice.actions.updateUserIdentity(userIdentity));
  };
}

export function updateUserIdentity(user: UserRequest) {
  return async () => {
    const response = await updateUser(user);
    const userIdentity: UserIdentity = {
      ...response.data,
      avatar: '',
    };
    dispatch(slice.actions.updateUserIdentity(userIdentity));
  };
}

export default slice.reducer;
