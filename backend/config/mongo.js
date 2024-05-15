// Import necessary modules
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define the database name
const DATABASE_NAME = "chat_app";

// Append the database name to the MongoDB URI
const MONGODB_URI = `${process.env.MONGODB_URI}/${DATABASE_NAME}`;

// Check if there is already a mongoose connection
if (mongoose.connection.readyState === 0) {
  // If not connected, establish a new connection
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      // Log successful connection to the database
      console.log(`Mongo has connected successfully to ${DATABASE_NAME} database`);
    })
    .catch((error) => {
      // Log any errors that occur during connection
      console.error('Error connecting to MongoDB:', error);
    });

  // Event listener for reconnection
  mongoose.connection.on("reconnected", () => {
    console.log(`Mongo has reconnected to ${DATABASE_NAME} database`);
  });

  // Event listener for connection errors
  mongoose.connection.on("error", (error) => {
    console.log(`Mongo connection has an error: ${error}`);
    // If there's an error, disconnect from the database
    mongoose.disconnect();
  });

  // Event listener for disconnection
  mongoose.connection.on("disconnected", () => {
    console.log(`Mongo connection is disconnected from ${DATABASE_NAME} database`);
  });
} else {
  // If mongoose connection is already established, log a message
  console.log('Mongoose connection already established');
}
