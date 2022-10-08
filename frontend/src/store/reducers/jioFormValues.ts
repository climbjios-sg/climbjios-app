import { JioFormValues } from './../../pages/dashboard/jios/JiosForm';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  data: JioFormValues | null;
}

const initialState: State = {
  data: null
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setJioFormValues(state, action) {
      state.data = action.payload;
    },
  },
});

export function setJioFormValues(data: JioFormValues) {
  return () => {
    dispatch(slice.actions.setJioFormValues(data));
  };
}

export default slice.reducer;
