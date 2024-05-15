import React from "react";
import { generateAvatar } from "../../utils/GenerateAvatar";

export default function UserLayout({ user, onlineUsersId }) {
  const displayName = user.displayName || "User";

  // Handle image load error
  const handleImageError = () => {
    console.error("Error loading avatar:", user.photoURL);
  };

  // Function to get user avatar
  const getUserAvatar = () => {
    // Check if user has a photoURL
    if (user.photoURL) {
      return user.photoURL; // Return user's photoURL
    } else {
      // If user doesn't have a photoURL, check if they have already selected an avatar
      if (user.selectedAvatar) {
        return user.selectedAvatar; // Return the selected avatar
      } else {
        // If user hasn't selected an avatar, generate a random one
        const avatars = generateAvatar();
        return avatars[0]; // Return the first generated avatar
      }
    }
  };

  return (
    <div className="relative flex items-center">
      <img
        className="w-10 h-10 rounded-full"
        src={getUserAvatar()}
        alt="User"
        onError={handleImageError}
      />
      <span className="block ml-2 text-gray-500 dark:text-gray-400">
        {displayName}
      </span>
      {onlineUsersId?.includes(user?.uid) ? (
        <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-500 dark:bg-green-400 border-2 border-white rounded-full"></span>
      ) : (
        <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
}
