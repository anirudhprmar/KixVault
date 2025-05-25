import {useEffect} from 'react'
import { useShopStore } from '../store/useShopStore'
import { useNavigate } from 'react-router'

function ProductsListPage() {
  const {getProducts,allProducts,productsLoading} = useShopStore()

  useEffect(()=>{
      getProducts()
     },[getProducts])
  
     if (productsLoading) {
      // show skeleton for products loading (blinking)
      <div>No products</div>
     }
const navigate = useNavigate()
     const handleProductClick = (product)=>{
    navigate(`/product/${product.id}`)
   }
  
  return (
    <div>
      {allProducts.map(p =>{
       <div key={p._id} onClick={handleProductClick(p._id)}>
              <div>
                {p.imageUrl}
              </div>
              <div>
                <p>{p.name}</p>
                <p>{p.brand}</p>
                <p>{p.description}</p>
              </div>
              <div>
                <p>{p.price}</p>
              </div>
            </div>
      })}
    </div>
  )
}

export default ProductsListPage
