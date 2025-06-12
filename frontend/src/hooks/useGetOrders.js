import { useEffect,useState } from "react"
import { useShopStore } from "../store/useShopStore"

function useGetOrders() {
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

       

  
     return {
        productInfo,
        isLoading,
        userPlacedOrders
     }
}

export default useGetOrders
