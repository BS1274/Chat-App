// Import auth from firebase-config.js for authentication
import auth from "../config/firebase-config.js";

// Middleware to verify token in HTTP requests
export const VerifyToken = async (req, res, next) => {
  // Check if the authorization header exists
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Split the authorization header and retrieve the token
  const token = req.headers.authorization.split(" ")[1];

  try {
    // Verify the token using Firebase authentication
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      // If token is valid, set user information in the request object and proceed to next middleware
      req.user = decodeValue;
      return next();
    }
  } catch (e) {
    // If an error occurs during token verification, return an internal error response
    return res.json({ message: "Internal Error" });
  }
};

// Middleware to verify token in WebSocket connections
export const VerifySocketToken = async (socket, next) => {
  // Check if the token exists in the handshake auth
  if (!socket.handshake.auth || !socket.handshake.auth.token) {
    // If token is missing, return an error to the next middleware
    return next(new Error("Authorization token missing"));
  }

  // Retrieve the token from the handshake auth
  const token = socket.handshake.auth.token;

  try {
    // Verify the token using Firebase authentication
    const decodeValue = await auth.verifyIdToken(token);

    if (decodeValue) {
      // If token is valid, set user information in the socket object and proceed to next middleware
      socket.user = decodeValue;
      return next();
    }
  } catch (e) {
    // If an error occurs during token verification, return an internal error to the next middleware
    return next(new Error("Internal Error"));
  }
};
