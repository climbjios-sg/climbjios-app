import { BE_API } from '../../utils/api';
import { Jio } from '../../@types/jio';
import authorizedAxios from '../../utils/authorizedAxios';
import { AxiosResponse } from 'axios';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';
import { getMyJioList } from 'src/services/myJios';

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
  name: 'myJios',
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    list(
      state,
      action: {
        payload: Jio[];
        type: string;
      }
    ) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    update(
      state,
      action: {
        payload: Jio;
        type: string;
      }
    ) {
      state.loading = false;
      state.data = state.data.map((element) =>
        element.id === action.payload.id ? action.payload : element
      );
      state.error = null;
    },
    failure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export function listMyJios() {
  return async () => {
    dispatch(slice.actions.request());
    try {
      const response = await getMyJioList();
      const collections = response.data;
      dispatch(slice.actions.list(collections));
    } catch (err) {
      dispatch(slice.actions.failure(err));
    }
  };
}

export default slice.reducer;
