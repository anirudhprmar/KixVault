import {useEffect} from 'react'
import { useShopStore } from '../store/useShopStore'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

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
       <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 px-10 pb-10">
      {allProducts.map(product => (
        <ProductCard
          key={product._id}
          pId={product._id}
          name={product.name}
          brand={product.brand}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  </div>
    </div>
  )
}

export default ProductsListPage
