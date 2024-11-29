import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import feedbackFormSlice from './feedbackFormSlice/feedbackFormSlice';

const store = configureStore({
  reducer: {
    feedbackForm: feedbackFormSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }).concat(),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;

export default store;
