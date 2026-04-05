import { configureStore } from '@reduxjs/toolkit';
import deepWorkReducer from './slices/deepWorkSlice';
import taskReducer from './slices/taskSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    deepWork: deepWorkReducer,
    tasks: taskReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
