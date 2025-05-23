import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
// import toast from "react-hot-toast";

export const useAdminStore = create((set)=>({
    productsAvailable:false,
    products:false,
    getProducts:async (data)=>{
        set({productsAvailable:true})
        try {
            const res = await axiosInstance.get('/admin/',data)
            set({products:res.data.products})
        } catch (error) {
            console.log("Error in get product:",error );
        }finally{
            set({productsAvailable:false})
        }
    },
    addProduct:async (data)=>{
        try {
            await axiosInstance.post('/admin/add-product',data)
        } catch (error) {
            console.log("Error in get product:",error );
        }
    },
    // product:false,
    // specificProduct:async (data)=>{
    //     set({productsAvailable:true})
    //     try {
    //         const res = await axiosInstance.get('/admin/edit-product/:productId',data)
    //         set({product:res.data})
    //     } catch (error) {
    //         console.log("Error in get product:",error );
    //     }finally{
    //         set({productsAvailable:false})
    //     }
    // },
    productUpdating:false,
    productUpdated:false,
    updateSpecificProduct:async (data)=>{
        set({productUpdating:true})
        try {
            const res = await axiosInstance.put('/admin/edit-product/:productId',data)
            set({productUpdated:res.data})
        } catch (error) {
            console.log("Error in get product:",error );
        }finally{
            set({productUpdating:false})
        }
    },
    deleteProduct: async (data) => {
        try {
            await axiosInstance.delete('/admin/:productId',data)
        } catch (error) {
            console.log("Error in get product:",error );
        }
    }
}))