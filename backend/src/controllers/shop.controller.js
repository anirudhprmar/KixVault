import Order from "../models/order.model";
import Product from "../models/product.model";
import User from "../models/user.model";

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
            cart:user.cart.items.productId
        })

    } catch (error) {
          console.log('error in get cart', error);
    res.status(500).json({msg:"Internal server error"})
    }
}

export const postCart = async(req,res)=>{
     try {

      const productId =req.body.productId

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
    const productId =req.body.productId

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