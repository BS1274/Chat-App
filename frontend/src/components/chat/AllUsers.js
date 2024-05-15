import { useState, useEffect } from "react";
import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

// Utility function to generate CSS class names
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);

  // Effect to update contact IDs when chat rooms change
  useEffect(() => {
    if (chatRooms) {
      const Ids = chatRooms.map((chatRoom) => {
        // Find the member who is not the current user
        return chatRoom.members.find((member) => member !== currentUser.uid);
      });
      setContactIds(Ids);
    }
  }, [chatRooms, currentUser.uid]);

  // Effect to update non-contacts when users or contact IDs change
  useEffect(() => {
    if (users && currentUser.uid && contactIds) {
      // Filter users who are not the current user and not in contact IDs
      const filteredUsers = users.filter(
        (user) => user.uid !== currentUser.uid && !contactIds.includes(user.uid)
      );
      setNonContacts(filteredUsers);
    }
  }, [users, currentUser.uid, contactIds]);

  // Function to change the current chat
  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  // Function to handle creating a new chat room
  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser.uid,
      receiverId: user.uid,
    };
    const newChatRoom = await createChatRoom(members);
    // Update chat rooms and change current chat
    setChatRooms((prevChatRooms) => [...prevChatRooms, newChatRoom]);
    changeChat(newChatRoom);
  };

  return (
    <>
      <ul className="overflow-auto h-[26rem] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {/* Section for displaying existing chats */}
        <h2 className="my-2 mb-2 ml-4 text-gray-900 dark:text-white">Your Chats</h2>
        <li>
          {chatRooms &&
            chatRooms.map((chatRoom, index) => (
              <div
                key={index}
                className={classNames(
                  index === selectedChat
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                  "flex items-center px-5 py-3 text-md "
                )}
                onClick={() => changeCurrentChat(index, chatRoom)}
              >  
              {/* Your Chats */}
                <Contact
                  chatRoom={chatRoom}
                  onlineUsersId={onlineUsersId}
                  currentUser={currentUser}
                />
              </div>
            ))}
        </li>
        {/* Section for displaying non-contacts */}
        <h2 className="my-6 mb-2 ml-4 text-gray-900 dark:text-white">
          All Users
        </h2>
        <li>
          {/* All users */}
          {nonContacts &&
            nonContacts.map((nonContact, index) => (
              <div
                key={index}
                className="flex items-center px-5 py-2 text-md bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNewChatRoom(nonContact)}
              >
                <UserLayout 
                  user={nonContact} 
                  displayName={nonContact.displayName} 
                  onlineUsersId={onlineUsersId} 
                  avatar={nonContact.photoURL || "default-avatar-url"} // Use nonContact.photoURL if available, otherwise use a default avatar URL
                />
              </div>
            ))}
        </li>
      </ul>
    </>
  );
}
