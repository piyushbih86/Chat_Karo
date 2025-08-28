import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();

// Enable CORS before any body parsing so preflight/error responses include CORS headers
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Increase payload limits for base64 image uploads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
connectDB();
}) 