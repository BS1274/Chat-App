import ChatMessage from "../models/ChatMessage.js";
import { createServer } from 'http'; // Import createServer function from http module
import { Server } from 'socket.io'; // Import Server class from socket.io module

// Create a new HTTP server
const httpServer = createServer();

// Create a Socket.IO server and attach it to the HTTP server
const io = new Server(httpServer);

// Controller function to create a new message
export const createMessage = async (req, res) => {
  const newMessage = new ChatMessage(req.body);

  try {
    // Save the new message to the database
    await newMessage.save();

    // Emit the new message event to all connected Socket.IO clients
    io.emit('newMessage', newMessage);

    // Send a JSON response with status 201 (Created) and the new message data
    res.status(201).json(newMessage);
  } catch (error) {
    // If an error occurs during saving, send a JSON response with status 409 (Conflict) and the error message
    res.status(409).json({
      message: error.message,
    });
  }
};

// Controller function to get messages for a specific chat room
export const getMessages = async (req, res) => {
  try {
    // Find messages in the database that belong to the specified chat room ID
    const messages = await ChatMessage.find({
      chatRoomId: req.params.chatRoomId,
    });
    // Send a JSON response with status 200 (OK) and the retrieved messages
    res.status(200).json(messages);
  } catch (error) {
    // If an error occurs during retrieval, send a JSON response with status 409 (Conflict) and the error message
    res.status(409).json({
      message: error.message,
    });
  }
};

// // Attach the Socket.IO server to the HTTP server and start listening
// const PORT = process.env.PORT || 3001;
// httpServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
