import { createBrowserRouter } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/Home'
import Product from '../pages/Product'
import DetailProduct from '../pages/DetailProduct'
import CheckoutProduct from '../pages/CheckoutProduct'
// import HistoryOrder from '../pages/HistoryOrder'
// import DetailOrder from '../pages/DetailOrder'
// import Profile from '../pages/Profile'



const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/product',
    element: <Product />
  },
  {
    path: '/detail-product/:uuid',
    element: <DetailProduct />
  },
  {
    path: '/checkout-product',
    element: <CheckoutProduct />
  },
  // {
  //   path: '/history-order',
  //   element: <HistoryOrder />
  // },
  // {
  //   path: '/detail-order',
  //   element: <DetailOrder />
  // },
  // {
  //   path: '/profile',
  //   element: <Profile />
  // }
])

export default router