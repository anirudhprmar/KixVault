import express from "express"
// import { login, logout, signup, updateProfile, checkAuth,deleteProfile } from "../controllers/auth.controller.js"
import protectRoute from "../middleware/auth.middleware.js"


const router = express.Router()

// router.get('/', shopController.getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', protectRoute, getCart);

router.post('/cart', protectRoute, postCart);

router.put('/cart-delete-item', protectRoute, putCartDeleteProduct);

router.get('/checkout', protectRoute, getCheckout);

router.get('/orders', protectRoute, getOrders);

router.get('/orders/:orderId', protectRoute, getInvoice);


export default router;