import React, { useState, useEffect } from "react";
import { getUser } from "../../services/ChatService";
import UserLayout from "../layouts/UserLayout";

export default function Contact({ chatRoom, onlineUsersId, currentUser }) {
  const [contact, setContact] = useState(null); // State for storing contact information
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactId = chatRoom.members?.find(member => member !== currentUser.uid);
        if (contactId) {
          const res = await getUser(contactId);
          setContact(res);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        setError("Error fetching contact");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setContact(null);
    };
  }, [chatRoom, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contact) {
    return null;
  }

  const { displayName } = contact;

  return (
    <UserLayout
      user={contact}
      onlineUsersId={onlineUsersId}
      userName={displayName} // Corrected prop name to match what UserLayout expects
    />
  );
}
