import { useAuthStore } from "../../store/useAuthStore"
import { Package, ShoppingBag, Heart, Settings, LogOut } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import useGetOrders from "../../hooks/useGetOrders"
import useGetCart from "../../hooks/useGetCart"
import useGetWishlist from "../../hooks/useGetWishlist"

function Profile() {
  const { authUser, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const {userPlacedOrders} = useGetOrders()
  const {products} = useGetCart()
  const{wishlist} = useGetWishlist()
  
  


  const tabs = [
    { id: 'profile', label: 'Profile', icon: <Settings size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'cart', label: 'Shopping Cart', icon: <ShoppingBag size={20} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
  ]


  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8 p-6 bg-white rounded-xl shadow-sm">
        <div className="w-18 md:w-24  h-14 md:h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
          {authUser?.username?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {authUser?.username}!</h1>
          <p className="text-gray-600">{authUser?.email}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === tab.id 
                ? 'bg-black text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 ">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Account Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Username</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{authUser?.username}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{authUser?.email}</p>
              </div>
            </div>

            <button 
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
  

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Order History</h2> 
           
            {userPlacedOrders?.products.length > 0 ? (
              <div className="space-y-4">
                {
                  <div 
                    key={userPlacedOrders._id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Order #{userPlacedOrders._id.slice(-6)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${userPlacedOrders.total.toFixed(2)}</p>
                    </div>
                  </div>
                }
              </div>
            ) : (
              <p className="text-gray-600">No orders yet</p>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="space-y-6"> 
            <h2 className="text-xl font-semibold">Shopping Cart</h2> 
            {products.length > 0 ? (
              <div className="space-y-4">
                {products.map((item) => (
                  <div 
                    key={item._id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <Link 
                  to="/checkout"
                  className="block w-full py-3 text-center bg-black text-white rounded-lg hover:bg-gray-900"
                >
                  Proceed to Checkout
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">Your cart is empty</p>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Wishlist</h2>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div 
                    key={item._id}
                    className="p-4 border rounded-lg"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Your wishlist is empty</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile