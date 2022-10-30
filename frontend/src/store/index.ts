import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CLEAR_STATE } from './actions/clearActions';
import _rootReducer from './reducers';

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === CLEAR_STATE) {
    state = {} as RootState;
  }

  return _rootReducer(state, action);
};

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['redirectPath'],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof _rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;

export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
