// import dotenv from 'dotenv'
import express from "express"
import connectDB from "./db/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser"
import mainRouter from "./routes/index.js"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

console.log('Environment Variables:', {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI?.substring(0, 20) + '...',  // Only show start of URI for security
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not Set',
    NODE_ENV: process.env.NODE_ENV
});

if (!process.env.PORT || !process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('Missing required environment variables');
    process.exit(1);
}



const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use("/api/v1",mainRouter)

const PORT = process.env.PORT 

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`)
    try {
        await connectDB()
        console.log('Successfully connected to MongoDB')
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message)
        process.exit(1)
    }
})