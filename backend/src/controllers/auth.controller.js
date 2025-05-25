import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import { signupSchema , loginSchema} from "../types.js";

export const signup = async(req,res)=>{

    try {
        const validatedData = signupSchema.safeParse(req.body);
    
        if (!validatedData.success) {
            return res.status(411).json({
                msg:"invalid inputs"
            })
        }
    
        const userExists = await User.findOne({email:validatedData.data.email})
    
        if (userExists) {
            return res.status(400).json({
                msg: "user already exists"
            })
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.data.password,salt);
    
        const newUser = await User.create({
            username: validatedData.data.username,
            email: validatedData.data.email,
            password:hashedPassword
        })
    
        const token = generateToken(newUser._id,res);
    
        return res.status(200).json({
            msg:"success",
            token,
            data:{
                user:{
                    id:newUser._id,
                    username:newUser.username,
                    email:newUser.email
                }
            }
        })
    } catch (error) {
        console.log("error in sign up",error);
        res.status(500).json({
            msg:"internal server error"
        })      
    }
}

export const login = async (req,res) => {
   try {
     const validatedData = loginSchema.safeParse(req.body)
 
     const existingUser = await User.findOne({email:validatedData.data.email})
     if (!existingUser) {
         return res.status(411).json({
             msg:"User does not exist"
         })
     }
 
     if(!(await bcrypt.compare(validatedData.data.password,existingUser.password))){
         return res.status(401).json({
         status: 'fail',
         message: 'Invalid credentials'
         });
     }
 
     const token = generateToken(existingUser._id,res);

     res.status(200).json({
         status: 'success',
         token
       });

   } catch (error) {

        console.log("Error in login controller", error.message);
        res.status(500).json({message:"Internal Server Error"})
   }
    
}
export const logout = async (req,res) => {
   try {
    res.clearCookie('jwt')
    return res.status(200).json({
            status:"success",
            msg:"Logged out sucessfully"
        });
   } catch (error) {
    console.log('error in logout',error);
    res.status(500).json({message:"Internal Server Error"})
   } 
}

export const checkAuth = (req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log('Error in checkAuth controller:',error.message);
    res.status(500).json({message:"Internal server error"})
  }
}

export const deleteProfile = async (req,res) => {
    try {
        const user = req.user
        const deletedUser = await User.findByIdAndDelete(user._id)

         if(!deletedUser){
            return res.status(404).json({
                msg:"User not found"
            })
        }
        
        res.clearCookie('jwt');

        res.status(200).json({
            msg:"User deleted successfully"
        })

    } catch (error) {
        console.log('Error in delete profile:',error.message);
        res.status(500).json({message:"Internal server error"})    
    }
}