import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"

export const useChatBotStore = create((set)=>({
    response:false,
    loading:false,
    aiResponse: async (data) => {
        try {
            set({ loading: true});
            const res = await axiosInstance.post('/ai/chat',{message:data})
            set({response:res.data.reply})
        } catch (error) {
            console.log('error in ai response',error);
        }finally{
            set({loading:false})
        }

    }
}))