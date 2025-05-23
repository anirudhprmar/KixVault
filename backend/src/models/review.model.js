import mongoose, { Schema } from 'mongoose'

const reviewSchema = new mongoose.Schema({
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
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    rating:{
        range:{
            min:{type:Number,min:1},
            max:{type:Number,max:5}
        }
    },
    comment:{
        type:String
    }
},
{timestamps:true})


const Review = mongoose.model("Review",reviewSchema);

export default Review;