import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../config/firebase";

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use authentication context
export function useAuth() {
  return useContext(AuthContext);
}

// Authentication provider component
export function AuthProvider({ children }) {
  // States for current user, loading state, and error
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to register a new user
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Function to log in an existing user
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function to log out the current user
  function logout() {
    return signOut(auth);
  }

 // Function to update user profile
function updateUserProfile(profile) {
  if (currentUser) {
    return updateProfile(currentUser, profile);
  } else {
    return Promise.reject(new Error("No user logged in"));
  }
}

  // Effect to set up authentication state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  
    // Cleanup function
    return () => unsubscribe();
  }, []);
  

  // Authentication context value
  const value = {
    currentUser,
    error,
    setError,
    login,
    register,
    logout,
    updateUserProfile,
  };

  // Provide the authentication context value to the entire app
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
