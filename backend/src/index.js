import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
connectDB();
}) 