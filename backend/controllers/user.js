// Import auth from firebase-config.js for authentication
import auth from "../config/firebase-config.js";

// Function to get all users
export const getAllUsers = async (req, res) => {
  // Define the maximum number of results
  const maxResults = 10;
  // Initialize an empty array to store user data
  let users = [];

  try {
    // Retrieve a list of user records from Firebase authentication
    const userRecords = await auth.listUsers(maxResults);

    // Loop through each user record
    userRecords.users.forEach((user) => {
      // Extract necessary user data
      const { uid, email, displayName, photoURL } = user.toJSON();
      // Push user data to the users array
      users.push({ uid, email, displayName, photoURL });
    });

    // Send the users data as a JSON response with status 200 (OK)
    res.status(200).json(users);
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Send an error response with status 500 (Internal Server Error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get a specific user
export const getUser = async (req, res) => {
  try {
    // Retrieve the user record based on the provided user ID
    const userRecord = await auth.getUser(req.params.userId);

    // Extract necessary user data
    const { uid, email, displayName, photoURL } = userRecord.toJSON();

    // Send the user data as a JSON response with status 200 (OK)
    res.status(200).json({ uid, email, displayName, photoURL });
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Check if the error is related to user not found
    if (error.code === "auth/user-not-found") {
      // Send a 404 (Not Found) response with a specific error message
      res.status(404).json({ message: "User not found" });
    } else {
      // Send an error response with status 500 (Internal Server Error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
