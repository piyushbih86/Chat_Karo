import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


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

export const login = (req, res) => {
    res.send("login route");
}

export const logout = (req, res) => {
    res.send("logout route");
}