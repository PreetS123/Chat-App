import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ProfileModal } from "./Miscellaneous/ProfileModal";

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, selectedChat, setSelectedChat } = ChatState();

  //   console.log('selected',selectedChat)
  const userDetailsModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {selectedChat ? (
        <>
          

          <div className="pb-2 px-1 w-full font-sans flex justify-between items-center">
            {/**this should only appear in small screen */}
            <BsArrowLeft onClick={() => setSelectedChat("")} />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <button className="w-fit h-fit bg-gray-200 rounded-md px-2 py-1" onClick={userDetailsModal}>
                  <BsEye className="font-semibold text-gray-900" />
                </button>
                <ProfileModal 
                user={getSenderFull(user, selectedChat.users)} 
                closeModal={closeModal}
                isModalOpen={isModalOpen} />
              </>
            ) : (
              <>{selectedChat.chatName.toUpperCase()}</>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-screen bg-white flex items-center justify-center">
            <p className="text-3xl pb-3 font-sans text-gray-500">
              Click on a user to start chatting
            </p>
          </div>
        </>
      )}
    </>
  );
};
