import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import authReducer, { AuthState } from "./slices/auth";
import productReducer, { ProductsState } from "./slices/products";
import cartReducer, { CartState } from "./slices/cart";

const token = sessionStorage.getItem("token");
const expiration = sessionStorage.getItem("tokenExpiration");
const isTokenValid = token && expiration && Date.now() < parseInt(expiration);

if (!isTokenValid) {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tokenExpiration");
}

const authPersistConfig: PersistConfig<AuthState> = {
  key: "auth:coffeeShop",
  storage: storageSession,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const productPersistConfig: PersistConfig<ProductsState> = {
  key: "product:coffeeShop",
  storage: storageSession,
  whitelist: [],
};

const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);

const cartPersistConfig: PersistConfig<CartState> = {
  key: "cart:coffeeShop",
  storage: storageSession,
  whitelist: [],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: persistedProductReducer,
    cart: persistedCartReducer,
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
