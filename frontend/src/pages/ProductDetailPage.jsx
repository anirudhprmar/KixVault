import { useEffect, useState } from 'react'
import { useShopStore } from '../store/useShopStore'
import { useParams, useNavigate, Link } from 'react-router'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/useAuthStore'


function ProductDetailPage() {
  const { getProduct,addToWishlist,addToCart } = useShopStore()
  const { productId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
const [viewingProduct,setViewingProduct] = useState(null)
const {authUser} = useAuthStore()
  
  useEffect(() => {
    // Debug log to check productId
    // console.log('Product ID from params:', productId)

    async function fetchProduct() {
      if (!productId) {
        console.error('No product ID found')
        navigate('/')
        return
      }

      try {
        const res = await getProduct(productId)
        setViewingProduct(res)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, getProduct, navigate])

  
  if (loading || !viewingProduct) {
    return <div>Loading...</div>
  }
  const handleAddToWishlist = async(id)=>{
    await addToWishlist(id)
  }
  
  const handleAddToCart = async(id)=>{
    await addToCart(id)

  }
  
  return (
    
    <div>
    <Navbar/>

    <main className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img 
            src={viewingProduct.imageUrl} 
            alt={viewingProduct.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{viewingProduct.name}</h2>
          <p className="text-xl text-gray-600">{viewingProduct.brand}</p>
          <p className="text-gray-700">{viewingProduct.description}</p>
          <p className="text-gray-700 text-2xl font-bold">${viewingProduct.price.toFixed(2)}</p>

          <div className="space-y-4">
            <p className="font-semibold">Sizes:</p>
            <div className="flex gap-2">
              {viewingProduct.sizes?.map((size, index) => (
                <div key={index} className="px-4 py-2 border rounded-lg hover:bg-black hover:text-gray-50 cursor-pointer">
                  {size}
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg">In stock: {viewingProduct.stock}</p>

          <div className="space-y-4">
            <p className="font-semibold">Categories:</p>
            <div className="flex gap-2">
              {viewingProduct.category?.map((cat, index) => (
                <div key={index} className="px-4 py-2 bg-gray-100 rounded-lg">
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer" onClick={!authUser ? ()=> navigate('/login') :()=> handleAddToCart(viewingProduct._id)}
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-black rounded-lg hover:bg-gray-50 cursor-pointer" onClick={!authUser ? ()=> navigate('/login') : ()=>handleAddToWishlist(viewingProduct._id)}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </main>
    </div>
  )
}

export default ProductDetailPage