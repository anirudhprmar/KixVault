import { Link, useNavigate } from "react-router" 
import { useAuthStore } from "../store/useAuthStore"
import { ShoppingCart, Heart, User2, LogOut } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function Navbar() {
  const navigate = useNavigate()
  const { authUser, logout } = useAuthStore()
  const dropRef = useRef(null)
  const [dropOpen, setDropOpen] = useState(false)
  
  const firstLetterUser = authUser?.username?.[0]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    setDropOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky w-full top-0 left-0 right-0 z-50">
      <div className="bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto p-4">
          <nav className="flex justify-between items-center">
            <div 
              className="text-center text-2xl font-bold cursor-pointer" 
              onClick={() => navigate('/')}
            >
              KixVault
            </div>

            <ul className="flex gap-2 md:gap-8 pt-2 items-center">
              <li className="text-lg font-medium cursor-pointer hover:text-gray-600 transition-colors ">
                <Link to="/products">New Arrivals</Link>
              </li>

              <li className="text-lg font-light cursor-pointer hover:text-gray-600 transition-colors">
                <Link to={authUser ? '/cart' : '/login'} className="relative">
                  <ShoppingCart />
                  {authUser?.cart?.items?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {authUser.cart.items.length}
                    </span>
                  )}
                </Link>
              </li>

              <li className="text-lg font-light cursor-pointer hover:text-gray-600 transition-colors">
                <Link to={authUser ? '/wishlist' : '/login'} className="relative">
                  <Heart />
                  {authUser?.wishlist?.items?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {authUser.wishlist.items.length}
                    </span>
                  )}
                </Link>
              </li>

              {authUser ? (
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="w-8 h-8 rounded-full bg-gray-200 cursor-pointer flex items-center justify-center text-lg hover:bg-gray-300 transition-colors"
                  >
                    {firstLetterUser}
                  </button>

                  {dropOpen && (
                    <ul 
                      ref={dropRef}
                      className="absolute right-0 top-full mt-2 py-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100"
                    >
                      <li>
                        <Link 
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setDropOpen(false)}
                        >
                          <User2 size={16} />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <li className="text-lg font-medium cursor-pointer hover:text-gray-600 transition-colors">
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar