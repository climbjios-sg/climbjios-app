import { JioFormValues } from '../../pages/dashboard/jios/form/JiosForm';
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
    setJioSearchForm(state, action) {
      state.data = action.payload;
    },
  },
});

export function setJioSearchForm(data: JioFormValues) {
  return () => {
    dispatch(slice.actions.setJioSearchForm(data));
  };
}

export default slice.reducer;
