import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { toast } from "react-hot-toast"

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')
      set({ authUser: res.data }) // backend returns the user directly
    } catch (error) {
      console.error("Error in checkAuth:", error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post("/auth/signup", data)
      set({ authUser: res.data.user })
      toast.success('Registered successfully!')
      return true
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed")
      return false
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post("/auth/login", data)
      set({ authUser: res.data.user })
      toast.success('Logged in successfully!')
      return true
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed")
      return false
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout")
      set({ authUser: null })
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error("Logout failed")
      console.error("Logout error:", error)
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