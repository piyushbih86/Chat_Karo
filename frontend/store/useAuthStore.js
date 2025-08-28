import {create} from "zustand"
import { axiosInstance } from "../src/lib/axios"

export const useAuthStore=create((set)=>({
    authUser:null,
    isSigninUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth: async()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data, isCheckingAuth:false});
        }
        catch(error){
            set({authUser:null, isCheckingAuth:false});
            console.log("error in checkauth frontend" ,error);
        }
    }
}))