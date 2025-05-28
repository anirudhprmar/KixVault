import React, { useEffect, useState } from 'react'
import { useShopStore } from '../store/useShopStore'
import { useParams } from 'react-router'

function ProductDetailPage() {

  const {getProduct,viewingProduct} = useShopStore()
  const {id} = useParams()
  const [product,setProduct] = useState(null)

  useEffect(()=>{
    
    getProduct(id);
    setProduct(viewingProduct)

  },[id,getProduct,viewingProduct])

  console.log(getProduct(id));
  

  if (!product) {
    // again loading skeleton
    <div>No products</div>
  }

  return (
    <div>
      <div>
        {/* {product.imageUrl} */}
      </div>
      <div>
        <h2>{product.name}</h2>
        <p>{product.brand}</p>
        <p>{product.description}</p>

        <div>
          <p>Sizes:{product.sizes.map((s,index) => {
            <div key={index}>
              {s}
            </div>
          })}</p>
        </div>

        <div>in stock : {product.stock}</div>
        <div>category : {product.category.map((c,index)=>{
          <div key={index}>
            {c}
          </div>
        })}</div>


        <div>
          <button>Add to Wishlist</button>
          <button>Add to Cart</button>
        </div>
      </div>


    </div>
  )
}

export default ProductDetailPage
