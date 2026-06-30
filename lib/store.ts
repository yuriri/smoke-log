import { configureStore } from "@reduxjs/toolkit";
import smokeCounterReducer from "./slices/smokeSlice";

export const store = configureStore({
  reducer: {
    smoke: smokeCounterReducer
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;