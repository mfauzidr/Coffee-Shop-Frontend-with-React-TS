import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Product from "../pages/Product";
import DetailProduct from "../pages/DetailProduct";
import CheckoutProduct from "../pages/CheckoutProduct";
import HistoryOrder from "../pages/HistoryOrder";
import DetailOrder from "../pages/DetailOrder";
import Profile from "../pages/Profile";
import { NotFound } from "../pages/NotFound";

import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import Layout from "../components/Layout";
import AdminGuard from "../guards/AdminGuard";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../pages/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <GuestGuard>
        <ForgotPassword />
      </GuestGuard>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/detail-product/:uuid",
        element: <DetailProduct />,
      },
      {
        path: "/checkout-product",
        element: (
          <AuthGuard>
            <CheckoutProduct />
          </AuthGuard>
        ),
      },
      {
        path: "/history-order",
        element: (
          <AuthGuard>
            <HistoryOrder />
          </AuthGuard>
        ),
      },
      {
        path: "/detail-order/:uuid",
        element: (
          <AuthGuard>
            <DetailOrder />
          </AuthGuard>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthGuard>
            <Profile />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <AdminGuard>
            <Dashboard />
          </AdminGuard>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
