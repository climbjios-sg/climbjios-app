import { JioSearchFormValues } from '../../pages/dashboard/jios/form/utils';
import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  data: JioSearchFormValues | null;
}

const initialState: State = {
  data: null,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setJiosSearchForm(state, action) {
      state.data = action.payload;
    },
    clearJiosSearchForm(state) {
      state.data = null;
    },
  },
});

export function setJiosSearchForm(data: JioSearchFormValues) {
  return () => {
    dispatch(slice.actions.setJiosSearchForm(data));
  };
}

export function clearJiosSearchForm() {
  return () => {
    dispatch(slice.actions.clearJiosSearchForm());
  };
}

export default slice.reducer;
