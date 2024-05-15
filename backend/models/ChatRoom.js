// Import mongoose for MongoDB interaction
import mongoose from "mongoose";

// Define the schema for ChatRoom collection
const ChatRoomSchema = mongoose.Schema(
  {
    members: Array, // Define field for members which stores an array of member IDs
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

// Create ChatRoom model using the defined schema
const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

// Export the ChatRoom model for use in other modules
export default ChatRoom;
