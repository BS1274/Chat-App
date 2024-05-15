import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { generateAvatar } from "../../utils/GenerateAvatar.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, updateUserProfile, setError } = useAuth();

  // States for user input and loading
  const [username, setUsername] = useState(currentUser.displayName || "");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Placeholder URL for the default avatar
  const defaultAvatar = "https://via.placeholder.com/150";

  // Fetch avatars and handle errors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await generateAvatar();
        setAvatars(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching avatars:", error);
        setError("Failed to fetch avatars");
        setLoading(false);
      }
    };

    fetchData();
  }, [setError]);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedAvatar === null) {
      return setError("Please select an avatar");
    }

    try {
      setError("");
      setLoading(true);
      const updatedUser = { ...currentUser, displayName: username };
      const profile = {
        displayName: username,
        photoURL: avatars[selectedAvatar],
      };
      await updateUserProfile(updatedUser, profile);
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Pick Profile Image
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-wrap -m-1 md:-m-2">
              {(avatars.length > 0 ? avatars : Array(6).fill(defaultAvatar)).map((avatar, index) => (
                <div key={index} className="flex flex-wrap w-1/3">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      className={classNames(
                        selectedAvatar === index
                          ? "border-4  border-blue-700 dark:border-blue-700"
                          : "cursor-pointer hover:border-4 hover:border-blue-700",
                        "block object-cover object-center w-36 h-36 rounded-full"
                      )}
                      src={avatar}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* User Name Input */}
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-800 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter a User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Profile and Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
