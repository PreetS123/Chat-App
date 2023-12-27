import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ProfileModal } from "./Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./Miscellaneous/UpdateGroupChatModal";
import { ChatSpinner } from "./Miscellaneous/ChatSpinner";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ScrollableChat } from "./ScrollableChat";
import { io } from "socket.io-client";


// const ENDPOINT = "http://localhost:5000";
const ENDPOINT= "https://preeti-mern-chat-application.onrender.com";
var socket, selectedChatCompare;
export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // useEffect for socket
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setTyping(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification
        if(!notification.includes(newMessageReceived)){
        setNotification([newMessageReceived,...notification]);
        setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  // function to fetch message
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/msg/${selectedChat._id}`,
        config
      );
      // console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      console.log("fetchin message", err);
    }
  };
  // function to send messages
  const sendMessages = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/msg",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data)
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (err) {
        console.log("sendMessage", err);
        return toast.error("API error!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const typeingHandler = (e) => {
    setNewMessage(e.target.value);

    //typing indicator logic here
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  // console.log('selected',selectedChat)
  const userDetailsModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //function to open update modal
  const updateModelOpen = () => {
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  

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
      {selectedChat ? (
        <>
          <div className="w-full font-sans flex flex-col justify-between items-center p-2 border">
            {/**this should only appear in small screen */}
            <div className="w-full">
              {!selectedChat.isGroupChat ? (
                <>
                  <div className="w-full sticky flex justify-between">
                    <BsArrowLeft onClick={() => setSelectedChat("")} />
                    <div className="flex gap-1">
                      {getSender(user, selectedChat.users)}

                      <button
                        className="w-fit h-fit bg-gray-200 rounded-md px-2 py-1"
                        onClick={userDetailsModal}
                      >
                        <BsEye className="font-semibold text-gray-900" />
                      </button>

                    </div>
                  </div>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                    closeModal={closeModal}
                    isModalOpen={isModalOpen}
                  />
                  <div className="w-full h-screen flex flex-col justify-end bg-gray-400 mt-2 overflow-y-hidden">
                    {/* Message Here*/}
                    {loading ? (
                      <ChatSpinner />
                    ) : (
                      <>
                        <div className="messages">
                          {/*Messages*/}
                          <ScrollableChat messages={messages} />
                        </div>
                      </>
                    )}
                    <div
                      className="w-full h-10 sticky bottom-0 p-1"
                      onKeyDown={sendMessages}
                    >
                      {isTyping ? (
                        <div className="w-20 h-5 flex justify-center items-center gap-1 rounded-md bg-white text-gray-500 text-center mb-1">
                          {" "}
                          . . . . . . .{" "}
                        </div>
                      ) : (
                        <></>
                      )}
                      <input
                        type="text"
                        className="w-full rounded-md h-full px-3"
                        placeholder="Enter a  message..."
                        onChange={typeingHandler}
                        value={newMessage}
                      />
                    </div>
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
                    fetchMessages={fetchMessages}
                    closeModal={closeUpdateModal}
                    isModalOpen={isUpdateModalOpen}
                  />
                </div>
              )}
            </div>
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
