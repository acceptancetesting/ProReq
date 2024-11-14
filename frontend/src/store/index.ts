// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// Import other reducers

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
