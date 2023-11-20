import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./reducers/dashboard";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/cryptoWS";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
