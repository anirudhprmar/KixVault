import mongoose , {Schema} from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
      type:String,
      required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl: {
    type: String,
    required: true
  },
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sizes:[Number],
  stock:Number,
  category: [String]

})

const Product = mongoose.model("Product",productSchema);

export default Product;