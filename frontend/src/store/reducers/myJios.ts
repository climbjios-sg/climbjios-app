import { BE_API } from '../../utils/api';
import { Jio } from '../../@types/jio';
import authorizedAxios from '../../utils/authorizedAxios';
import { AxiosResponse } from 'axios';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';

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

interface Options {
  onSuccess?: () => void;
  onError?: () => void;
}

const defaultOptions: Options = {
  onSuccess: () => {},
  onError: () => {},
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

export function listMyJios(options = defaultOptions) {
  const { onSuccess, onError } = options;
  return async () => {
    dispatch(slice.actions.request());
    try {
      const response: AxiosResponse = await authorizedAxios.get<Jio[]>(BE_API.posts.root);
      const collections: Jio[] = response.data;
      dispatch(slice.actions.list(collections));
      onSuccess?.();
    } catch (err) {
      dispatch(slice.actions.failure(err));
      onError?.();
    }
  };
}

export default slice.reducer;
