import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"

export const useChatBotStore = create((set)=>({
    response:false,
    aiResponse: async (data) => {
        try {
            const res = await axiosInstance.post('/ai/chat',data)
            set({response:res.data.reply})
        } catch (error) {
            console.log('error in ai response',error);
        }

    }
}))