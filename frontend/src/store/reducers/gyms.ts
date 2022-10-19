import { getGymList } from 'src/services/gyms';
import { Gym } from '../../@types/gym';
import { AxiosResponse } from 'axios';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  data: Gym[];
  error: AxiosResponse | null;
}

const initialState: State = {
  loading: false,
  error: null,
  data: [],
};

const slice = createSlice({
  name: 'gyms',
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

export function listGyms() {
  return async () => {
    dispatch(slice.actions.request());
    try {
      const response = await getGymList();
      const collections = response.data;
      dispatch(slice.actions.success(collections));
    } catch (err) {
      dispatch(slice.actions.failure(err));
    }
  };
}

export default slice.reducer;
