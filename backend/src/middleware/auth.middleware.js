import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute=async (req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({ error: "Not authorized, token missing" });
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.userId).select("-password");
        if(!req.user){
            return res.status(401).json({ error: "Not authorized, user not found" });
        }
        next();
    }
    catch(error){
        console.log("Error in protectRoute middleware:", error.message);
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
}