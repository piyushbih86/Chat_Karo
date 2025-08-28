import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        // Fetch users excluding the logged-in user
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessages=async(req,res)=>{
    const otherUserId=req.params.id;
    const loggedInUserId=req.user._id;
    try {
        // Assuming Message is another model that stores messages between users
        const messages=await Message.find({
            $or:[
                {senderId:loggedInUserId,receiverId:otherUserId},
                {senderId:otherUserId,receiverId:loggedInUserId}
            ]
        }).sort({createdAt:1}); // Sort messages by creation time
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessage=async(req,res)=>{
   try{
    const {text,image}=req.body;
    const senderId=req.user._id;
    const receiverId=req.params.id;
    if(!text && !image){
        return res.status(400).json({ error: "Message cannot be empty" });
    }
    let imageUrl="";
    if(image){
        const uploadResponse=await cloudinary.uploader.upload(image);
        imageUrl=uploadResponse.secure_url;
    }
    const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl
    });
    const savedMessage=await newMessage.save();
    return res.status(201).json(savedMessage);
   }
   catch(error){
         console.log("Error in sendMessage controller:", error.message);
         return res.status(500).json({ error: "Internal Server Error" });
   }
}