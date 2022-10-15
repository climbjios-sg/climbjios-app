import { GetJioListRequest, Jio } from '../../@types/jio';
import { AxiosResponse } from 'axios';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';
import { getJioList } from 'src/services/jios';

interface State {
  loading: boolean;
  data: Jio[];
  error: AxiosResponse | null;
}

const initialState: State = {
  loading: false,
  error: null,
  data: [],
};

const slice = createSlice({
  name: 'jios',
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

export function listJios(searchParams: GetJioListRequest) {
  return async () => {
    dispatch(slice.actions.request());
    try {
      const response: AxiosResponse = await getJioList(searchParams);
      const collections: JioResponse[] = response.data;
      dispatch(slice.actions.success(collections));
    } catch (err) {
      dispatch(slice.actions.failure(err));
    }
  };
}

export default slice.reducer;
