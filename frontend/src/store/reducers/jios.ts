import { BE_API } from '../../utils/api';
import { Jio } from '../../@types/jio';
import authorizedAxios from '../../utils/authorizedAxios';
import { AxiosResponse } from 'axios';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';

export interface ListJiosArgs {
  type?: Jio['type'];
  numPasses?: Jio['numPasses'];
  gymId?: Jio['gymId'];
  // Get jios that end after this date string.
  // DateTime string in ISO 8601 format
  startDateTime?: string;
  // Get jios that end before this date string.
  // DateTime string in ISO 8601 format
  endDateTime?: string;
}

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

export function listJios(listJiosQueryParams: ListJiosArgs) {
  return async () => {
    dispatch(slice.actions.request());
    try {
      const response: AxiosResponse = await authorizedAxios.get<Jio[]>(BE_API.posts.search, {
        params: listJiosQueryParams,
      });
      const collections: Jio[] = response.data;
      dispatch(slice.actions.success(collections));
    } catch (err) {
      dispatch(slice.actions.failure(err));
    }
  };
}

export default slice.reducer;
