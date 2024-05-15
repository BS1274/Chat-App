// Import Express to create router
import express from "express";

// Import controller functions for handling chat messages
import { createMessage, getMessages } from "../controllers/chatMessage.js";

// Create an instance of Express router
const router = express.Router();

// Define routes for handling chat messages
router.post("/", createMessage); // Route for creating a new message
router.get("/:chatRoomId", getMessages); // Route for retrieving messages of a chat room

// Export the router for use in other modules
export default router;
