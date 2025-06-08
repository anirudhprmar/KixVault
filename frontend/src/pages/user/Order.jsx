import { useShopStore } from '../../store/useShopStore'
import { useEffect, useState } from 'react'

function Order() {
  const {userPlacedOrders,getOrders,getProduct} = useShopStore()
  const [isLoading,setIsLoading] = useState(true)
  const [productInfo,setProductInfo] = useState([])

  useEffect(()=>{
    getOrders()
  },[getOrders])

   useEffect(() => {
    async function fetchProducts() {
      if (!userPlacedOrders?.products) {
        setIsLoading(false)
        return
      }
      
      try {
        const productPromises = userPlacedOrders.products.map(prod => getProduct(prod.product))
        const fetchedProducts = await Promise.all(productPromises)
         const validProducts = fetchedProducts.filter(product => 
          product && product.imageUrl && product.name 
        )
        setProductInfo(validProducts)
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [userPlacedOrders?.products, getProduct])
  


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {userPlacedOrders && <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Order Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Order #{userPlacedOrders._id.slice(-6)}</h1>
          <p className="text-gray-600">Order placed by: {userPlacedOrders.user.email}</p>
        </div>

        {/* Products List */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          {productInfo.map((product) => {
            const orderProduct = userPlacedOrders.products.find(p => p.product === product._id)
            return (
              <div 
                key={product._id}
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
              >
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-gray-600">Quantity: {orderProduct?.quantity || 1}</p>
                  <p className="text-gray-900 font-medium">
                    ${orderProduct?.price.toFixed(2)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6">
          <div className="max-w-sm ml-auto space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${userPlacedOrders.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-3 border-t">
              <span>Total</span>
              <span>${userPlacedOrders.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Cancel Order Button */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={() => {/* Add cancel order handler */}}
            className="px-6 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Cancel Order
          </button>
        </div>
      </div>}
    </div>
  )
}


export default Order
