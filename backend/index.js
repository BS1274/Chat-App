// Import necessary modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";

// Import MongoDB configuration
import "./config/mongo.js";

// Import middleware for token verification
import { VerifyToken, VerifySocketToken } from "./middlewares/VerifyToken.js";

// Import routes
import chatRoomRoutes from "./routes/chatRoom.js";
import chatMessageRoutes from "./routes/chatMessage.js";
import userRoutes from "./routes/user.js";

// Load environment variables
dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Middleware for token verification in HTTP requests
app.use(VerifyToken);

// Port configuration
const PORT = process.env.PORT;

// Define routes for chat room, chat message, and user
app.use("/api/room", chatRoomRoutes);
app.use("/api/message", chatMessageRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB
mongoose.connection.on("connected", () => {
  console.log('Connected to MongoDB');
  
  // Start the server
  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
  // Set up Socket.IO server
  const io = new Server(server, {
    cors: {
      origin: "https://chat-app-backend-so3s.onrender.com/",
      credentials: true,
    },
  });
  
  // Middleware for token verification in WebSocket connections
  io.use(VerifySocketToken);
  
  // Initialize online users map
  global.onlineUsers = new Map();
  
  // Function to get key from value in a map
  const getKey = (map, val) => {
    for (let [key, value] of map.entries()) {
      if (value === val) return key;
    }
  };
  
  // Socket.IO event handlers
  io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
      global.onlineUsers.set(userId, socket.id);
      socket.emit("getUsers", Array.from(global.onlineUsers));
    });
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const sendUserSocket = global.onlineUsers.get(receiverId);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("getMessage", {
          senderId,
          message,
        });
      }
    });
    socket.on("disconnect", () => {
      global.onlineUsers.delete(getKey(global.onlineUsers, socket.id));
      io.emit("getUsers", Array.from(global.onlineUsers));
    });
  });
});

// MongoDB event handlers
mongoose.connection.on("reconnected", () => {
  console.log('MongoDB reconnected');
});

mongoose.connection.on("error", (error) => {
  console.error('Error connecting to MongoDB:', error);
  mongoose.disconnect();
});

mongoose.connection.on("disconnected", () => {
  console.log('MongoDB disconnected');
});

// Check if there is already a mongoose connection
if (mongoose.connection.readyState === 0) {
  // If not connected, establish a new connection
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error);
    });
} else {
  // If mongoose connection is already established, log a message
  console.log('Mongoose connection already established');
}
