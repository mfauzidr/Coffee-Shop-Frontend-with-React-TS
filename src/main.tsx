import ReactDOM from "react-dom/client";
import "../tailwind.css";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import router from "./styles/router";
import { store, persistedStore } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistedStore} loading={null}>
      <RouterProvider router={router} />
    </PersistGate>
  </ReduxProvider>
);
