import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config()

if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not defined in environment variables');
    process.exit(1);
}

// console.log('Gemini API Key status:', process.env.GEMINI_API_KEY ? 'Set' : 'Not Set');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Define the expert context
const SNEAKER_EXPERT_CONTEXT = `
You are a highly knowledgeable sneaker expert with deep expertise in:
- Sneaker history and culture
- Limited editions and collaborations
- Sneaker materials and construction
- Shoe sizing and fit recommendations
- Authentication of genuine vs fake sneakers
- Current market trends and values
- Care and maintenance tips
- Major brands (Nike, Adidas, Jordan, Yeezy, etc.)

Always provide short, accurate information while maintaining a friendly, helpful tone.
Don't go into too much detail give more by saying less keep it short and concrete.
`;

const chatRoute = async(req, res) => {
    const { message } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Combine context with user's question
        const prompt = `${SNEAKER_EXPERT_CONTEXT}\n\nUser Question: ${message}\n\nExpert Response:`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        
        res.status(200).json({
            reply: response
        });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({
            error: 'Failed to generate response'
        });
    }
}

export default chatRoute;