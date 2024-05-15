import { useState, useEffect, useRef } from "react";
import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatService";
import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";

export default function ChatRoom({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]); // State for storing messages

  const scrollRef = useRef(); // Reference for scrolling to the bottom of the message list

  // Fetch messages when the current chat room changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMessagesOfChatRoom(currentChat._id);
        setMessages(res);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [currentChat._id]);

  // Scroll to the bottom of the message list when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

 // Listen for incoming messages from the socket
useEffect(() => {
  // Create a variable to store the socket reference
  const currentSocket = socket.current;

  // Attach event listener for incoming messages
  currentSocket?.on("getMessage", (incomingMessage) => {
    // Update messages state with the incoming message
    setMessages(prevMessages => [...prevMessages, incomingMessage]);
  });

  // Clean up the event listener when the component unmounts
  return () => {
    currentSocket?.off("getMessage");
  };
}, [socket]);


  // Handle form submission to send a message
  const handleFormSubmit = async (message) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.uid
    );

    // Send message via socket
    socket.current.emit("sendMessage", {
      senderId: currentUser.uid,
      receiverId,
      message,
    });

    // Save message to database
    const messageBody = {
      chatRoomId: currentChat._id,
      sender: currentUser.uid,
      message,
    };

    try {
      const res = await sendMessage(messageBody);
      // Update messages state with the sent message
      setMessages(prevMessages => [...prevMessages, res]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="p-5 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-400">
          <Contact chatRoom={currentChat} currentUser={currentUser} />
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[26rem] bg-white border-b border-gray-200 dark:bg-gray-700 dark:border-gray-100">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <div key={index} ref={index === messages.length - 1 ? scrollRef : null}>
                <Message message={message} self={currentUser.uid} />
              </div>
            ))}
          </ul>
        </div>

        <ChatForm handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
