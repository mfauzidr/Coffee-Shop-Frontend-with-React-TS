import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/public/Register";
import Login from "../pages/public/Login";
import ForgotPassword from "../pages/public/ForgotPassword";
import Home from "../pages/public/Home";
import Product from "../pages/public/Product";
import DetailProduct from "../pages/public/DetailProduct";
import CheckoutProduct from "../pages/user/CheckoutProduct";
import HistoryOrder from "../pages/user/HistoryOrder";
import DetailOrder from "../pages/user/DetailOrder";
import Profile from "../pages/user/Profile";
import { NotFound } from "../pages/public/NotFound";

import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import Layout from "../components/Layout";
import AdminGuard from "../guards/AdminGuard";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";

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
      {
        path: "products",
        element: (
          <AdminGuard>
            <Products />
          </AdminGuard>
        ),
      },
      {
        path: "orders",
        element: (
          <AdminGuard>
            <Orders />
          </AdminGuard>
        ),
      },
      {
        path: "users",
        element: (
          <AdminGuard>
            <Users />
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
