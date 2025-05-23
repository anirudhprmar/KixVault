import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const chatRoute = async(req, res)=>{
    const {message} = req.body
    const model = genAI.getGenerativeModel({model:"gemini-pro"})
    const result = await model.generateContent(message)
    res.status(200).json({
        reply:result.response.text()
    })
}