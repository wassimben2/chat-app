import {create } from 'zustand'
import {toast} from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js'

export const useChatStore = create((set) => ({
 messages: [],
 users: [],
 selectedUser:null,
 isUsersLoading: false,
 isMessagesLoading: false,

 getUsers : async ()=> {
    set({isUsersLoading: true})
    try{
        const result = await axiosInstance.get('/messages/users')
        if(result.success){
            set({users: result.users})
        }
    }catch(error){
        toast.error(error.message)
    }
    finally{
        set({isUsersLoading: false})
    }
 },
 getMessages : async(userId)=> {
    set({isMessagesLoading: true})
    try{
       const result = await axiosInstance.get(`/messages/${userId}`)
       if(result.success){
           set({messages: result.data})
       }
    }catch(error){
        toast.error(error.message)
    }
    finally{
        set({isMessagesLoading: false})
    }
 },
 setSelectedUser : (selectedUser)=>{
    set({selectedUser})

}
}))
