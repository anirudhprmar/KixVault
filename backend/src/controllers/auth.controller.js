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
    
        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.data.password,salt);
    
        const newUser = await User.create({
            ...validatedData,
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
    
}
export const logout = async (req,res) => {
    
}
export const checkAuth = async (req,res) => {
    
}
export const deleteProfile = async (req,res) => {
    
}