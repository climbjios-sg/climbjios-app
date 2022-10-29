import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';
import { NavigateOptions } from 'react-router';

interface State {
  to: string | null;
  options?: NavigateOptions;
}

const initialState: State = {
  to: null,
};

const slice = createSlice({
  name: 'redirectPath',
  initialState,
  reducers: {
    set(state, action) {
      state.to = action.payload.to;
      state.options = action.payload.options;
    },

    clear(state) {
      state = { ...initialState };
    },
  },
});

export function setRedirectPath(to: string, options?: NavigateOptions) {
  return () => {
    dispatch(slice.actions.set({ to, options }));
  };
}

export function clearRedirectPath() {
  return () => {
    dispatch(slice.actions.clear());
  };
}

export default slice.reducer;
