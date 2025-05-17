import express from 'express'
import authRoutes from './auth.route.js'
import shopRoutes from './shop.route.js'
import adminRoutes from './admin.route.js'
const router = express.Router()


app.use("/auth",authRoutes) // authentication of user

app.use("/products",adminRoutes) // admin control of products 

app.use("/shop",shopRoutes) // handles order and review

export default router