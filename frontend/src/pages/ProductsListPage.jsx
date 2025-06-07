import {useEffect} from 'react'
import { useShopStore } from '../store/useShopStore'
import toast from 'react-hot-toast'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router'
import {ArrowLeftCircle} from 'lucide-react'
import Navbar from '../components/Navbar'

function ProductsListPage() {
  const {getProducts,allProducts,productsLoading,error} = useShopStore()

  useEffect(()=>{
      getProducts()
     },[getProducts])
  
     if (productsLoading) {
      // show skeleton for products loading (blinking)
      <div>No products</div>
     }

    if (error) {
    return toast.error(error)
   }
  
  return (
    <div>
      <Navbar/>
       <div className="container mx-auto px-4 pb-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 px-10 pb-10">
      {allProducts.map(product => (
       <div key={product._id}>
         <ProductCard
          pId={product._id}
          name={product.name}
          brand={product.brand}
          price={product.price}
          imageUrl={product.imageUrl}
        />
       </div>
      ))}
    </div>
    <div >
       <Link to={'/'}
          className='text-xl font-semibold hover:underline hover:transform-stroke flex items-center gap-2 px-10 cursor-pointer'
          >
          back
          <span className='hover:animate-spin'><ArrowLeftCircle/></span>
          </Link>
    </div>
  </div>
    </div>
  )
}

export default ProductsListPage
