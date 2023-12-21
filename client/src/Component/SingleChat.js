import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ProfileModal } from "./Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./Miscellaneous/UpdateGroupChatModal";

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { user, selectedChat, setSelectedChat } = ChatState();

  // console.log('selected',selectedChat)
  const userDetailsModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //function to open update modal
  const updateModelOpen=()=>{
    setIsUpdateModalOpen(true);
  }
  const closeUpdateModal=()=>{
    setIsUpdateModalOpen(false);
  }
  return (
    <>
      {selectedChat ? (
        <>
          <div className="w-full font-sans flex justify-between items-center p-2">
            {/**this should only appear in small screen */}
            <BsArrowLeft onClick={() => setSelectedChat("")} />
            {!selectedChat.isGroupChat ? (
              <>
                <div className="sticky">
                  {getSender(user, selectedChat.users)}
                  <button
                    className="w-fit h-fit bg-gray-200 rounded-md px-2 py-1"
                    onClick={userDetailsModal}
                  >
                    <BsEye className="font-semibold text-gray-900" />
                  </button>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                    closeModal={closeModal}
                    isModalOpen={isModalOpen}
                  />
                </div>
                <div className="w-full h-full flex flex-col justify-end bg-['#E8E8E8'] mt-2 overflow-y-hidden">
                  {/* Message Here*/}
                </div>
              </>
            ) : (
              <div className="flex gap-2 items-center">
                {selectedChat.chatName.toUpperCase()}
                <button
                    className="w-fit h-fit bg-gray-200 rounded-md px-2 py-1"
                    onClick={updateModelOpen}
                  >
                    <BsEye className="font-semibold text-gray-900" />
                  </button>
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  closeModal={closeUpdateModal}
                  isModalOpen={isUpdateModalOpen}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-full max-h-full bg-white flex items-center justify-center">
            <p className="text-3xl pb-3 font-sans text-gray-500">
              Click on a user to start chatting
            </p>
          </div>
        </>
      )}
    </>
  );
};
