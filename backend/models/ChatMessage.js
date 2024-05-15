// Import mongoose for MongoDB interaction
import mongoose from "mongoose";

// Define the schema for ChatMessage collection
const ChatMessageSchema = mongoose.Schema(
  {
    chatRoomId: String, // Define field for chat room ID
    sender: String, // Define field for sender's name
    message: String, // Define field for message content
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

// Create ChatMessage model using the defined schema
const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

// Export the ChatMessage model for use in other modules
export default ChatMessage;
