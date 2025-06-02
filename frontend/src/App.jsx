import {
  Route,
  Routes,
} from "react-router";

import { Toaster } from 'react-hot-toast';


import Homepage from './pages/Homepage'
import ProductsListPage from './pages/ProductsListPage'
import Cart from './pages/user/Cart'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetailPage from './pages/ProductDetailPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import Checkout from './pages/user/Checkout'
import Order from './pages/user/Order'
import Profile from './pages/user/Profile'
import Wishlist from './pages/user/Wishlist'
import AuthLayout from './components/auth/Authlayout'
import AdminAuthlayout from './components/auth/AdminAuthlayout'
// import Navbar from "./components/Navbar";  
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";


function App() {
  return (
    <>
      
              <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:id" element={<Order />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminAuthlayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts/>} />
            <Route path="/admin/add-product" element={<AdminAddProduct/>} />
            <Route path="/admin/edit-product/:productId" element={<AdminEditProduct/>} />
          </Route>
        </Routes>


        <Toaster/>
    
      <div className=" fixed bottom-5 right-8">
        <Chat />
      </div> 

    </>
  )
}

export default App