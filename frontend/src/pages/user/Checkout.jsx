import { useEffect } from "react"
import { useShopStore } from "../../store/useShopStore"
import { useState } from "react"
import {useNavigate} from 'react-router'



function Checkout() {
 const {checkout,checkoutStatus,getProduct,placeOrder} =  useShopStore()
 const [proInfo,setProInfo] = useState([])
 const [isLoading,setIsLoading] = useState(true)
 const navigate = useNavigate()

 useEffect(()=>{
  checkout()
 },[checkout])



 useEffect(() => {
    async function fetchProducts() {
      if (!checkoutStatus?.products) {
        setIsLoading(false)
        return
      }
      
      try {
        const productPromises = checkoutStatus.products.map(prod => getProduct(prod.productId))
        const fetchedProducts = await Promise.all(productPromises)
        // Filter out any null/undefined products
        const validProducts = fetchedProducts.filter(product => 
          product && product.imageUrl && product.name 
        )
        setProInfo(validProducts)
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [checkoutStatus?.products, getProduct])
  
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  const handleOrder = async()=>{
    await placeOrder()

    setTimeout(() => {
      navigate(`/order`)
    }, 1000);

      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
  }



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Product List Section - Takes up 2 columns */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {proInfo && proInfo?.map(product => (
                <div 
                  key={product._id} 
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg"
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-gray-600">
                      Quantity: {checkoutStatus?.products.find(p => p.productId === product._id)?.quantity || 1}
                    </p>
                    <p className="text-gray-900 font-medium">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section - Takes up 1 column */}
          {checkoutStatus && <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${checkoutStatus?.totalSum.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>

                <div className="flex justify-between py-2 text-lg font-semibold">
                  <span>Total</span>
                  <span>${checkoutStatus?.totalSum.toFixed(2)}</span>
                </div>

                <button 
                  onClick={handleOrder}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mt-4 cursor-pointer"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>}
        </div>
      )}
    </div>
  )
}

export default Checkout
