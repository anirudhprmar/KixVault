import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '../../.env') })

// Add debug logging
console.log('JWT_SECRET status:', {
  exists: !!process.env.JWT_SECRET,
  length: process.env.JWT_SECRET?.length
})

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}


const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';

export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn:JWT_EXPIRES_IN
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })

    return token
}

export const verifyToken = (token) =>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err) reject (err)
                resolve(decoded)
        })

    })
}