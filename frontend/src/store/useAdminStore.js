import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
// import toast from "react-hot-toast";

export const useAdminStore = create((set)=>({
    productsAvailable:false,
    products:false,
    getProducts:async (page)=>{
        set({productsAvailable:true})
        try {
            const res = await axiosInstance.get(`/admin?page=${page}&limit=3`) 
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
    yourProduct:false,
    specificProduct:async (productId)=>{
        set({productsAvailable:true})
        try {
            const res = await axiosInstance.get(`/admin/edit-product/${productId}`)
            set({yourProduct:res.data})
        } catch (error) {
            console.log("Error in get product:",error );
        }finally{
            set({productsAvailable:false})
        }
    },
    productUpdating:false,
    productUpdated:false,
    updateSpecificProduct:async (productId,data)=>{
        set({productUpdating:true})
        try {
            const res = await axiosInstance.put(`/admin/edit-product/${productId}`,{updates:data})
            set({productUpdated:res.data, yourProduct:res.data}) //update the current product
        } catch (error) {
            console.log("Error in get product:",error );
        }finally{
            set({productUpdating:false})
        }
    },
    deleteProduct: async (productId) => {
        try {
            await axiosInstance.delete(`/admin/${productId}`)
        } catch (error) {
            console.log("Error in get product:",error );
        }
    },
    bulkedResults:false,
    bulkResults: async(filter)=>{
         try {
            const res = await axiosInstance.get(`/admin/search?filter=${filter}`)
            set({bulkedResults:res.data.products})
        } catch (error) {
            console.log("Error in get product:",error );
        }
    }
}))