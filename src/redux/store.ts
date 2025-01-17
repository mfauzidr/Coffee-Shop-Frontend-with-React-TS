import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer, { AuthState } from "./slices/auth";
import productReducer, { ProductsState } from "./slices/products";

const authPersistConfig: PersistConfig<AuthState> = {
  key: "auth:coffeeShop",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const productPersistConfig: PersistConfig<ProductsState> = {
  key: "product:coffeeShop",
  storage,
  whitelist: [],
};

const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: persistedProductReducer,
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
