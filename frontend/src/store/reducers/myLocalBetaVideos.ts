import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '..';
import { LocalBetaVideos } from '../../@types/beta';

// This reducer contains list of video that the user has uploaded
// We are storing videos that the video have successfully uploaded so that we don't have to refetch the video

type State = {
  data: LocalBetaVideos;
};

interface PushBetaProps {
  betaId: string;
  videoUrl: string;
}

const initialState: State = {
  data: {},
};

const slice = createSlice({
  name: 'myLocalBetaVideos',
  initialState,
  reducers: {
    push(
      state,
      action: {
        payload: PushBetaProps;
      }
    ) {
      state.data[action.payload.betaId] = action.payload.videoUrl;
    },
  },
});

export function pushMyLocalBetaVideo(data: PushBetaProps) {
  return () => {
    dispatch(slice.actions.push(data));
  };
}

export default slice.reducer;
