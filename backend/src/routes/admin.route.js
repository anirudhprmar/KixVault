import express from "express"
import protectRoute from "../middleware/auth.middleware.js"
import adminPaginatedResults from "../middleware/adminProducts.js"
import {getProducts, addProduct,postEditProduct,deleteProduct,searchResult,getEditProduct } from "../controllers/admin.controller.js"
import Product from "../models/product.model.js"



const router = express.Router()

router.use(protectRoute)

// //get all products
router.get('/',adminPaginatedResults(Product),getProducts)

router.get('/search',searchResult)

//post a product
router.post('/add-product',addProduct)

// get a specific product
router.get('/edit-product/:productId',getEditProduct)

//update or edit a specific product
router.put('/edit-product/:productId',postEditProduct)

//delete a product
router.delete('/:productId',deleteProduct)

export default router;