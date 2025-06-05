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
            user:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email
            }

        })
    } catch (error) {
        console.log("error in sign up",error);
        res.status(500).json({
            msg:"internal server error"
        })      
    }
}

export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.safeParse(req.body)
    if (!validatedData.success) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    const user = await User.findOne({ email: validatedData.data.email })
    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    const isMatch = await bcrypt.compare(validatedData.data.password, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" })
    }

    const token = generateToken(user._id, res)

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        cart: user.cart,
        wishlist: user.wishlist
      }
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ msg: "Internal server error" })
  }
}

export const checkAuth = async (req, res) => {
  try {
    // User is already attached by middleware
    const user = req.user
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      cart: user.cart,
      wishlist: user.wishlist
    })
  } catch (error) {
    console.error("Check auth error:", error)
    res.status(500).json({ msg: "Internal server error" })
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