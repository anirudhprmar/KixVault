import { useEffect , useState} from "react"
import { useShopStore } from "../store/useShopStore"


function useGetWishlist() {
    const{getProduct,allWishlists,itemId}= useShopStore()
     const [wishlist,setWishlist] = useState([])
       const [isLoading, setIsLoading] = useState(true)
    
    
    
     useEffect(()=>{
      allWishlists()
     },[allWishlists])
    
     useEffect(() => {
        async function fetchwishlist() {
          if (!itemId?.wishlist) {
            setIsLoading(false)
            return
          }
          
          try {
            const productPromises = itemId.wishlist.map(id => getProduct(id))
            const fetchedwishlist = await Promise.all(productPromises)
            // Filter out any null/undefined wishlist
            const validwishlist = fetchedwishlist.filter(product => 
              product && product.imageUrl && product.name && product.price
            )
            setWishlist(validwishlist)
          } catch (error) {
            console.error('Error fetching wishlist wishlist:', error)
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchwishlist()
      }, [itemId?.wishlist, getProduct])
  return {
    wishlist,
    isLoading
  }
}

export default useGetWishlist
