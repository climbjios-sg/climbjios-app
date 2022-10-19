import { Wall } from "../../@types/wall";
import { getWalls } from "../../services/walls";
import { AxiosResponse } from 'axios';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  data: Wall[];
  error: AxiosResponse | null;
}

const initialState: State = {
  loading: false,
  error: null,
  data: [],
};

const slice = createSlice({
  name: 'walls',
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    failure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export function listWalls() {
  return async () => {
    dispatch(slice.actions.request());
    try {
      const response: AxiosResponse = await getWalls();
      const collections: Wall[] = response.data;
      dispatch(slice.actions.success(collections));
    } catch (err) {
      dispatch(slice.actions.failure(err));
    }
  };
}

export default slice.reducer;
