import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    products:[
        {
        product:{type:String,required:true},
        quantity:{type:Number,required:true},
        price:{type:Number}
        }
    ],
    user:{
        email:{
            type:String,
            required:true
        },
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },

    },
    total:{
        type:Number
    }
})

const Order = mongoose.model("Order",orderSchema)

export default Order;