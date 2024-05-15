// Import Express to create router
import express from "express";

// Import controller functions for handling user-related operations
import { getAllUsers, getUser } from "../controllers/user.js";

// Create an instance of Express router
const router = express.Router();

// Define routes for handling user-related operations
router.get("/", getAllUsers); // Route for getting all users
router.get("/:userId", getUser); // Route for getting a specific user by ID

// Export the router for use in other modules
export default router;
