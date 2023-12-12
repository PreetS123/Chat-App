import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../config/User";
import { ChatLoading } from "./Miscellaneous/ChatLoading";
import { getSender } from "../config/ChatLogics";
import { GroupChatModal } from "./Miscellaneous/GroupChatModal";
import axios from "axios";

export const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get("http://localhost:5000/api/chat", config)
      .then((res) => {
        // console.log('myChat fetchChatts',res.data)
        setChats(res.data);
      })
      .catch((err) => {
        console.log("error in fetching data in myChat component", err.message);
        return toast.error("Error in fetching data", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const bgChatBox = selectedChat === chats ? "bg-blue-300" : "bg-gray-200";
  useEffect(() => {
    setLoggedUser(getToken());
    fetchChats();
  }, [fetchAgain]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="bg-white rounded-md p-3 w-full">
        <div className="flex justify-between items-center p-2">
          <p className="text-3xl font-light">My Chats</p>
          <GroupChatModal>
            <button className="bg-gray-200 border-none text-gray-900 p-1 rounded-md text-sm ">
              New Group Chat <span className="font-semibold text-lg">+</span>
            </button>
          </GroupChatModal>
        </div>
        <div className="flex flex-col gap-2">
          {chats ? (
            <div className="overflow-y-scroll h-screen scrollbar-hide">
              {chats?.map((el) => {
                return (
                  <div
                    key={el._id}
                    className={` ${bgChatBox} rounded-md px-3 py-2 cursor-pointer mt-1`}
                    onClick={() => setSelectedChat(el)}
                  >
                    <p className="text-gray-600 font-light ">
                      {!el.isGroupChat
                        ? getSender(loggedUser, el.users)
                        : el.chatName}
                    </p>
                    <p className="text-sm">
                      <strong>{/*el.latestMessage.sender.name*/}</strong> :
                      {/*el.latestMessage.content.length > 50
                        ? el.latestMessage.content.substring(0, 51)
                      : el.latestMessage.content*/}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </>
  );
};
