import axios from "axios";
import auth from "../config/firebase";
import { io } from "socket.io-client";

const baseURL = "https://chat-app-backend-so3s.onrender.com/api";
let socket;

// Function to retrieve user token
const getUserToken = async () => {
  const user = auth.currentUser;
  if (!user) return null; // Handle case when user is not logged in
  try {
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error retrieving user token:", error);
    return null;
  }
};

// Function to initiate socket connection
export const initiateSocketConnection = async () => {
  const token = await getUserToken();
  if (!token) return null; // Handle case when user token is not available

  try {
    socket = io("https://chat-app-backend-so3s.onrender.com/", {
      auth: { token },
    });

    // Listen for messages from the server
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    return socket;
  } catch (error) {
    console.error("Error initiating socket connection:", error);
    return null;
  }
};

// Function to create request header with authorization token
const createHeader = async () => {
  const token = await getUserToken();
  if (!token) return null; // Handle case when user token is not available

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// Function to handle axios API calls with error handling
const handleAxiosRequest = async (requestPromise) => {
  try {
    const res = await requestPromise;
    return res.data;
  } catch (error) {
    console.error("Axios request error:", error);
    return null;
  }
};

// API function to get all users
export const getAllUsers = async () => {
  const header = await createHeader();
  if (!header) return null;

  return handleAxiosRequest(axios.get(`${baseURL}/user`, header));
};

// API function to get user by ID
export const getUser = async (userId) => {
  const header = await createHeader();
  if (!header) return null;

  return handleAxiosRequest(axios.get(`${baseURL}/user/${userId}`, header));
};

// API function to get chat rooms of a user
export const getChatRooms = async (userId) => {
  const header = await createHeader();
  if (!header) return null;

  return handleAxiosRequest(axios.get(`${baseURL}/room/${userId}`, header));
};

// API function to get chat room between two users
export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
  const header = await createHeader();
  if (!header) return null;

  const url = `${baseURL}/room/${firstUserId}/${secondUserId}`;
  return handleAxiosRequest(axios.get(url, header));
};

// API function to create a new chat room
export const createChatRoom = async (members) => {
  const header = await createHeader();
  if (!header) return null;

  return handleAxiosRequest(axios.post(`${baseURL}/room`, members, header));
};

// API function to get messages of a chat room
export const getMessagesOfChatRoom = async (chatRoomId) => {
  const header = await createHeader();
  if (!header) return null;

  return handleAxiosRequest(
    axios.get(`${baseURL}/message/${chatRoomId}`, header)
  );
};

// API function to send a message to a chat room
export const sendMessage = async (messageBody) => {
  const header = await createHeader();
  if (!header) return null;

  return handleAxiosRequest(axios.post(`${baseURL}/message`, messageBody, header));
};
