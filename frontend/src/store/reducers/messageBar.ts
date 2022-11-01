import { dispatch } from '..';
import { createSlice } from '@reduxjs/toolkit';
import { MessageBarProps } from '../../components/MessageBar';

type State = Pick<MessageBarProps, 'icon' | 'message' | 'loading' | 'show'> & {
  enableCloseButton?: boolean;
};

const initialState: State = {
  show: false,
  message: '',
  enableCloseButton: false,
  loading: false,
};

const slice = createSlice({
  name: 'messageBar',
  initialState,
  reducers: {
    open(state, action) {
      state.show = true;
      state.icon = action.payload.icon;
      state.message = action.payload.message;
      state.enableCloseButton = action.payload.enableCloseButton;
      state.loading = action.payload.loading;
    },
    close(state) {
      state.show = false;
      state.icon = undefined;
      state.message = '';
      state.enableCloseButton = false;
      state.loading = false;
    },
  },
});

interface OpenMessageBarProps extends Pick<MessageBarProps, 'icon' | 'message' | 'loading'> {
  autoHideDuration?: number;
  enableCloseButton?: boolean;
}

export function openMessageBar(data: OpenMessageBarProps) {
  return () => {
    dispatch(
      slice.actions.open({
        icon: data.icon,
        message: data.message,
        enableCloseButton: data.enableCloseButton,
        loading: data.loading,
      })
    );

    if (data.autoHideDuration) {
      setTimeout(() => {
        dispatch(slice.actions.close());
      }, data.autoHideDuration);
    }
  };
}

export function closeMessageBar() {
  return () => {
    dispatch(slice.actions.close());
  };
}

export default slice.reducer;
