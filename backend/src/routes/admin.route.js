import express from "express"
// import { login, logout, signup, updateProfile, checkAuth,deleteProfile } from "../controllers/auth.controller.js"
import protectRoute from "../middleware/auth.middleware.js"

const app = express()

const router = express.Router()

app.use(protectRoute)
//get all products
router.get('/',getProducts)

//post a product
router.post('/add-product',addProduct)

// get a specific product
router.get('/edit-product/:productId',getEditProduct)

//update or edit a specific product
router.put('/edit-product/:productId',postEditProduct)

//delete a product
router.delete('/:productId',deleteProduct)

export default router;