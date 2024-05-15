import ChatRoom from "../models/ChatRoom.js";
import { Server } from "socket.io";

// Create an instance of the HTTP server
const httpServer = new Server();

// Controller function to create a new chat room
export const createChatRoom = async (req, res) => {
  // Create a new ChatRoom instance with members as senderId and receiverId from request body
  const newChatRoom = new ChatRoom({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    // Save the new chat room to the database
    await newChatRoom.save();
    // Send a JSON response with status 201 (Created) and the new chat room data
    res.status(201).json(newChatRoom);
  } catch (error) {
    // If an error occurs during saving, send a JSON response with status 409 (Conflict) and the error message
    res.status(409).json({
      message: error.message,
    });
  }
};

// Controller function to get a chat room of a user
export const getChatRoomOfUser = async (req, res) => {
  try {
    // Find chat rooms in the database where the specified user ID is a member
    const chatRoom = await ChatRoom.find({
      members: { $in: [req.params.userId] },
    });
    // Send a JSON response with status 200 (OK) and the retrieved chat room(s)
    res.status(200).json(chatRoom);
  } catch (error) {
    // If an error occurs during retrieval, send a JSON response with status 404 (Not Found) and the error message
    res.status(404).json({
      message: error.message,
    });
  }
};

// Controller function to get a chat room of two users
export const getChatRoomOfUsers = async (req, res) => {
  try {
    // Find chat rooms in the database where both specified user IDs are members
    const chatRoom = await ChatRoom.find({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    // Send a JSON response with status 200 (OK) and the retrieved chat room(s)
    res.status(200).json(chatRoom);
  } catch (error) {
    // If an error occurs during retrieval, send a JSON response with status 404 (Not Found) and the error message
    res.status(404).json({
      message: error.message,
    });
  }
};

// Export the io instance for socket.io
export { httpServer as io };
