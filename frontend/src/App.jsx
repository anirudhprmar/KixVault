import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Homepage from './pages/Homepage'
import ProductsListPage from './pages/ProductsListPage'
import Cart from './pages/Cart'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetailPage from './pages/ProductDetailPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import Checkout from './pages/User Focused/Checkout'
import Order from './pages/User Focused/Order'
import Profile from './pages/User Focused/Profile'
import Wishlist from './pages/User Focused/Wishlist'
import AuthLayout from './components/auth/Authlayout'
import AdminAuthlayout from './components/auth/AdminAuthlayout'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <>
       <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />


          <Route element={<AdminAuthlayout />} >
            <Route path="/admin" element={<AdminDashboard/>} />
            {/* product management pages*/}
          </Route>


          <Route element={<AuthLayout />} >
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />
          </Route>
        
        </Routes>

        <Footer/>

      </BrowserRouter>
    </>
  )
}

export default App