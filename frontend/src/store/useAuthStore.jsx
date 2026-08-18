import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create((set) => ({
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  authUser: null,
  isCheckingAuth: true,
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const result = await axiosInstance.post("/auth/register", data);
      set({ authUser: result.data });
      return {success: true , error: null};
    } catch (error) {
      const message = error.response?.data?.error || error;
       return {success: false, error: message};
    } finally {
      set({ isSigningUp: false });
    }
  },
  checkAuth: async () => {
    try {
      const result = await axiosInstance.get("/auth/check");
      set({authUser : result.data});
      return true;
    } catch (error) {
      console.log(error);
    
      set({authUser : null, });
      return false;
    }finally{
      set({isCheckingAuth: false});
    }
  },
  login : async (data)=> {
    set({ isLoggingIn: true });
    try {
      const result = await axiosInstance.post("/auth/login", data);
      set({ authUser: result.data });
      return { success: true, error: null };
    } catch (error) {
      const message =
        error.response?.data?.error || "An error occurred while logging in.";
      console.error(message);
      return { success: false, error: message };
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout : async ()=>{
    try{
        const result = await axiosInstance.post("/auth/logout");
        set({authUser : null});
        return true;
    }
     catch(error){
      console.log(error);
      return false;
    }
  },
  updateProfile: async (data) => {
    set({isUpdatingProfile: true});
    try{
      const result = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: result.data });
      return { success: true, profilePicture: result.data.profilePicture };

    }catch(error){
        const message = error.response?.data?.error || "Profile update failed";
        console.log(message);
        return { success: false, error: message };
    }
    finally{
      set({isUpdatingProfile: false});
    }
  },
 getUserInfo: async() =>{
   try{
    const result = await axiosInstance.get("/auth/check");
    set({ authUser: result.data });
    return {
      success: true,
      fullname: result.data.fullname,
      email: result.data.email,
      profilePicture: result.data.profilePicture,
      createdAt: result.data.createdAt,
    };
   }catch(error){
     console.log(error);
     return {
       success: false,
       error: "Failed to fetch user information",
     };
   }finally{
     set({isCheckingAuth: false});
    }
   },
}));
