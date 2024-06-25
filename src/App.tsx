import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Product from './pages/Product'
import DetailProduct from './pages/DetailProduct'
import CheckoutProduct from './pages/CheckoutProduct'
import HistoryOrder from './pages/HistoryOrder'
import DetailOrder from './pages/DetailOrder'
import Profile from './pages/Profile'

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
    path: '/detail-product/:id',
    element: <DetailProduct />
  },
  {
    path: '/checkout-product',
    element: <CheckoutProduct />
  },
  {
    path: '/history-order',
    element: <HistoryOrder />
  },
  {
    path: '/detail-order',
    element: <DetailOrder />
  },
  {
    path: '/profile',
    element: <Profile />
  }
])

const App = () => {

  return (
    <RouterProvider router={router} />
  )
}

export default App
library.add(fab, fas, far)