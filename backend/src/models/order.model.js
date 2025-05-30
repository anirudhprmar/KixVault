import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    products:[
        {
        product:{type:Object,required:true},
        quantity:{type:Number,required:true}
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

    }
})

const Order = mongoose.model("Order",orderSchema)

export default Order;