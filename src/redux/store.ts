import { configureStore } from '@reduxjs/toolkit';
import deepWorkReducer from './slices/deepWorkSlice';

export const store = configureStore({
  reducer: {
    deepWork: deepWorkReducer,
    // tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
