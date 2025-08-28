import {create} from "zustand"
import { axiosInstance } from "../src/lib/axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
            set({ authUser: null, isCheckingAuth: false });
            console.log("error in checkauth frontend", error);
        }
    },
    
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        }
        catch(error){
            console.log("Error in logout frontend:", error);
            toast.error("Something went wrong");
        }
    }
}))