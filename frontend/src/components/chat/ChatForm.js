import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import Picker from "emoji-picker-react";

export default function ChatForm(props) {
  const [message, setMessage] = useState(""); // State for the message input
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for showing/hiding the emoji picker
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [placeholder] = useState("Write a message"); // Placeholder for the message input

  const scrollRef = useRef(); // Reference for scrolling to the bottom of the chat form

  // Effect to scroll to the bottom of the chat form when the emoji picker is shown/hidden
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showEmojiPicker]);

  // Handler for emoji click in the emoji picker
  const handleEmojiClick = (event, emojiObject) => {
    // Append the clicked emoji to the current message
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  // Handler for form submission
  const handleFormSubmit = async (e) => {
    if (e.key === "Enter") {
      // Prevent default form submission behavior
      e.preventDefault();

      // Check if the message is not empty
      if (message.trim() === "") {
        // If the message is empty, set an error message
        setErrorMessage("Please enter a message.");

        // After 2 seconds, clear the error message
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);

        return; // Stop further execution
      }

      try {
        // Call the handleFormSubmit function passed as a prop with the current message
        await props.handleFormSubmit(message);
        // Clear the message input after submission
        setMessage("");
      } catch (error) {
        console.error("Error submitting message:", error);
        // Optionally, you can handle error display or logging here
      }
    }
  };

  return (
    <div ref={scrollRef}>
      {/* Render the emoji picker when showEmojiPicker state is true */}
      {showEmojiPicker && (
        <Picker className="dark:bg-gray-900" onEmojiClick={handleEmojiClick} />
      )}
      {/* Render the message input form */}
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          {/* Button to toggle emoji picker visibility */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <EmojiHappyIcon
              className="h-9 w-7 text-blue-600 dark:text-blue-500"
              aria-hidden="true"
            />
          </button>
          {/* Message input field */}
          <input
            type="text"
            placeholder={placeholder}
            className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleFormSubmit}
          />
          {/* Display error message in bold color */}
          <div className="text-red-600 font-bold">{errorMessage}</div>
          {/* Submit button */}
          <button type="submit">
            <PaperAirplaneIcon
              className="h-6 w-6 text-blue-600 dark:text-blue-500 rotate-[90deg]"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
