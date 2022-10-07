import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  viewVersion: number;
}

const initialState: State = {
  viewVersion: 0,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    refreshView(state) {
      state.viewVersion += 1;
    },
  },
});

export function refreshView() {
  return async () => {
    dispatch(slice.actions.refreshView());
  };
}

export default slice.reducer;
