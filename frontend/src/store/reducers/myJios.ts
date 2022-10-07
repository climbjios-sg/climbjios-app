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
  onFailure?: () => void;
}

const defaultOptions: Options = {
  onSuccess: () => {},
  onFailure: () => {},
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
      state.data = [...state.data, action.payload];
      state.error = null;
    },
    failure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export function listMyJios(options = defaultOptions) {
  const { onSuccess, onFailure } = options;
  return async () => {
    dispatch(slice.actions.request());
    try {
      const response: AxiosResponse = await authorizedAxios.get<Jio[]>(BE_API.posts.create);
      const collections: Jio[] = response.data;
      dispatch(slice.actions.list(collections));
      onSuccess?.();
    } catch (err) {
      dispatch(slice.actions.failure(err));
      onFailure?.();
    }
  };
}

export function closeMyJio(id: number, options = defaultOptions) {
  const { onSuccess, onFailure } = options;
  return async () => {
    try {
      const response = await authorizedAxios.patch<Jio>(`${BE_API.posts.create}/${id}`, {
        isClosed: true,
      });
      const updatedJioData = response.data;
      dispatch(slice.actions.update(updatedJioData));
      onSuccess?.();
    } catch (err) {
      dispatch(slice.actions.failure(err));
      onFailure?.();
    }
  };
}

export default slice.reducer;
