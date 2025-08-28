import {Server} from "socket.io"
import http from "http"; //builtin hota hai node mai
import express from "express";


const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        credentials: true,
    },
});

const connectedUsers = new Map();

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);

    // Get userId from query params
    const userId = socket.handshake.query.userId;
    if (userId) {
        connectedUsers.set(userId, socket.id);
        console.log(`User ${userId} connected with socket ${socket.id}`);
        
        // Send online users list to all connected clients
        io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));
    }

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        
        // Remove user from connected users
        for (const [userId, socketId] of connectedUsers.entries()) {
            if (socketId === socket.id) {
                connectedUsers.delete(userId);
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
        
        // Send updated online users list
        io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));
    });

    socket.on("sendMessage", (messageData) => {
        const { receiverId, message } = messageData;
        
        // Find receiver's socket
        const receiverSocketId = connectedUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
        }
    });
})

export {io,app,server};