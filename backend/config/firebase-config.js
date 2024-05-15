// Import necessary modules
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Check if SERVICE_ACCOUNT_KEY is defined in the environment
if (!process.env.SERVICE_ACCOUNT_KEY) {
  // If not defined, log an error message and exit the process with an error code
  console.error("SERVICE_ACCOUNT_KEY is not defined in the environment.");
  process.exit(1);
}

// Parse the JSON string from the environment variable SERVICE_ACCOUNT_KEY
let serviceAccountKey;
try {
  serviceAccountKey = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
} catch (error) {
  // If an error occurs during parsing, log an error message and exit the process with an error code
  console.error("Error parsing SERVICE_ACCOUNT_KEY:", error.message);
  process.exit(1);
}

// Initialize the Firebase app with the parsed service account key
const app = initializeApp({
  credential: cert(serviceAccountKey),
});

// Get the authentication object from the initialized app
const auth = getAuth(app);

// Export the authentication object for use in other modules
export default auth;
