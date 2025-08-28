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
    login: async(data)=>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data});
            toast.success("Logged in successfully");
        }
        catch(error){
            toast.error(error.response?.data?.error || "Something went wrong");
        }
        finally{
            set({isLoggingIn:false});
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
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data, {
            headers: { "Content-Type": "application/json" },
            maxBodyLength: Infinity,
          });
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          const message = error.response?.data?.error || error.message || "Failed to update profile";
          toast.error(message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },    
}))