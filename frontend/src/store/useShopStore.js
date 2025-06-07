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
           set({viewingProduct:res.data.product}) // unnecassary state , you can just return the values 
           return res.data.product
        } catch (error) {
            console.log("error in get product",error);
        }
    },
    userCart:false,
    getCart:async () => {
        try {
            const res = await axiosInstance.get('/shop/cart')
            set({userCart:res.data})
        } catch (error) {
            console.log("error in get cart",error);
        }
    },
    // addedTocart:false,
    addToCart:async (productId) => {
        try {
            await axiosInstance.post(`/shop/cart/${productId}`)
            // set({addedTocart:true})
        } catch (error) {
            console.log("error in get cart",error);
        }finally{
            set({addedTocart:false})
        }
    },
    // removedFromCart:false,
    removeFromCart:async (productId) => {
        try {
            await axiosInstance.delete(`/shop/cart-delete-item/${productId}`)
            // set({removedFromCart:true})
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
    itemId:false,
    allWishlists: async () => {
        try {
           const res = await axiosInstance.get('/shop/wishlist/') // array of item ids
            set({itemId:res.data})
        } catch (error) {
            console.log("error in all wishlists",error);
            
        }        
    },
    wishlist:false,
    addToWishlist:async(productId)=>{
        try {
            const res = await axiosInstance.post(`/shop/add-item-wishlist/${productId}`)
            set({wishlist:res.data.item})
        } catch (error) {
            console.log("error in add to wishlist",error);
         }    
    },
    removeFromWishlist:async (productId) => {
        try {
            await axiosInstance.delete(`/shop/wishlist/${productId}`)
        } catch (error) {
         console.log("error in remove from wishlist",error);
        }    
    },
    reviews:false,
    addReview:async (data) => {
       try {
         const res = await axiosInstance.post('/shop/review/:productId',data)
         set({reviews:res.data.review})
       } catch (error) {
        console.log("error in add review",error);
        }    
    },
    deleteReview:async () => {
        try {
            await axiosInstance.delete('/shop/review/:productId')
        } catch (error) {
            console.log("error in delete review",error);
            
        }
    }
}))