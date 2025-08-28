import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
     const {fullName,email,password}=req.body;
    try{
        // Input validation
        if(!fullName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if(password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({ error: "Email already exists" });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            email,
            password: hashedPassword
        });

        try {
            await newUser.save();
            // Generate token after successful save
            await generateToken(newUser._id,res);
            
            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
                createdAt:newUser.createdAt,
                updatedAt:newUser.updatedAt
            });
        } catch (saveError) {
            return res.status(400).json({ error: "Error creating user" });
        }
    }catch(error){
        console.log("Error in signup controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const {email,password}=req.body;
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!email || !password){
            return res.status(400).json({ error: "All fields are required" });
        }
        if(!user){
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ error: "Invalid email or password" });
        }
        generateToken(user._id,res);
        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt
        });
    }
    catch(error){
        console.log("Error in login controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try{
       res.cookie("jwt","",{maxAge:0})
       res.status(200).json({ message: "Logged out successfully" });
    }
    catch(error){
        console.log("Error in logout controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateProfile=async (req,res)=>{
    try{
        const {profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(400).json({ error: "Profile picture data is required" });
        }
        if(typeof profilePic !== "string" || !profilePic.startsWith("data:image/")){
            return res.status(400).json({ error: "Invalid image data format" });
        }

        // Ensure Cloudinary is configured
        if(!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET){
            return res.status(500).json({ error: "Cloudinary environment variables are not configured" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "chatkaro",
            resource_type: "image",
        });
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        return res.status(200).json(updatedUser);
    }
    catch(error){
        const details = error?.error || error?.message || "Unknown error";
        console.log("Error in updateProfile controller:", details);
        return res.status(500).json({ error: details });
    }
}

export const checkAuth = (req, res) => {
    try {
        if (req.user) {
            return res.status(200).json({
                _id: req.user._id,
                fullName: req.user.fullName,
                email: req.user.email,
                profilePic: req.user.profilePic,
                createdAt: req.user.createdAt,
                updatedAt: req.user.updatedAt
            });
        } else {
            return res.status(401).json({ error: "Not authorized" });
        }
    } catch (error) {
        console.log("Error in checkAuth controller:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}