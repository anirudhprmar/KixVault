import {useEffect,useState} from 'react'
import { useShopStore } from '../store/useShopStore'

function useGetCart() {
    const{getProduct,getCart,userCart}= useShopStore()
 const [products,setProducts] = useState([])
   const [isLoading, setIsLoading] = useState(true)


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
  return {
    isLoading,
    products,
  }
}

export default useGetCart
