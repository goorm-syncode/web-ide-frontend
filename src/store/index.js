import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // 필요 시 workspace, editor 등 추가 가능
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
