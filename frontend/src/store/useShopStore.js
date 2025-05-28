import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
// import toast from "react-hot-toast";

export const useShopStore = create((set)=>({
    allProducts:[],
    productsLoading:false,
    error:null,
    getProducts:async () => {
        set({productsLoading:true})
        try {
            const res = await axiosInstance.get('/shop/products');
            set({allProducts:res.data.products})
        } catch (error) {
            console.log('error in get products',error);
            set({ 
                error: error.response?.data?.message || 'Failed to fetch products',
                allProducts: []
            })
        }finally{
            set({productsLoading:false})
        }
    },
    viewingProduct:false,
    getProduct:async (productId) => {
        try {
            const res = await axiosInstance.get(`/shop/products/${productId}`)
           set({viewingProduct:res.data.product})
        } catch (error) {
            console.log("error in get product",error);
        }
    },
    userCart:false,
    getCart:async (data) => {
        try {
            const res = await axiosInstance.get('/shop/cart',data)
            set({userCart:res.data.cart})
        } catch (error) {
            console.log("error in get cart",error);
        }
    },
    addedTocart:false,
    addToCart:async (data) => {
        try {
            await axiosInstance.post('/shop/cart/:productId',data)
            set({addedTocart:true})
        } catch (error) {
            console.log("error in get cart",error);
        }finally{
            set({addedTocart:false})
        }
    },
    removedFromCart:false,
    removeFromCart:async (data) => {
        try {
            await axiosInstance.put('/shop/cart-delete-item/:productId',data)
            set({removedFromCart:true})
        } catch (error) {
            console.log("erro in remove from cart",error);
        }finally{
            set({removedFromCart:false})
        }
    },
    checkoutStatus:false,
    checkout:async () => {
        try {
            const res = await axiosInstance.get('/shop/checkout')
            set({checkoutStatus:res.data}) // products, total sum
        } catch (error) {
            console.log("error in checkout",error);
        }
    },
    userOrder:false,
    placeOrder:async () => {
        try {
            const res = await axiosInstance.post('/shop/order')
            set({userOrder:res.data.order})
        } catch (error) {
            console.log("error in place order",error);
        }
    },
    userPlacedOrders:false,
    getOrders:async () => {
    try {
        const res = await axiosInstance.post('/shop/orders')
        set({userPlacedOrders:res.data.orders})
    } catch (error) {
        console.log("error in place order",error);
    }    
    },
    wishlist:false,
    addToWishlist:async(data)=>{
        try {
            const res = await axiosInstance.post('/admin/add-item-wishlist/:productId',data)
            set({wishlist:res.data.item})
        } catch (error) {
            console.log("error in add to wishlist",error);
         }    
    },
    removeFromWishlist:async () => {
        try {
            await axiosInstance.delete('/admin/wishlist/:productId')
        } catch (error) {
         console.log("error in remove from wishlist",error);
        }    
    },
    reviews:false,
    addReview:async (data) => {
       try {
         const res = await axiosInstance.post('/admin/review/:productId',data)
         set({reviews:res.data.review})
       } catch (error) {
        console.log("error in add review",error);
        }    
    },
    deleteReview:async () => {
        try {
            await axiosInstance.delete('/admin/review/:productId')
        } catch (error) {
            console.log("error in delete review",error);
            
        }
    }
}))