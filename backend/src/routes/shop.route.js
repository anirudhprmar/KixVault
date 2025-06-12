import express from "express"
import protectRoute from "../middleware/auth.middleware.js"
import {getWishlist, getProduct,getCart,getProducts,postCart,putCartDeleteProduct,getCheckout,postOrder,getOrders,postWishlist,putWishlist, } from "../controllers/shop.controller.js";


const router = express.Router()

// router.get('/', shopController.getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', protectRoute, getCart);


router.post('/cart/:productId', protectRoute, postCart);


router.delete('/cart-delete-item/:productId', protectRoute, putCartDeleteProduct);

router.get('/checkout', protectRoute, getCheckout);
// router.delete('/checkout/:productId',protectRoute,deleteCheckout)

router.post('/orders', protectRoute, postOrder);
router.get('/orders', protectRoute, getOrders);
// // router.delete('/order/:orderId',protectRoute,deleteOrder)
// router.get('/orders/:orderId', protectRoute, getInvoice); // can be done in frontend using reactpdf and puppeter


router.get('/wishlist',protectRoute,getWishlist)
router.post('/add-item-wishlist/:productId',protectRoute,postWishlist) // add items to wishlist
router.delete('/wishlist/:productId',protectRoute,putWishlist) // remove items from the wishlist

// router.post('/review/:productId',protectRoute,addReview)
// router.delete('/review/:productId',protectRoute,removeReview)



export default router;