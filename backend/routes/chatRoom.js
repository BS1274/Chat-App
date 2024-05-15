// Import Express to create router
import express from "express";

// Import controller functions for handling chat rooms
import {
  createChatRoom,
  getChatRoomOfUser,
  getChatRoomOfUsers,
} from "../controllers/chatRoom.js";

// Create an instance of Express router
const router = express.Router();

// Define routes for handling chat rooms
router.post("/", createChatRoom); // Route for creating a new chat room
router.get("/:userId", getChatRoomOfUser); // Route for retrieving chat room of a user
router.get("/:firstUserId/:secondUserId", getChatRoomOfUsers); // Route for retrieving chat room of two users

// Export the router for use in other modules
export default router;
