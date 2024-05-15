import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  // Using React's useState and useEffect hooks
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, login } = useAuth();

  // useEffect to redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Function to handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      setError(""); // Clear previous errors
      setLoading(true); // Set loading state while logging in
      await login(email, password); // Call login function with email and password
      navigate("/"); // Redirect to home page on successful login
    } catch (error) {
      console.error("Login Error:", error); // Log the error to the console

      // Handle different types of authentication errors
      if (error.code === "auth/wrong-password") {
        setError("Invalid password");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("Failed to login");
      }
    }

    setLoading(false); // Set loading state back to false after login attempt
  }

  // Render the login form
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10">
        <div>
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-9" onSubmit={handleFormSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-8 py-3 placeholder-gray-700 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-8 py-3 placeholder-gray-700 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-md">
              <Link
                to="/register"
                className="text-blue-700 hover:underline dark:text-blue-100"
              >
                Don't have an account ? Register from here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
