import express from 'express'
import authRoutes from './auth.route.js'
import cartRoutes from './cart.route.js'
const router = express.Router()


app.use("/auth",authRoutes)
app.use("/products",productRoutes)
app.use("/cart",cartRoutes)

export default router