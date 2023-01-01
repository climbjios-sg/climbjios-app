import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { CLEAR_STATE } from './actions/clearActions';
import _rootReducer from './reducers';
// @ts-ignore
// import logger from 'redux-logger'

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === CLEAR_STATE) {
    state = {} as RootState;
  }

  return _rootReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof _rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;

export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
