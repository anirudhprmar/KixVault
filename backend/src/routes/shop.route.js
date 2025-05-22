import express from "express"
import protectRoute from "../middleware/auth.middleware.js"
import { getProduct,getCart,getProducts,getCart,postCart,putCartDeleteProduct,getCheckout,postOrder,getOrders } from "../controllers/shop.controller.js";


const router = express.Router()

// router.get('/', shopController.getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', protectRoute, getCart);


router.post('/cart/:productId', protectRoute, postCart);


router.put('/cart-delete-item/:productId', protectRoute, putCartDeleteProduct);

router.get('/checkout', protectRoute, getCheckout);

router.post('/order', protectRoute, postOrder);
router.get('/orders', protectRoute, getOrders);

// router.get('/orders/:orderId', protectRoute, getInvoice); // can be done in frontend using reactpdf and puppeter


export default router;