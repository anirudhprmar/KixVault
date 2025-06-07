import { useShopStore } from "../../store/useShopStore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


function Cart() {
 const{getProduct,getCart,userCart,removeFromCart,checkout}= useShopStore()
 const [products,setProducts] = useState([])
   const [isLoading, setIsLoading] = useState(true)
const navigate = useNavigate()


 useEffect(()=>{
  getCart()
 },[getCart])

 useEffect(() => {
    async function fetchProducts() {
      if (!userCart?.cart) {
        setIsLoading(false)
        return
      }
      
      try {
        const productPromises = userCart.cart.map(id => getProduct(id))
        const fetchedProducts = await Promise.all(productPromises)
        // Filter out any null/undefined products
        const validProducts = fetchedProducts.filter(product => 
          product && product.imageUrl && product.name && product.price
        )
        setProducts(validProducts)
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [userCart?.cart, getProduct])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

console.log('products',products);

const handleRemoveItem =async(id)=>{
  await removeFromCart(id)
}
const handleCheckout =async(id)=>{
  const res = await checkout(id)
  if (res) {
    navigate('/checkout')
  }
}
   
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      
      {/* {ids.length} */}
      {products.length === 0 ? (
        <p className="text-gray-500">Your Cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-lg shadow p-4"
            >
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                onClick={()=>handleCheckout(product._id)}
                >
                  Checkout
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={()=> handleRemoveItem(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cart
