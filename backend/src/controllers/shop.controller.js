import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export const getProducts = async (req,res) => {
 try {
   const allProducts = await Product.find({});
   res.status(200).json({
     products:allProducts
   })
 } catch (error) {
  console.log('error in get products',error);
  res.status(500).json({msg:"Internal server error"})
 }
}

export const getProduct = async(req,res)=>{

  try {
      const {productId } = req.params;
  
      const product = await Product.findById(productId)

      if (!product) {
        return res.status(411).json({
            msg:"product does not exist"
        })
      }
  
      res.status(200).json({
          product
      })
  } catch (error) {
    console.log('error in get product', error);
    res.status(500).json({msg:"Internal server error"})
  }

}

export const getCart = async(req,res)=>{
    try {
      
      const user = req.user
      
        res.status(200).json({
            cart:user.cart.items.productId // this is can be error
        })

    } catch (error) {
          console.log('error in get cart', error);
    res.status(500).json({msg:"Internal server error"})
    }
}

export const postCart = async(req,res)=>{
     try {

      const {productId} =req.params

      const product = await Product.findById(productId)
      if (!product) {
        return res.status(411).json({
          msg:"this product does not exist"
        })
      }

      req.user.addToCart(product)

       
        res.status(200).json({
            msg:"Item added to cart",
        })

    } catch (error) {
          console.log('error in post cart', error);
    res.status(500).json({msg:"Internal server error"})
    }
}

export const putCartDeleteProduct = async(req,res)=>{
  try {
    const {productId} =req.params

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(411).json({
        msg:"this product does not exist"
      })
    }

    req.user.removeFromCart(productId)

    res.status(200).json({
      msg:"Item removed from the cart"
    })

  } catch (error) {
     console.log('error in delete product from cart', error);
    res.status(500).json({msg:"Internal server error"})
  }
}

export const getCheckout = async(req,res)=>{
  try {
    const user = req.user
    const products = user.cart.items;
    let total = 0 ;
    products.forEach(item =>{
      total += item.quantity * item.productId.price
    })

    res.status(200).json({
      products:products,
      totalSum: total
    })

  } catch (error) {
     console.log('error in checkout', error);
    res.status(500).json({msg:"Internal server error"})
  }
}

export const postOrder = async(req,res)=>{
  try {
    const user = req.user
    const products = user.cart.items;
   let totalSum = 0

   products.forEach(item =>{
    totalSum += item.quantity * item.productId.price;   
  })

  const allProducts = products.map(i => {
    return {quantity:i.quantity,product:{...i.productId}}
  })

  const order = await Order.create({
    user:{
      email:req.user.email,
      userId: user._id
    },
    products:allProducts
  })

  res.status(200).json({
    msg:"order created",
    order:order
  })

  } catch (error) {
     console.log('error in post order', error);
    res.status(500).json({msg:"Internal server error"})
  }
}

export const getOrders = async (req,res) => {
  try {
    const orders = await Order.find({user:{userId:req.user._id}})

    res.status(200).json({
      orders:orders
    })
  } catch (error) {
     console.log('error in get orders', error);
    res.status(500).json({msg:"Internal server error"})
  }
}

export const postWishlist = async (req,res) => {
  try {
    const {productId} =req.params
    const user = req.user
  
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(411).json({
          msg:"this product does not exist"
        })
      }
  
      const itemAddedToWishlist = await User.updateOne({
        _id:user._id
      },{
        wishlist:{
          items:[product]
        }
      })

      res.status(200).json({
        msg:"Item added to wishlist",
        item:itemAddedToWishlist
      })
  } catch (error) {
    console.log('error in post wishlist', error);
    res.status(500).json({msg:"Internal server error"})
  }

}

export const putWishlist = async (req,res) => {
  try {
    const {productId} =req.params
    const user = req.user
  
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(411).json({
          msg:"this product does not exist"
        })
      }
  
      const itemRemovedToWishlist = await User.findByIdAndDelete({
        _id:user._id
      },{
        wishlist:{
          items:[product]
        }
      })

      res.status(200).json({
        msg:"Item added to wishlist",
        item:itemRemovedToWishlist
      })
  } catch (error) {
    console.log('error in put wishlist', error);
    res.status(500).json({msg:"Internal server error"})
  }
}

export const addReview = async (req,res) => {
   try {
    const {productId} =req.params
    const {userRating,userComment} = req.body
    const user = req.user
  
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(411).json({
          msg:"this product does not exist"
        })
      }
  
      const userReview = await Review.create({
        user:{
          email:user.email,
          userId:user._id
        },
        productId:productId,
        rating:userRating,
        comment:userComment
      })


      res.status(200).json({
        msg:"review added",
        review:userReview
      })


  } catch (error) {
    console.log('error in add review', error);
    res.status(500).json({msg:"Internal server error"})
  }
}
export const removeReview = async (req,res) => {
   try {
    const {productId} = req.params
  
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(411).json({
          msg:"this product does not exist"
        })
      }
      // find that product id and delte review completely for that product id
  
      await Review.findByIdAndDelete({
        productId: productId
      })

      res.status(200).json({
        msg:"review deleted",
      })
  } catch (error) {
    console.log('error in add review', error);
    res.status(500).json({msg:"Internal server error"})
  }
}