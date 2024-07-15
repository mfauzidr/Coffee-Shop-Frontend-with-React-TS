import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer, { AuthState } from "./slices/auth";
import profileReducer, { ProfileState } from "./slices/profile";

// Persist config for auth slice
const authPersistConfig: PersistConfig<AuthState> = {
  key: "auth:coffeeShop",
  storage,
  whitelist: ["token"], // Only persist 'token' from auth slice
};

// Persist config for profile slice
const profilePersistConfig: PersistConfig<ProfileState> = {
  key: "profile:coffeeShop",
  storage,
  whitelist: [], // Optionally, you can specify which fields to persist
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProfileReducer = persistReducer(profilePersistConfig, profileReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    profile: persistedProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["auth.register", "auth.rehydrate"],
      },
    }),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
