import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import {toast} from "react-hot-toast";


// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/"

export const useAuthStore = create((set)=>({
    authUser:true,// all of them are loading states
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:true,
    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth:",error );
            
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async (data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in signup", error);
        } finally{
            set({isSigningUp:false})
        }
    },
    logout: async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success('Logged out Successfully')
        } catch (err) {
            toast.error("Something Went Wrong",err.response.data.message)
        }
    },
    login: async (data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data})
        } catch (err) {
            toast.error("Error in login",err)
        } finally{
            set({isLoggingIn:false})
        }
    },
    deleteProfile: async (data)=>{
        try {
            await axiosInstance.delete('/auth/delete-profile',data);
        } catch (error) {
            console.log("Error in delete Profile",error);
            toast.error(error.response.data.message)
            
        }
    }
}))