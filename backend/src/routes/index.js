import express from 'express'
import authRoutes from './auth.route.js'
import shopRoutes from './shop.route.js'
import adminRoutes from './admin.route.js'
import geminiChat from '../server/index.js'
const router = express.Router()


router.use("/auth",authRoutes) // authentication of user

router.use("/admin",adminRoutes) // admin control of products 

router.use("/shop",shopRoutes) // handles order and review'

router.use("/ai",geminiChat)


export default router