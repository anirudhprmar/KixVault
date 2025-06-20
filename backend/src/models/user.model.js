import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    }, 
    email: {
        type:String,
        required:true,
        unique:true
    }, 
    password: {
        type:String,
        required:true,
        minLength:6,
    }, 
    isAdmin: {
    type: Boolean,
    default: false,
  },
    cart:{
        items:[
            {
                productId:{
                    type:Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                },
                price:{
                  type:Number
                }
            }
        ]
    },
    wishlist:{
      items:[
        {
          product:{
            type: Schema.Types.ObjectId,
            ref:"Product",
            required:true
          }
        }
      ]
    }

},{timestamps:true}
)

userSchema.methods.addToWishlist = function(productId) {
  const isAlreadyWishlisted = this.wishlist.items.some(item =>
    item.product.toString() === productId.toString()
  );

  if (!isAlreadyWishlisted) {
    this.wishlist.items.push({ product: productId });
  }

  return this.save();
};

userSchema.methods.removeFromWishlist = function(productId) {
  this.wishlist.items = this.wishlist.items.filter(item =>
    item.product.toString() !== productId.toString()
  );
  console.log(this.wishlist.items);
  
  return this.save();
};


userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
      price:product.price
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  this.cart.items = this.cart.items.filter(item => {
     item.productId.toString() !== productId.toString();
  });
   
  return this.save();
};


userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

const User = mongoose.model("User",userSchema);

export default User;