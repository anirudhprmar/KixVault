import { useAuthStore } from "../../store/useAuthStore"
import { useShopStore } from "../../store/useShopStore"
import { Package, ShoppingBag, Heart, Settings, LogOut } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

function Profile() {
  const { authUser, logout } = useAuthStore()
  const { userOrders } = useShopStore()
  const [activeTab, setActiveTab] = useState('profile')

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
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
          {authUser?.username?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {authUser?.username}!</h1>
          <p className="text-gray-600">{authUser?.email}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-4 mb-8">
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
      <div className="bg-white rounded-xl shadow-sm p-6">
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
              <div>
                <label className="block text-sm text-gray-600">Member Since</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">
                  {new Date(authUser?.createdAt).toLocaleDateString()}
                </p>
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
            {userOrders?.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div 
                    key={order._id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No orders yet</p>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            {authUser?.cart?.items?.length > 0 ? (
              <div className="space-y-4">
                {authUser.cart.items.map((item) => (
                  <div 
                    key={item._id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="font-medium">${item.product.price.toFixed(2)}</p>
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
            {authUser?.wishlist?.items?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {authUser.wishlist.items.map((item) => (
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