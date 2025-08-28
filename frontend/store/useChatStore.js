import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../src/lib/axios"
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected");
      return;
    }
    try {
      await axiosInstance.post(`/messages/send/${ selectedUser._id}`, messageData);
      // Don't add message here - let the socket event handle it
      // This prevents duplicate messages
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { authUser } = useAuthStore.getState();
      
      // Check if this message is for the current conversation
      const isMessageForCurrentConversation = 
        (newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser._id) ||
        (newMessage.senderId === authUser._id && newMessage.receiverId === selectedUser._id);
      
      if (isMessageForCurrentConversation) {
        const currentMessages = get().messages;
        // Check if message already exists to prevent duplicates
        const messageExists = currentMessages.some(msg => msg._id === newMessage._id);
        
        if (!messageExists) {
          set({
            messages: [...currentMessages, newMessage],
          });
        }
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    
    socket.off("newMessage");
  },
 
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));