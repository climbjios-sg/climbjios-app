import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';
import { AuthProvider, AuthProviderType, UserIdentity } from 'src/@types/auth';
import { defaultAuthProvider } from 'src/authProviders/default';
import { authProviderFactory } from 'src/authProviders';

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
  },
});

export const setAuthProvider = async (type: AuthProviderType) => {
  const customAuthProvider = await authProviderFactory(type);

  return async () => {
    dispatch(slice.actions.setAuthProvider(customAuthProvider));
  };
};

export default slice.reducer;
