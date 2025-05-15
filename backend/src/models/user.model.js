import mongoose from "mongoose";

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
    isAdmin:Boolean,
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
                }
            }
        ]
    },

},{timestamps:true}
)

const User = mongoose.model("User",userSchema);

export default User;